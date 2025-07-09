// backend/src/routes/like.ts
import express from 'express';
import { verifyClerkJWT } from '../middlewares/auth';
import {
  toggleLike,
  getPostLikes,
  getUserLikes,
  checkLikeStatus,
} from '../controllers/like';

const router = express.Router();

// Public routes
router.get('/post/:postId', getPostLikes);
router.get('/user/:userId', getUserLikes);
router.get('/status/:postId', verifyClerkJWT, checkLikeStatus);

// Protected routes
router.post('/toggle', verifyClerkJWT, toggleLike);

export default router;