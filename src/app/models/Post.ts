//This post model allows a post object to be manipulated.
export interface Post {
    authorId: number,
    comments: any[],
    content: string,
    creationDate: string,
    friends: any[],
    id: number,
    image: string,
    likes: any[],
    parentId: number,
    title: string
}