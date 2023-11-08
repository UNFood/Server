import express from "express";
// Import the named function from auth.controller
import { authenticateWithGoogle } from "../controllers/auth.controller";

const authRouter = express.Router();

// Use the named function in your route
authRouter.post("/google-auth", authenticateWithGoogle); // Assuming you have a route for Google authentication

export default authRouter;
