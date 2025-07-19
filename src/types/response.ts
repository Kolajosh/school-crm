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

export interface IResponseBody<T> {
  message: string;
  success: boolean;
  httpStatusCode: number;
  data: T;
}
