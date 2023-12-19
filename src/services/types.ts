export type ResponseOutput<T> = {
  data: T;
  success: boolean;
  errorMessage?: string;
};

export type LoginOutput = {
  age: string;
  email: string;
  firstname: string;
  lastname: string;
  userId: string;
  userToken: string;
};

export type UserSession = LoginOutput | null;
