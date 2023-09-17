// userRoutes.ts
import { Router } from 'express';
import { createUser, getUser, updateUser, deleteUser,getAllUsers} from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', getAllUsers);

export default router;
