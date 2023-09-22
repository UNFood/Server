// userRoutes.ts
import { Router } from 'express';
import { createUser, getUser, updateUser, deleteUser,getAllUsers} from '../controllers/user.controller';

const user_router = Router();

user_router.post('/', createUser);
user_router.get('/:id', getUser);
user_router.delete('/:id', deleteUser);
user_router.get('/', getAllUsers);
user_router.patch('/:id', updateUser);

export default user_router;
