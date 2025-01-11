import { model, Schema } from "mongoose";
import bcryptjs from 'bcryptjs';

import { UserDocument } from "src/types/users/user";

const userScehma = new Schema<UserDocument>({

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
        required: [true, 'Full Name is required.'],
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minLength: [8, 'Password must be of atleast 8 characters.'],
        select: false
    },
    userType: {
        type: String,
        required: [true, 'UserType is required.'],
        enum: {
            values: ['admin', 'freelancer', 'client'],
            message: "A userType only be: admin, freelancer or client.",
        },
    }
}, {
    timestamps: true,
    collection: 'Users'
})

userScehma.pre('validate', function () {

    /* Update full name on first name and last name modification. */
    if (this.isModified('firstName') || this.isModified('lastName')) {

        this.fullName = this.firstName.concat(" ", this.lastName);
    }
})

userScehma.pre('save', async function (next) {

    /* Encrypt password if new password is assigned. */
    if (this.isModified('password')) {

        const salt = await bcryptjs.genSalt(12);

        this.password = await bcryptjs.hash(this.password, salt);
    }

    next();
})

userScehma.methods.comparePasswords = function (candidatePassword: string, currentPassword: string): Promise<boolean> {

    return bcryptjs.compare(candidatePassword, currentPassword);
}


const User = model('Users', userScehma);

export default User;