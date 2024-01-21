export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDTO {
  email?: string;
  username?: string;
  password?: string;
}
