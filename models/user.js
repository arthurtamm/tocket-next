import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
    {   
        name: {
            type: String,
            required: [true, 'Name is required.'],
        },
        
        email: {
            type: String,
            unique: [true, 'Email already exists'],
            required: [true, 'Email is required'],
            validate: {
                validator: function(value) {
                    return value.endsWith('@al.insper.edu.br');
                },
                message: 'Invalid email domain',
            },
        },

        password: {
            type: String,
            required: [true, 'Password is required.'],
            // match: [
            //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            //     'Password invalid, it should contain at least 8 characters, one uppercase letter, one lowercase letter and one number!',
            // ],
        },

        phoneNumber: {
            type: String,
            required: [true, 'Phone number is required.'],
            match: [
                /^(?:\d{2})?(9\d{8})$/,
                'Phone number invalid, it should be a valid Brazilian phone number!',
            ],
        }
        
        // image: {
        //     type: String,
        // }
    },
    { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;