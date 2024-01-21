import { User } from "../../models/user";

export interface IUserRepository {
  getAll(): Promise<User[]>;
}
