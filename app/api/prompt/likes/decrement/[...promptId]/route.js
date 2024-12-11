import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const POST = async(req, res) => {
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
           res.status(400).json({message: "Prompt not found"})
        }

        // user not found 
        if(!user) {
            res.status(400).json({message: "User not found"})
        }
        
        // Check if the user has liked the prompt
        if (user.likedPrompts.includes(promptId)) {

            // Remove the prompt from the user's likedPrompts array
            user.likedPrompts = user.likedPrompts.filter(id => id.toString() !== promptId.toString());
            await user.save();
            
            // Remove the user from the prompt's likedByUsers array
            prompt.likedByUsers = prompt.likedByUsers.filter(id => id.toString() !== userId.toString());
            prompt.likes -= 1; // Decrement the like count
            await prompt.save();
    
            res.status(200).json({ message: "Prompt unliked successfully", likes: prompt.likes });
        } else {
            res.status(400).json({ message: "Prompt not liked yet" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to update likes "})
    }
}