import {
  IUserRepository,
  ResponseDTO,
  UserDB,
  UserUpdate,
} from "../interfaces/user/repository";
import { UserDTO } from "../models/user";
import { usersCollection } from "../server";

export class UserRepository implements IUserRepository {
  async getOne(user: UserDTO): ResponseDTO {
    const searchUser = await usersCollection.findOne(user);

    if (!searchUser) {
      throw new Error("User not found");
    }

    return searchUser as UserDTO;
  }

  async getAll(): Promise<UserDTO[]> {
    const allUsers = await usersCollection.find({}).toArray();

    return allUsers as UserDTO[];
  }

  async updateOne(user: UserUpdate): ResponseDTO {
    const searchUser = await usersCollection.findOne({
      username: user.oldUsername,
    });

    if (!searchUser) {
      throw new Error("User not found");
    }

    const newUser = {
      username: user.username,
      password: user.password,
      email: user.email,
    } as UserDB;

    newUser.updatedAt = new Date();

    const { modifiedCount } = await usersCollection.updateOne(
      { username: user.oldUsername },
      { $set: newUser }
    );

    if (modifiedCount === 0) {
      throw new Error("User not updated");
    }

    const updatedUser = (await usersCollection.findOne({
      username: user.username,
    })) as UserDTO;

    return updatedUser as UserDTO;
  }

  async deleteAll(): Promise<UserDTO[]> {
    const searchUsers = await usersCollection.find({}).toArray();
    const usersDTO = searchUsers.map(({ _id, username }) => {
      return { _id, username };
    });

    await usersCollection.deleteMany({});

    return usersDTO as UserDTO[];
  }

  async createOne(user: UserDTO): ResponseDTO {
    const { insertedId } = await usersCollection.insertOne(user as UserDB);

    const searchUser = (await usersCollection.findOne({
      _id: insertedId,
    })) as UserDTO;

    if (!searchUser) {
      throw new Error("User not created");
    }

    searchUser.email = undefined;
    searchUser.password = undefined;
    searchUser.id = insertedId.toHexString();

    return searchUser as UserDTO;
  }

  async deleteOne(user: UserDTO): ResponseDTO {
    const searchUser = await usersCollection.findOne(user);

    if (!searchUser) {
      throw new Error("User not found");
    }

    const result = await usersCollection.deleteOne(searchUser);

    if (result.deletedCount === 0) {
      throw new Error("User not deleted");
    }

    return searchUser as UserDTO;
  }
}
