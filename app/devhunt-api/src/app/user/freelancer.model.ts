import { model, Schema } from "mongoose";
import { Freelancer } from "src/types/users/freelancer";

const freelancerSchema = new Schema<Freelancer>({

    userId: {
        type: Schema.Types.ObjectId,
        required:[true, 'A Freelancer must have a userId.'],
        ref: 'Users',
    },
    fullName: {
        type: String,
        required:[true, 'A Freelancer must have a full name.']
    },
    email: {
        type: String,
        required: [true, 'A Freelancer must have an email.']
    },
    // photoID: {
    //     type: String,
    // },
    photo: {
        type: String,
        default: 'freelancers/default.jpg',
    },
    description: {
        type: String,
        default: '',
    },
    underReview: {
        type: Boolean,
        default: false,
    },
    contact: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
    collection: 'Freelancers'
})

const Freelancer = model('Freelancers', freelancerSchema);

export default Freelancer;