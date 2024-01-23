import { User, UserDTO } from "../../models/user";

export type UserUpdate = { oldUsername: string } & UserDTO;
export type ResponseDTOArray = Promise<UserDTO[]>;
export type ResponseDTO = Promise<UserDTO>;
export type UserDB = Omit<User, "id">;

export interface IUserRepository {
  updateOne(user: UserUpdate): ResponseDTO;
  createOne(user: UserDTO): ResponseDTO;
  deleteOne(user: UserDTO): ResponseDTO;
  getOne(user: UserDTO): ResponseDTO;
  deleteAll(): ResponseDTOArray;
  getAll(): ResponseDTOArray;
}
