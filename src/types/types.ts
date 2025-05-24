export interface User {
    userId: number;
    fullName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCreateRequest {
    fullName: string;
    email: string;
    password: string;
}