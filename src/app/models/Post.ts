//This post model allows a post object to be manipulated.

import { User } from "./user.model";

export interface Post {
    author: User,
    comments: Post[],
    content: string,
    creationDate: string,
    friends: User[],
    id?: number,
    image?: string,
    likes: any[],
    parentId: number | null,
    title: string
}