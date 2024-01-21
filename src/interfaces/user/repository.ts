import { User } from "../../models/user";

export interface UserRepository {
  getAll(): Promise<User[]>;
}
