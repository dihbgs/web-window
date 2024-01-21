import { HttpResponse } from "../interfaces/common/httpResponse";
import { IUserController } from "../interfaces/user/controller";
import { IUserRepository } from "../interfaces/user/repository";
import { User } from "../models/user";

export class UserController implements IUserController {
  constructor(private readonly userRepository: IUserRepository) {}

  async getAll(): Promise<HttpResponse<User[]>> {
    try {
      const users = await this.userRepository.getAll();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: { message: "Internal server error" },
      };
    }
  }
}
