import User, { IUser } from '../models/User';

class UserService {
  // Crear un nuevo usuario
  async createUser(userData: IUser): Promise<IUser | null> {
    try {
      const user = new User(userData);
      const savedUser = await user.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  // Obtener un usuario por su ID
  async getUserById(userId: string): Promise<IUser | null> {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Obtener todos los usuarios
  async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw error;
    }
  }

  // Actualizar un usuario por su ID
  async updateUserById(userId: string, userData: Partial<IUser>): Promise<IUser | null> {
    try {
      const user = await User.findByIdAndUpdate(userId, userData, { new: true });
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Eliminar un usuario por su ID
  async deleteUserById(userId: string): Promise<void> {
    try {
      await User.findByIdAndDelete(userId);
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
