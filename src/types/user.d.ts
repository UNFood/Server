export interface UserI {
  username: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

export interface UserRegister {
  username: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface DecodeToken {
  username: string;
  id: string;
}
