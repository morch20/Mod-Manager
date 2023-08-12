import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

import Mod from "@/models/mod";
import { connectToDB } from "@/db";

export const GET = async (req) => {

    try {
        
        const session = await getServerSession(options);
        
        if(session?.user){
            await connectToDB();
    
            const mods = await Mod.find({creator: session.user.id});
    
            return new Response(mods);
        }
    
        return new Response('Unauthorized', {status: 401});
    } 
    catch (error) {
        console.log(error);
        return new Response(JSON.stringify({error}), {status: 500});
    }
}
