import { UserDTO } from "../../models/user";

export default class HTML {
  static usersToHtml(...users: UserDTO[]): string {
    return users
      .map(({ username, email }) => {
        return `<div>${username}</div><div>${email}</div>`;
      })
      .join("");
  }
}
