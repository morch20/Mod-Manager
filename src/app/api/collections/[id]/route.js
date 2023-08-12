import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";

import Collection from "@/models/collection";
import Mod from "@/models/mod";
import { connectToDB } from "@/db";

export const GET = async (req, { params }) => {

    const session = await getServerSession(options);
    
    if(session?.user){
        
        await connectToDB();
        
        if(params.id === 'All Posts'){
            const mods = await Mod.find({creator: session.user.id});
            return new Response(JSON.stringify(mods), {status: 200});
        }
        
        const c = await Collection.find({creator: session.user.id});
        if(c.length > 0 && c[0].collections.includes(params.id)){
           const mods = await Mod.find({creator: session.user.id, collections: params.id});
           return new Response(JSON.stringify(mods), {status: 200});
        }

        return new Response(JSON.stringify([]), {status: 404});
    }

    return new Response(JSON.stringify([]), {status: 401});
}

export const DELETE = async (req, { params }) => {

    const session = await getServerSession(options);
    
    if(session?.user){
        
        await connectToDB();
        
        const c = await Collection.find({creator: session.user.id});

        if(c.length > 0 && c[0].collections.includes(params.id)){
            c[0].collections = c[0].collections.filter(i => i !== params.id);
            await Collection.findByIdAndUpdate(c[0]._id, c[0]);
            return new Response({status: 200});
        }

        return new Response({status: 404});
    }

    return new Response({status: 401});
}