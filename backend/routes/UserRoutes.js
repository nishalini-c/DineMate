// routes/userRoutes.js
import express from 'express';
import  {
    register,
    login,
    getAllUsers,
    deleteUser,
    updateUser,
    logoutUser

} from '../controller/Usercontroller.js';
import {protect,isAdmin} from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users',getAllUsers);
router.delete('/users/:id', deleteUser);
router.post('/logout', logoutUser);
router.put('/users/:id', updateUser);

export default router;
