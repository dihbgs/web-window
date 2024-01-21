import { IUserRepository } from "../interfaces/user/repository";
import { MongoDBClient } from "../database/mongodb";
import { User } from "../models/user";

export class UserRepository implements IUserRepository {
  async getAll(): Promise<User[]> {
    const users = await MongoDBClient.db
      .collection<Omit<User, "id">>("users")
      .find({})
      .toArray();

    console.log(users);

    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
