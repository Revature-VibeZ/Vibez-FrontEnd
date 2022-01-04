export interface User {
    userId: number| null;
    firstName: string| null;
    lastName: string| null;
    username: string| null;
    password: string| null;
    email: string| null;
    bio: string | null;
    profilePicture: string | null;
    token?: string| null;
}
