import {Schema, model, models} from 'mongoose'

const userSchema = new Schema({
    email: {    
        type : String,
        unique : [true, 'Email already exits'],
        required: [true, 'Email required']
    },
    username: {
        type: String,
        required: [true, 'username required'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String
    },
    createdPrompts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Prompt',
        },
    ],
    likedPrompts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Prompt',
        },
    ],
    savedPrompts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Prompt',
        }
    ],
})

const User = models.User || model('User', userSchema)
export default User