import { IUserRepository, UserDB } from "../interfaces/user/repository";
import { MongoDBClient } from "../database/mongodb";
import { User, UserDTO } from "../models/user";
import { ObjectId } from "mongodb";

export class UserRepository implements IUserRepository {
  getId(username: string): Promise<UserDTO> {
    throw new Error(username);
  }

  async updateOne(id: string, newUser: UserDTO): Promise<UserDTO> {
    const user = await MongoDBClient.db
      .collection<UserDB>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not found");
    }

    await MongoDBClient.db
      .collection<UserDB>("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: newUser });

    return {
      ...{
        username: newUser.username || user.username,
      },
    };
  }

  async deleteAll(): Promise<UserDTO[]> {
    const users = await MongoDBClient.db
      .collection<UserDB>("users")
      .find({})
      .toArray();

    await MongoDBClient.db.collection("users").deleteMany({});

    return users.map(({ username }) => {
      return {
        username,
      };
    });
  }

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

  async createOne(newUser: User): Promise<UserDTO> {
    const { insertedId } = await MongoDBClient.db
      .collection("users")
      .insertOne(newUser);

    const user = await MongoDBClient.db
      .collection<UserDB>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("User not inserted");
    }

    return {
      ...{
        username: user.username,
      },
    };
  }

  async deleteOne(id: string): Promise<UserDTO> {
    const user = await MongoDBClient.db
      .collection<UserDB>("users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not found");
    }

    const { deletedCount } = await MongoDBClient.db
      .collection("users")
      .deleteOne({ _id: user._id });

    if (!deletedCount) {
      throw new Error("User not deleted");
    }

    return {
      ...{
        username: user.username,
      },
    };
  }
}
