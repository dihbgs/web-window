import { ObjectId } from "mongodb";
import {
  HttpResponse,
  badRequest,
  created,
  ok,
} from "../interfaces/common/http";
import {
  IUserController,
  UserArrayResponse,
  UserRequest,
  UserResponse,
  UserUpdateRequest,
} from "../interfaces/user/controller";
import { IUserRepository } from "../interfaces/user/repository";
import { User, UserDTO } from "../models/user";
import HTML from "../interfaces/common/utils";

export class UserController implements IUserController {
  userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getAll(): Promise<HttpResponse<string>> {
    try {
      const users = await this.userRepository.getAll();

      const usersHTML = HTML.usersToHtml(...users);

      return ok<string>(usersHTML);
    } catch (error) {
      return badRequest("Internal server error");
    }
  }

  async createOne(userRequest: UserRequest): Promise<UserResponse> {
    try {
      if (isBodyEmpty(userRequest)) {
        return badRequest("Missing body");
      }

      const missingParam = hasRequiredParams(
        userRequest,
        "email",
        "username",
        "password"
      );
      if (missingParam) {
        return badRequest(`Missing param: ${missingParam}`);
      }

      const body = userRequest.body as User;
      let doUserExist = true;
      console.log(body);

      try {
        await this.userRepository.getOne({
          username: body.username,
        } as UserDTO);
      } catch (error) {
        doUserExist = false;
      }

      if (doUserExist) {
        return badRequest("User already exist");
      }

      body.createdAt = new Date();
      body.updatedAt = new Date();

      const user = await this.userRepository.createOne(body);

      return created<UserDTO>(user);
    } catch (error) {
      return badRequest("Internal server error");
    }
  }

  async deleteOne(userRequest: UserRequest): Promise<UserResponse> {
    try {
      if (isBodyEmpty(userRequest)) {
        return badRequest("Missing body");
      }

      let body: UserDTO = {};
      if (!hasRequiredParams(userRequest, "id")) {
        body = { _id: new ObjectId(userRequest.body?.id) };
      }

      if (!hasRequiredParams(userRequest, "username")) {
        body = { username: userRequest.body?.username };
      }

      const user = await this.userRepository.deleteOne(body);

      return ok<UserDTO>(user);
    } catch (error) {
      return badRequest("Internal server error");
    }
  }

  async deleteAll(): Promise<UserArrayResponse> {
    try {
      const users = await this.userRepository.deleteAll();
      return ok<UserDTO[]>(users);
    } catch (error) {
      return badRequest("Internal server error");
    }
  }

  async updateOne(userRequest: UserUpdateRequest): Promise<UserResponse> {
    try {
      if (isBodyEmpty(userRequest)) {
        return badRequest("Body cannot be empty");
      }
      const username = userRequest.body?.oldUsername;

      if (!username) {
        return badRequest("Missing username to update user");
      }

      let body: UserDTO = {};
      if (!hasRequiredParams(userRequest, "username")) {
        body = { username: userRequest.body?.username };
      }

      if (!hasRequiredParams(userRequest, "password")) {
        body = { password: userRequest.body?.password, ...body };
      }

      if (!hasRequiredParams(userRequest, "email")) {
        body = { email: userRequest.body?.email, ...body };
      }

      if (Object.keys(body).length === 0) {
        return badRequest("Missing params to update user");
      }

      const user = await this.userRepository.updateOne({
        oldUsername: username,
        ...body,
      });

      return ok<UserDTO>(user);
    } catch (error) {
      return badRequest("Internal server error");
    }
  }

  async getOne(userRequest: UserRequest): Promise<UserResponse> {
    try {
      if (isBodyEmpty(userRequest)) {
        return badRequest("Missing body");
      }

      let body: UserDTO = {};
      if (!hasRequiredParams(userRequest, "id")) {
        body = { _id: new ObjectId(userRequest.body?.id) };
      }

      if (!hasRequiredParams(userRequest, "username")) {
        body = { username: userRequest.body?.username };
      }

      const user = await this.userRepository.getOne(body);

      return ok<UserDTO>({
        id: user._id?.toHexString(),
        username: user.username,
      } as UserDTO);
    } catch (error) {
      return badRequest("Internal server error");
    }
  }
}

function isBodyEmpty(userRequest: UserRequest): boolean {
  return !userRequest.body || Object.keys(userRequest.body).length === 0;
}

function hasRequiredParams(
  userRequest: UserRequest,
  ...params: string[]
): string {
  const body = userRequest.body as User;
  const bodyKeys = Object.keys(body);

  for (const param of params) {
    if (bodyKeys.indexOf(param) === -1) {
      return param;
    }
  }

  return "";
}
