import { User, UserDTO } from "../../models/user";

export type UserDB = Omit<User, "id">;

export interface IUserRepository {
  create(newUser: UserDTO): Promise<UserDTO>;
  getAll(): Promise<User[]>;
}
