// backend/src/routes/comment.ts
import express from 'express';
import { verifyClerkJWT } from '../middlewares/auth';
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
  getUserComments,
} from '../controllers/comment';

const router = express.Router();

// Public routes
router.get('/post/:postId', getComments);
router.get('/user/:userId', getUserComments);

// Protected routes
router.post('/', verifyClerkJWT, createComment);
router.put('/:id', verifyClerkJWT, updateComment);
router.delete('/:id', verifyClerkJWT, deleteComment);

export default router;