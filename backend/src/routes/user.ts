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

// Webhook route - MUST be first to avoid conflicts with parameterized routes
router.post('/webhook/clerk', createUser);

// Protected routes - put these before any parameterized routes
router.get('/me', verifyClerkJWT, getCurrentUser);
router.put('/me', verifyClerkJWT, updateUser);
router.delete('/me', verifyClerkJWT, deleteUser);

// Public routes - put more specific routes before generic parameterized routes
router.get('/search', searchUsers);

// Parameterized routes - MUST be last to avoid conflicts
router.get('/:id/activity', getUserActivity);
router.get('/:id', getUser);

export default router;