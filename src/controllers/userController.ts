import { UserRepository } from "../interfaces/user/repository";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll() {
    try {
      const users = await this.userRepository.getAll();

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { message: "Internal server error" },
      };
    }
  }
}
