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

  async create(
    httpRequest: HttpRequest<UserDTO>
  ): Promise<HttpResponse<UserDTO>> {
    try {
      if (!httpRequest.body) {
        return badRequest("Missing body");
      }

      const body = httpRequest.body as User;
      body.createdAt = new Date();
      body.updatedAt = new Date();

      const user = await this.userRepository.create(body);

      return created<UserDTO>(user);
    } catch (error) {
      return badRequest("Internal server error");
    }
  }
}
