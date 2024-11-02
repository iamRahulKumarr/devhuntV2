import { Document } from "mongoose";

export interface BaseItem {
    _id: string,
    createdAt: string,
    updatedAt: string,
}

export interface BaseItemDocument extends BaseItem, Document<string>{

}

