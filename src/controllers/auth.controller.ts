import { OAuth2Client } from 'google-auth-library';
import User from "../models/User";
import { Request, Response } from "express";
import authServices from "../services/auth.service";

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your Google Client ID
const client = new OAuth2Client(CLIENT_ID);

const auth = {
  signup: async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await authServices.signup(req.body);
      return res.status(200).json({ message: "User created successfully", data });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
  login: async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = await authServices.login(req.body);
      return res.status(200).json({ message: "User login successfully", data });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
  googleLogin: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { token } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const googleId = payload?.sub;
      const email = payload?.email;

      if (!googleId || !email) {
        return res.status(400).json({ message: "Invalid Google token" });
      }

      // Here you can check if the user exists in your database and create or update accordingly
      // For demonstration, let's assume you have a function in authServices to handle this
      const userData = await authServices.handleGoogleUser(googleId, email);

      return res.status(200).json({ message: "User authenticated with Google", data: userData });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
};

export default auth;
