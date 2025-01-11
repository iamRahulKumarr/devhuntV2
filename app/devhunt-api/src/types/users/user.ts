import { BaseCreateItemPayload, BaseItem, BaseItemDocument, BaseUpdateItemPayload, GetBaseItemResponse } from "../base-items";

export type UserType = 'admin' | 'freelancer' | 'client';

export interface CreateUserPayload extends BaseCreateItemPayload{
    firstName: string;
    lastName: string;
    email:string;
    password:string;
    userType: UserType;
}

export interface User extends BaseItem{
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    password: string;
    userType:UserType;
}

export interface UserDocument extends BaseItemDocument, User{

    comparePasswords(candidatePassword: string, currentPassword: string): Promise<boolean>
}

export interface UpdateUserPayload extends BaseUpdateItemPayload{

}

export interface GetUserResponse<Item = User> extends GetBaseItemResponse<Item>{
    
}