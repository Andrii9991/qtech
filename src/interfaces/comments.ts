export interface IComment {
  body: string;
  id: number;
  user: {
    id: number;
    username: string;
  };
}
