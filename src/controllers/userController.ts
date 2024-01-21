import {
  HttpRequest,
  HttpResponse,
  badRequest,
  created,
  ok,
} from "../interfaces/common/http";
import { IUserController } from "../interfaces/user/controller";
import { IUserRepository } from "../interfaces/user/repository";
import { User, UserDTO } from "../models/user";

export class UserController implements IUserController {
  constructor(private readonly userRepository: IUserRepository) {}

  async getAll(): Promise<HttpResponse<User[]>> {
    try {
      const users = await this.userRepository.getAll();
      return ok<User[]>(users);
    } catch (error) {
      return badRequest("Internal server error");
    }
  }

  async createOne(
    httpRequest: HttpRequest<UserDTO>
  ): Promise<HttpResponse<UserDTO>> {
    try {
      if (!httpRequest.body) {
        return badRequest("Missing body");
      }

      const body = httpRequest.body as User;
      body.createdAt = new Date();
      body.updatedAt = new Date();

      const user = await this.userRepository.createOne(body);

      return created<UserDTO>(user);
    } catch (error) {
      return badRequest("Internal server error");
    }
  }

  async deleteOne(id: string): Promise<HttpResponse<UserDTO>> {
    try {
      const user = await this.userRepository.deleteOne(id);
      return ok<UserDTO>(user);
    } catch (error) {
      return badRequest("Internal server error");
    }
  }

  async deleteAll(): Promise<HttpResponse<UserDTO[]>> {
    try {
      const users = await this.userRepository.deleteAll();
      return ok<UserDTO[]>(users);
    } catch (error) {
      return badRequest("Internal server error");
    }
  }

  async updateOne(
    id: string,
    newUser: HttpRequest<UserDTO>
  ): Promise<HttpResponse<UserDTO>> {
    try {
      if (!newUser.body || Object.keys(newUser.body).length === 0) {
        return badRequest("Body cannot be empty");
      }

      const body = newUser.body as User;
      body.updatedAt = new Date();

      const user = await this.userRepository.updateOne(id, body);

      return ok<UserDTO>(user);
    } catch (error) {
      return badRequest("Internal server error");
    }
  }
}
