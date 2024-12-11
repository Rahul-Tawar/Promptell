import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const POST = async(req) => {
    try {
        // parse the request body
        const { promptId, userId } = req.json();

        // db connection
        await connectToDB();

        // find the prompt
        const prompt = await Prompt.findById(promptId);

        // find the user 
        const user = await User.findById(userId)

        // check if prompt exists
        if(!prompt) {
            return new Response(JSON.stringify({ message: "Prompt not found" }), { status: 400 })
        }

        // check if user exists
        if(!user) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 400 })
        }

       if (!user.likedPrompts.include(promptId)) {
        
            // add prompt to the user's likedPrompt array
            user.likedPrompts.push(promptId)
            await user.save()

            // increament the likes 
            prompt.likes += 1

            // user baar like click karke, maa chod dega application ki behnchod, how to debounce it

            // save the model 
            await prompt.save()

            // send a success message 
            return new Response(JSON.stringify({ message: "Likes Updated Successfully",  likes: prompt.likes }),  { status: 201 })
       }

    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ message: "failed to update likes"}), { status: 500})
    };
};