import {  Request } from "express";

export interface User {
    username: string,
    password: string,
    role: string,
}

export type RequestWithUser = Request & {user: User}