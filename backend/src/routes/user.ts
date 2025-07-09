// backend/src/routes/user.ts
import express from 'express';
import { verifyClerkJWT } from '../middlewares/auth';
import {
  getCurrentUser,
  getUser,
  updateUser,
  createUser,
  deleteUser,
  getUserActivity,
  searchUsers,
} from '../controllers/user';

const router = express.Router();

// Public routes
router.get('/search', searchUsers);
router.get('/:id', getUser);
router.get('/:id/activity', getUserActivity);

// Protected routes
router.get('/', verifyClerkJWT, getCurrentUser);
router.put('/', verifyClerkJWT, updateUser);
router.delete('/', verifyClerkJWT, deleteUser);

// Webhook route for Clerk user creation
router.post('/webhook/clerk', createUser);

export default router;