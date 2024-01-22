import { IUserRepository, ResponseDTO } from "../interfaces/user/repository";
import { MongoDBClient, usersCollection } from "../database/mongodb";
import { UserDTO } from "../models/user";

export class UserRepository implements IUserRepository {
  async getByName(user: UserDTO): ResponseDTO {
    const searchUser = await usersCollection.findOne(user);

    if (!searchUser) {
      throw new Error("User not found");
    }

    return searchUser as UserDTO;
  }

  async getById(user: UserDTO): ResponseDTO {
    const searchUser = await usersCollection.findOne(user);

    if (!searchUser) {
      throw new Error("User not found");
    }

    return searchUser as UserDTO;
  }

  async getAll(): Promise<UserDTO[]> {
    const searchUsers = await usersCollection.find({}).toArray();
    const usersDTO = searchUsers.map(({ _id, username }) => {
      return {
        _id,
        username,
      };
    });

    return usersDTO as UserDTO[];
  }

  async updateOne(user: UserDTO): ResponseDTO {
    const searchUser = await usersCollection.findOne(user);

    if (!searchUser) {
      throw new Error("User not found");
    }

    await usersCollection.updateOne(searchUser, { $set: user });

    return searchUser as UserDTO;
  }

  async deleteAll(): Promise<UserDTO[]> {
    const searchUsers = await usersCollection.find({}).toArray();
    const usersDTO = searchUsers.map(({ _id, username }) => {
      return { _id, username };
    });

    await MongoDBClient.db.collection("users").deleteMany({});

    return usersDTO as UserDTO[];
  }

  async createOne(user: UserDTO): ResponseDTO {
    const searchUser = (await usersCollection.insertOne(user)) as UserDTO;

    if (!searchUser) {
      throw new Error("User not created");
    }

    searchUser.email = undefined;
    searchUser.password = undefined;

    return searchUser as UserDTO;
  }

  async deleteOne(user: UserDTO): ResponseDTO {
    const searchUser = await usersCollection.findOne(user);

    if (!searchUser) {
      throw new Error("User not found");
    }

    await usersCollection.deleteOne(user);

    return searchUser as UserDTO;
  }
}
