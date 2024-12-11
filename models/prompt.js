import {Schema, SchemaType, model, models} from "mongoose";

const PromptSchema=new Schema({
    creator: {
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true, 'Creator is required'],
    },
    prompt: {
        type:String,
        required:[true, 'Prompt is required'],
    },
    tag: {  
        type:String,
        required:[true, 'Tag is also required']
    },
    title: {
        type:String,
        maxlength:50,
    },
    likes: {
        type:Number,
        default: 0,
    },
    createdAt: {
        type:Date,
    },
    updatedAt: {
        type: Date,
    },
    saves: {
        type: Schema.Types.ObjectId,
        default: 0,
    },
    likedBy: [
       {
         type: Schema.Types.ObjectId,
         ref: 'User'
       }
    ],
    savedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

const Prompt = models.Prompt || model('Prompt', PromptSchema)
export default Prompt
