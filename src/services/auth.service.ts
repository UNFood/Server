import User from "../models/User";
import { UserRegister, UserLogin } from "../types/user";
import {
  validateRegister,
  encryptPassword,
  validateLogin,
  comparePassword,
} from "../middlewares/auth";
import jwt from "jsonwebtoken";
import { secret } from "../config/secret";

const authServices = {
  signup: async (user: UserRegister): Promise<string> => {
    if (!validateRegister(user)) throw new Error("Invalid user");

    const userExist = await User.findOne({ username: user.username });

    if (userExist) throw new Error("User already exists");

    const newUser = new User({
      username: user.username,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: await encryptPassword(user.password),
      phone: "",
      address: "",
    });

    const token = jwt.sign(
      { username: newUser.username, id: newUser._id },
      secret,
      { expiresIn: "2h" }
    );
    console.log(token);
    const result = await newUser.save();
    if (!result) throw new Error("Error saving user");

    return token;
  },
  login: async (user: UserLogin): Promise<string> => {
    if (!validateLogin(user)) throw new Error("Invalid user or password");
    const userExist = await User.findOne({ username: user.username });
    if (!userExist) throw new Error("User not found");
    const validPassword = await comparePassword(
      user.password,
      userExist.password
    );
    if (!validPassword) throw new Error("Invalid password");

    const token = jwt.sign(
      { username: userExist.username, id: userExist._id },
      secret,
      { expiresIn: "2h" }
    );

    return token;
  },
  handleGoogleUser: async (googleId: string, email: string) => {
    // Check if user exists in your database
    let user = await User.findOne({ googleId });
    
    if (!user) {
      // If user doesn't exist, create a new user
      user = new User({
        googleId,
        email,
        // any other fields you want to populate
      });
      await user.save();
    } else {
      // Update user if needed
      // For example, you might want to update the email if it has changed on the Google side
      if (user.email !== email) {
        user.email = email;
        await user.save();
      }
    }
    
    // Return user data or token or whatever you need
    return user;
  }
};

export default authServices;
