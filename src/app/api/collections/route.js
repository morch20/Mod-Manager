import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

import Collection from "@/models/collection";
import { connectToDB } from "@/db";

export const GET = async (req) => {

    const session = await getServerSession(options);
    
    if(session?.user){
        await connectToDB();
        
        const c = await Collection.find({creator: session.user.id});
        
        if(c.length > 0){
            return new Response(JSON.stringify(c[0].collections));
        }

        return new Response(JSON.stringify([]));
    }

    return new Response(JSON.stringify([]), {status: 401});
}

export const PATCH = async (request) => {

    const session = await getServerSession(options);

    if(session?.user){

        await connectToDB();

        try {

            const body = await request.json();

            if(body.collections === 'All Posts'){
                return new Response(JSON.stringify({saved: true}), {status: 200});
            }

            const collection = await Collection.find({creator: session.user.id});

            if(collection.length === 0){
                return new Response('Collection not found', {status: 404});
            }

            const trimmed = body.collections.trim();
            collection[0].collections.push(trimmed);
            await Collection.findByIdAndUpdate(collection[0]._id, collection[0]);

            return new Response(JSON.stringify({saved: true}), {status: 200});
        } 
        catch (error) {

            return new Response("Invalid Body", {status: 400});
        }
    }

    return new Response('Unauthorized', {status: 401});
}