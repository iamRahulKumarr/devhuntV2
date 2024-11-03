import { Document } from "mongoose";

export interface BaseCreateItemPayload{

}

export interface BaseItem {
    _id: string,
    createdAt: string,
    updatedAt: string,
}

export interface BaseItemDocument extends BaseItem, Document<string>{

}

export interface BaseUpdateItemPayload{

}

export interface GetBaseItemResponse<Item>{
    item: Item;
}