import { Model, Schema } from "mongoose";
import bcryptjs from 'bcryptjs';

const userScehma = new Schema({

    firstName: {
        type: String,
        required: [true, 'First name is required.'],

    },
    lastName: {
        type: String,
        required: [true, 'Last name is required.'],
    },
    fullName: {
        type: String,
        required: [true, 'Full Name is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minLength: [8, 'Password must be of atleast 8 characters.']
    },
},{
    timestamps:true,
    collection:'Users'
})


userScehma.pre('save', async function (next) {

    this.fullName = this.firstName.concat(" ", this.lastName);

    const salt = await bcryptjs.genSalt(12);

    this.password = await bcryptjs.hash(this.password, salt);

    next();
})

const User = new Model('Users', userScehma);

export default User;