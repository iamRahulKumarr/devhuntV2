import { BaseCreateItemPayload, BaseItem, BaseItemDocument, BaseUpdateItemPayload, GetBaseItemResponse } from "../base-items";

export type UserType = 'Admin' | 'Freelancer' | 'Client';

export interface CreateUserPayload extends BaseCreateItemPayload{
    firstName: string;
    lastName: string;
    email:string;
    password:string;
    userType: UserType;
}

export interface UserArchiveItem extends BaseItem{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: UserType;
}

export interface UserDocument extends BaseItemDocument{
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    password: string;
    userType:UserType;
}

export interface User extends UserArchiveItem{

}

export interface UpdateUserPayload extends BaseUpdateItemPayload{

}

export interface GetUserResponse<Item = User> extends GetBaseItemResponse<Item>{
    
}