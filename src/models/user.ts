import { ObjectId } from "mongodb";

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDTO {
  id?: string;
  _id?: ObjectId;
  email?: string;
  username?: string;
  password?: string;
}
