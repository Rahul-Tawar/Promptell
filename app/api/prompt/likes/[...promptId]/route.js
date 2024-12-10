import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async(req) => {
    try {
        // parse the request body
        const { promptId } = req.json();

        // db connection
        await connectToDB();

        // find the prompt by ID
        const prompt = await Prompt.findById(promptId);
        
        if(!prompt) {
            return new Response(JSON.stringify({ message: "Prompt not found" }), { status: 400 })
        }

        // increament the likes 
        prompt.likes += 1

        // user baar like click karke, maa chod dega application ki behnchod

        // save the model 
        await prompt.save()

        // send a success message 
        return new Response(JSON.stringify({ message: "Likes Updated Successfully",  likes: prompt.likes }),  { status: 201 })

    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ message: "failed to update likes"}), { status: 500})
    };
};