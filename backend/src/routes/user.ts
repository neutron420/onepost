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

// Protected routes - put these first before any parameterized routes
router.get('/me', verifyClerkJWT, getCurrentUser);
router.put('/me', verifyClerkJWT, updateUser);
router.delete('/me', verifyClerkJWT, deleteUser);

// Public routes - put more specific routes before generic parameterized routes
router.get('/search', searchUsers);
router.get('/:id/activity', getUserActivity);
router.get('/:id', getUser);

// Webhook route for Clerk user creation
router.post('/webhook/clerk', createUser);

export default router;