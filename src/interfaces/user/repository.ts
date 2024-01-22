import { User, UserDTO } from "../../models/user";

export type ResponseDTOArray = Promise<UserDTO[]>;
export type ResponseDTO = Promise<UserDTO>;
export type UserDB = Omit<User, "id">;

export interface IUserRepository {
  updateOne(user: UserDTO): ResponseDTO;
  createOne(user: UserDTO): ResponseDTO;
  getByName(user: UserDTO): ResponseDTO;
  deleteOne(user: UserDTO): ResponseDTO;
  getById(user: UserDTO): ResponseDTO;
  deleteAll(): ResponseDTOArray;
  getAll(): ResponseDTOArray;
}
