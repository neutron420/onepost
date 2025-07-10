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

// Public routes - put more specific routes first
router.get('/search', searchUsers);
router.get('/:id/activity', getUserActivity);
router.get('/:id', getUser);

// Protected routes - put these before the generic /:id route
router.get('/me', verifyClerkJWT, getCurrentUser);  // Changed from '/' to '/me'
router.put('/me', verifyClerkJWT, updateUser);      // Changed from '/' to '/me'
router.delete('/me', verifyClerkJWT, deleteUser);   // Changed from '/' to '/me'

// Webhook route for Clerk user creation
router.post('/webhook/clerk', createUser);

export default router;