export interface UserData {
    id: number;
    name: string;
    email: string;
    admin: number;
}
export interface SessionData {
    user: UserData;
    access_token: string;
}
