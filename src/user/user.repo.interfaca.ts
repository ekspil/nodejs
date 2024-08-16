import { UserModel } from "@prisma/client";
import { User } from "./user.entity";

export interface IUserRepository {
    create: (user: User) => Promise<UserModel>
}