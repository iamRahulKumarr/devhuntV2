import { Schema } from "mongoose";
import { BaseItem } from "../base-items";

export interface Freelancer extends BaseItem{
    userId: Schema.Types.ObjectId;
    fullName: string;
    email: string;
    photo: string;
    description: string;
    contact: string;
    underReview: Boolean;
}