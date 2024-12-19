
import { Types } from "mongoose";
import { BaseItem } from "../base-items";

export interface Post extends BaseItem{
    clientId: Types.ObjectId;
    title: string;
    location: string;
    budget: number;
    duration: string;
    description: string;
    attachment: string;
}