import bcrypt from 'bcrypt';

// Mock database array to store users and their hashed passwords
type User = {
  username: string;
  password: string; // hashed password
};

const users: User[] = [];

// Function to register a new user
const registerUser = async (username: string, password: string) => {
  // Check if user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    throw new Error('User already exists');
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

  return 'User registered successfully';
};

// Example usage
(async () => {
    try {
      const message = await registerUser('johnDoe', 'password123');
      console.log(message);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unknown error occurred.');
      }
    }
  })();
