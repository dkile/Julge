export type User = {
  id: string;
  type: UserType;
};

export type UserType = "employee" | "employer";

export type SignupFormField = {
  email: string;
  password: string;
  passwordConfirm: string;
  type: UserType;
};
