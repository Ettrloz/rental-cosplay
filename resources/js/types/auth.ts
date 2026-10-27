export type User = {
  id: number;
  name: string;
  username: string | null;
  email: string;
  role: 'user' | 'cosrent';
  avatar: string | null;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Auth = {
  user: User | null;
  favoriteIds: number[];
};
