export type Category = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  name: string;
  author: string;
  thumbnailUrl: string;
  date: string;
  description: string;
  views: number;
  likes: number;
};
