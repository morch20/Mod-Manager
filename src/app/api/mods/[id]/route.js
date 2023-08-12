import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

import Mod from "@/models/mod";
import { connectToDB } from "@/db";

export const GET = async (req, { params }) => {

    const session = await getServerSession(options);
    
    if(session?.user){
        await connectToDB();

        const mods = await Mod.find({creator: session.user.id, project_id: params.id});

        if(mods.length > 0){
            return new Response(JSON.stringify({found: true, collections: mods[0].collections}), {status:200});
        }

        return new Response(JSON.stringify({found: false}), {status: 200});
    }

    return new Response('Unauthorized', {status: 401});
}

export const PATCH = async(req, { params }) => {
    const session = await getServerSession(options);
    
    if(session?.user){

        await connectToDB();

        try {

            const body = await req.json();

            const currentMod = await Mod.find({creator: session.user.id, project_id: params.id});

            const { searchParams } = new URL(req.url);
            const remove = searchParams.get('remove');
            if(remove){
                if(currentMod.length === 0){
                    return new Response(JSON.stringify({updated: false, collections: []}), {status: 200});
                }
                currentMod[0].collections = currentMod[0].collections.filter(i => i !== body.collections);
                await Mod.findByIdAndUpdate(currentMod[0]._id, currentMod[0]);
                return new Response(JSON.stringify({updated: true, collections: currentMod[0].collections}), {status: 200});
            }

            if(currentMod.length === 0){

                let collections = [];

                if(body.collections !== 'All Posts'){
                    collections = [body.collections]
                }

                await Mod.create({
                    creator: session.user.id,
                    collections: collections,
                    project_id: body.project_id,
                    project_typ: body.project_type,
                    title: body.title,
                    icon_url: body.icon_url,
                    client_side: body.client_side,
                    server_side: body.server_side,
                    categories: body.categories,
                    loaders: body.loaders
                });
    
                return new Response(JSON.stringify({saved: true, collections}), {status: 201});
            }

            if(body.collections === 'All Posts'){
                return new Response(JSON.stringify({updated: true, collections: currentMod[0].collections}), {status: 200});
            }

            body.collections = body.collections.trim();
            if(!currentMod[0].collections.includes(body.collections)){

                currentMod[0].collections.push(body.collections);
                await Mod.findByIdAndUpdate(currentMod[0]._id, currentMod[0]);

                return new Response(JSON.stringify({updated: true, collections: currentMod[0].collections}), {status: 200});

            }

            return new Response(JSON.stringify({updated: true, collections: currentMod[0].collections}), {status: 200});

        } 
        catch (error) {
            console.log(error)

            return new Response("Invalid body", {status: 400});
        }
    }

    return new Response('Unauthorized', {status: 401});
}

export const DELETE = async(req, { params }) => {

    const session = await getServerSession(options);
 
    if(session?.user){
        try {
        
            await connectToDB();
    
            const mods = await Mod.find({creator: session.user.id, project_id: params.id});
    
            if(mods.length > 0){
                await Mod.findByIdAndDelete(mods[0]._id);
                return new Response(JSON.stringify({deleted: true}), {status: 200});
            }
    
            return new Response(JSON.stringify({deleted: false}), {status: 404});
        }
        catch (error) {
            console.log(error);
            return new Response(JSON.stringify({deleted: false}, {status: 500}));
        }
    } 

    return new Response('Unauthorized', {status: 401});
}