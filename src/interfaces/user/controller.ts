import { User } from "../../models/user";
import { HttpResponse } from "../common/httpResponse";

export interface IUserController {
  getAll(): Promise<HttpResponse<User[]>>;
}
