import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';

const router = express.Router();

// Mock database array to store users, their hashed passwords, and their 2FA secrets
type User = {
  username: string;
  password: string; // hashed password
  twoFASecret?: string;
};

const users: User[] = [];

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Store the user in the mock database
  const newUser: User = {
    username,
    password: hashedPassword
  };
  users.push(newUser);

  res.send('User registered successfully');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).send('User not found');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).send('Invalid password');
  }

  // Generate JWT token (for simplicity, we're not setting an expiration time here)
  const token = jwt.sign({ username: user.username }, 'YOUR_SECRET_KEY'); // Replace 'YOUR_SECRET_KEY' with your actual secret key

  res.send({ token });
});

// Generate a secret for 2FA
router.post('/generate-2fa-secret', (req, res) => {
  const { username } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).send('User not found');
  }

  const secret = speakeasy.generateSecret({ name: 'YourAppName:' + username });
  user.twoFASecret = secret.base32;

  qrcode.toDataURL(secret.otpauth_url!, (err, imageUrl) => {
    if (err) {
      return res.status(500).send('Error generating QR code');
    }
    res.send({ imageUrl });
  });
});

// Verify 2FA token
router.post('/verify-2fa', (req, res) => {
  const { username, token } = req.body;

  const user = users.find(u => u.username === username);
  if (!user || !user.twoFASecret) {
    return res.status(400).send('User not found or 2FA not set up');
  }

  const verified = speakeasy.totp.verify({
    secret: user.twoFASecret,
    encoding: 'base32',
    token: token
  });

  if (verified) {
    res.send('Token is valid');
  } else {
    res.status(400).send('Invalid token');
  }
});

export default router;
