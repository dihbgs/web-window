import { IUserRepository, UserDB } from "../interfaces/user/repository";
import { MongoDBClient } from "../database/mongodb";
import { User, UserDTO } from "../models/user";

export class UserRepository implements IUserRepository {
  async getAll(): Promise<User[]> {
    const users = await MongoDBClient.db
      .collection<UserDB>("users")
      .find({})
      .toArray();

    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }

  async create(newUser: User): Promise<UserDTO> {
    const { insertedId } = await MongoDBClient.db
      .collection("users")
      .insertOne(newUser);

    const user = await MongoDBClient.db
      .collection<UserDB>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("User not inserted");
    }

    const userDTO = {
      username: user.username,
    };

    return {
      ...userDTO,
    };
  }
}
