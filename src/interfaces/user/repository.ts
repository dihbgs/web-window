import { User, UserDTO } from "../../models/user";

export type UserDB = Omit<User, "id">;

export interface IUserRepository {
  createOne(newUser: UserDTO): Promise<UserDTO>;
  deleteOne(id: string): Promise<UserDTO>;
  deleteAll(): Promise<UserDTO[]>;
  getAll(): Promise<User[]>;
}
