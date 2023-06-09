export type RegisterInputs = {
  username: string;
  email: string;
  password: string;
};

export type LoginInputs = {
  username: string;
  password: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  imgUrl: string | null;
};

export interface IPost {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  date: string;
  category: string;
  username?: string;
  userImg?: string;
}

export type RecommendedPost = {
  id: number;
  title: string;
  imgUrl: string;
};
