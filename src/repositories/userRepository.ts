import { User } from "../models/user";

export class UserRepository implements UserRepository {
  async getAll(): Promise<User[]> {
    return [
      {
        id: 1,
        email: "test@user.com",
        username: "John Doe",
        password: "somePass",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
}
