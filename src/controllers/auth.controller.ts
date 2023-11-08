import { Request, Response } from 'express'; // Import types
import { secret } from '../config/secret'; // Import secret
import User from '../models/User'; // Import User model with ES6 syntax
import jwt from 'jsonwebtoken'; // Import jwt with ES6 syntax
import { verifyGoogleToken } from '../utils/googleAuth'; // Import verifyGoogleToken with ES6 syntax

// Assuming verifyGoogleToken returns a Promise with the Google user's info
// and that the User model has a googleId field for storing the Google user ID

interface AuthRequestBody {
  token: string;
}

export const authenticateWithGoogle = async (req: Request, res: Response) => {
  try {
    const { token } = req.body as AuthRequestBody; // Cast the body to the correct type
    const googleUser = await verifyGoogleToken(token); // Await the async function

    const user = await User.findOne({ email: googleUser.email });

    if (user) {
      if (user.googleId && user.googleId === googleUser.sub) {
        const authToken = jwt.sign({ userId: user._id }, secret);
        res.json({ message: 'User authenticated', token: authToken });
      } else {
        res.status(400).json({ message: 'Email is already registered with a different sign-in method' });
      }
    } else {
      const newUser = new User({
        email: googleUser.email,
        name: googleUser.name,
        googleId: googleUser.sub,
        // Add other fields as necessary
      });

      await newUser.save();

      const authToken = jwt.sign({ userId: newUser._id }, secret);
      res.json({ message: 'User registered with Google and authenticated', token: authToken });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Authentication failed', error: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};
