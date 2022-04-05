export type RegisterResponse = {
  id: number;
  token: string;
};

export type LoginResponse = {
  token: string;
};

export interface UserListParams {
  page: number;
  delay: number;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
