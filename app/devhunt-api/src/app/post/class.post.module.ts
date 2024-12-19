import { NextFunction, Request, Response } from "express";
import baseModule from "../../core/base/abstract.class.base.module";
import catchAsync from "../handlers/error-handler/catchAsync";
import { CreatePostPayload, PostDocument } from "src/types/post/post";
import Post from "./post.model";
import AppError from "../handlers/error-handler/class.AppError";

export default class PostModule extends baseModule {

    /** Create Post Method **/
    public createPost(): (req: Request, res: Response, next: NextFunction) => any {

        return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

            const { title, location, budget, duration, description } = req.body;

            if (!title || !location || !budget || !duration || !description) {
                return next(new AppError(this.INVALID_FORM_INPUT_MSG, this.INVALID_FORM_INPUT));
            }

            const postPayload: CreatePostPayload = {
                clientId: (req as any).user._id,
                title,
                location,
                budget,
                duration,
                description,
            }

            if (req.body.attachment) {
                postPayload.attachment = req.body.attachment;
            }

            const post: PostDocument = await Post.create(postPayload);

            return this.ok(res, { post });
        })

    }

    /** Get All Posts Method **/
    public getAllPosts(){
        return catchAsync(async (req:Request, res: Response, next: NextFunction)=>{
            const posts: PostDocument[] = await Post.find();

            return this.ok(res, {items: posts});
        })
    }

    /** Get Post Method **/
    public getPost(): (req: Request, res: Response, next: NextFunction) => any {

        return catchAsync(async (req: Request, res: Response, next: NextFunction)=>{

            const postId: string = req.params.id;

            const post : PostDocument | null = await Post.findById(postId);

            if(!post){
                return next(new AppError(this.NOT_FOUND_RESOURCE_MSG, this.NOT_FOUND_RESOURCE_CODE));
            }

            return this.ok(res, {post});
        })
    }
}