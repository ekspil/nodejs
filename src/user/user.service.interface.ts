import { UserLoginDTO } from "./dto/userLogin.dto";
import { UserRegisterDTO } from "./dto/userRegister.dto";
import { User } from "./user.entity";

export class IUserService {
    createUser: (dto: UserRegisterDTO) => Promise<User | null>
    validateUser: (dto: UserLoginDTO) => Promise<boolean>
}