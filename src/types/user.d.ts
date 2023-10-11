import mongoose from "mongoose";

export interface Location {
  latitude: number;
  longitude: number;
}


export interface UserI {
  _id: mongoose.Types.ObjectId;
  username: string | undefined;
  name: string;
  lastName: string;
  email: string;
  password: string;
  address: string | undefined;
  phone: string | undefined;
  location: Location; 
}

export interface UserRegister {
  username: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  location: Location; 
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface userUpdate {
  _id: string;
  username: string | undefined;
  name: string;
  lastName: string;
  email: string;
  password: string;
  address: string | undefined;
  phone: string | undefined;
  location: Location; 
}

export interface DecodeToken {
  username: string;
  id: string;
}
