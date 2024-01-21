import { User } from "../../models/user";
import { HttpResponse } from "../common/httpResponse";

export interface UserController {
  getAll(): Promise<HttpResponse<User[]>>;
}
