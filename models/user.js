import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required.'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required.'],
        match: [
            /^(?:\+55)?(?:\d{2})?(9\d{8})$/,
            'Phone number invalid, it should be a valid Brazilian phone number!',
        ],
    },
    image: {
        type: String,
    }
});

const User = models.User || model("User", UserSchema);

export default User;