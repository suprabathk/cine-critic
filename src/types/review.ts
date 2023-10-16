export type Review = {
  id: string;
  title: string;
  description: string;
  rating: number;
  username: string;
};

export type ReviewForm = {
  title: string;
  description: string;
  rating: number;
};
