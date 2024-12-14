import { Types } from "mongoose";
import { BaseItem } from "../base-items";

export interface Client extends BaseItem{
    userId: Types.ObjectId;
    fullName: string;
    email: string;
    photo: string;
    companyName: string;
    description: string;
    state: string;
    contact: string;
    address: string;
}