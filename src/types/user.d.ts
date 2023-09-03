import { Types } from "mongoose";

export interface User {
  name: string;
  secondName: string;
  lastName: string;
  email: string;
  password: string;
  role: number;
  balance: number;
}
