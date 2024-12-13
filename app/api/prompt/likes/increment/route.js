import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const POST = async(req) => {
    try {
        // parse the request body
        const { promptId, userId } = await req.json()
        console.log(promptId, userId)
        // db connection
        await connectToDB();

        // find the prompt
        const prompt = await Prompt.findById(promptId);
        console.log(prompt)

        // find the user 
        const user = await User.findById(userId)
        console.log(user)

        // check if prompt exists
        if(!prompt) {
            return new Response(JSON.stringify({ message: "Prompt not found"}), {status: 400})
        }

        // check if user exists
        if(!user) {
            return new Response(JSON.stringify({ message: "User not found"}), {status: 400}) 
        }

        // check if user liked prompt or not
       if (!user.likedPrompts.includes(promptId)) {
            console.log('main logic mounted')
            // add prompt to the user's likedPrompt array
            user.likedPrompts.push(promptId)
            await user.save()

             // Add the user to the prompt's likedByUsers array
            prompt.likedBy.push(userId);

            // increament the likes 
            prompt.likes += 1

            // user baar like click karke, maa chod dega application ki behnchod, how to debounce it

            // save the model 
            await prompt.save()

            // send a success message 
            return new Response(JSON.stringify({ message: "Prompt liked sucessfully", likes: prompt.likes}), {status: 201})
       } else {
        console.log("User has already liked the Prmompt")
        return new Response(JSON.stringify({message: "User has already liked the prompt"}), {status: 400})
       }

    } catch(error) {
        console.log(error)
        return new Response(JSON.stringify({ message: "Error while liking prompt"}), {status: 500})
    };
};