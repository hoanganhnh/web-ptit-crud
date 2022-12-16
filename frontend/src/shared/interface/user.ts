export interface IUser {
  user: {
    id: string;
    username: string;
    email: string;
    roles: string[];
  };
  accessToken: string;
}
