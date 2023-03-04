import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        password: {
            type: String,
            required: true,
            min: 5
        },
        role: {
            type: String,
            require: true,
            default: 'user'
        },
        email: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        gender: {
            type: String,
            default: ''
        },
        dob: {
            type: String,
            default: ''
        },
        rfToken: {
            type: String,
            default: ''
        },
        img: {
            type: String,
            default: 'avatarDefault.jpg'
        },
        address: {
            type: String,
            default: ''
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
