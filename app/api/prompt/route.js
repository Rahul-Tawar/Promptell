import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { modelNames } from "mongoose";

export const GET = async (request) => {
    try {
        await connectToDB()
        
        const prompts = await Prompt.find({}).populate('creator')
        console.log(prompts[0].creator?.username)

        console.log(prompts[0].creator?.username)

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 