import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const POST = async(req, res) => {
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
            res.status(400).json({message: "Prompt not found"})
        }

        // check if user exists
        if(!user) {
            res.status(400).json({message: "User not found"})
        }

        // check if user liked prompt or not
       if (!user.likedPrompts.include(promptId)) {
        
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
            res.status(200).json({ message: "Prompt liked successfully", likes: prompt.likes });
       }

    } catch(error) {
        console.log(error)
        res.status(500).json({ message: "Failed to update likes "})
    };
};