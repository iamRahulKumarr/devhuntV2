import { Document } from "mongoose";

export interface BaseCreateItemPayload{

}

export interface BaseItem {
    _id: string,
    createdAt: string,
    updatedAt: string,
}

export interface BaseItemDocument extends Document<string>, BaseItem{

}

export interface BaseUpdateItemPayload{

}

export interface GetBaseItemResponse<Item>{
    item: Item;
}