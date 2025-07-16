// export type Profile = {
//   any
// };

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
};

export type IAuthResponse = {
  user: User;
  profile: null;
  role: "admin" | string;
  token: string;
  token_type: string;
};
