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

// Protected routes - put most specific routes first
router.post('/toggle', verifyClerkJWT, toggleLike);
router.get('/status/:postId', verifyClerkJWT, checkLikeStatus);

// Public routes - put more specific routes before generic ones
router.get('/post/:postId', getPostLikes);
router.get('/user/:userId', getUserLikes);

export default router;