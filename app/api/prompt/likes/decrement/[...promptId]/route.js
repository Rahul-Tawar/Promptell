import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const POST = async(req) => {
    try {
        // parse the prompt Id
        const { promptId, userId } = await req.json()

        await connectToDB()

        // find the prompt by Id
        const prompt = await Prompt.findById(promptId)

        // find the user by Id
        const user = await User.findById(userId)

        // prompt not found
        if(!prompt) {
            return new Response(JSON.stringify({ message: "Prompt not found" }), { status: 400 })
        }

        // user not found 
        if(!user) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 400 })
        }

        // check if user has already liked the prompt 
        if(!user.likedPrompts.includes(promptId)) {
            
            // add the liked Prompts
            user.likedPrompts.push(promptId)
            await user.save()
        }
        

        if ( prompt.likes <= 0 ) {
            return new Response(JSON.stringify({ message: " Prompt count can't be less than 0"}), { status: 400 })
        } else {
            prompt.likes -=1

            // save the model
            await prompt.save()

            return new Response(JSON.stringify({ message: "Likes Updated Successfully",  likes: prompt.likes }),  { status: 201 })
        }


    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: "failed to update likes"}), { status: 500})
    }
}