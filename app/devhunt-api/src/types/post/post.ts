
import { Types } from "mongoose";
import { BaseCreateItemPayload, BaseItem, BaseItemDocument, BaseUpdateItemPayload, GetBaseItemResponse } from "../base-items";

export interface Post extends BaseItem {
    clientId: Types.ObjectId;
    title: string;
    location: string;
    budget: number;
    duration: string;
    description: string;
    attachment?: string;
}

export interface CreatePostPayload extends BaseCreateItemPayload {
    clientId: Types.ObjectId;
    title: string;
    location: string;
    budget: number;
    duration: string;
    description: string;
    attachment?: string;
}

export interface PostDocument extends BaseItemDocument, Post {

}

export interface UpdatePostPayload extends BaseUpdateItemPayload {

}

export interface GetPostResponse<Item = Post> extends GetBaseItemResponse<Item> {

}