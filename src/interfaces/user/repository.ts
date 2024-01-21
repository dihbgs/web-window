import { User, UserDTO } from "../../models/user";

export type UserDB = Omit<User, "id">;

export interface IUserRepository {
  updateOne(id: string, newUser: UserDTO): Promise<UserDTO>;
  createOne(newUser: UserDTO): Promise<UserDTO>;
  deleteOne(id: string): Promise<UserDTO>;
  deleteAll(): Promise<UserDTO[]>;
  getAll(): Promise<User[]>;
}
