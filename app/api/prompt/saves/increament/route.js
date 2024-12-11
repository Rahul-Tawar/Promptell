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

        // check if user saved prompt or not
       if (!user.savedPrompts.include(promptId)) {
        
            // add prompt to the user's savedPrompt array
            user.savedPrompts.push(promptId)
            await user.save()

             // Add the user to the prompt's savedByUsers array
            prompt.savedBy.push(userId);

            // increament the saves
            prompt.saves += 1

            // save the model 
            await prompt.save()

            // send a success message 
            res.status(200).json({ message: "Prompt saved successfully", saves: prompt.saves });
       }

    } catch(error) {
        console.log(error)
        res.status(500).json({ message: "Failed to update saves "})
    };
};