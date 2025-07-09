import express from 'express';
import { verifyClerkJWT } from '../middlewares/auth';
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getUserPosts,
} from '../controllers/post';

const router = express.Router();

// Public routes
router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/user/:userId', getUserPosts);

// Protected routes
router.post('/', verifyClerkJWT, createPost);
router.put('/:id', verifyClerkJWT, updatePost);
router.delete('/:id', verifyClerkJWT, deletePost);

export default router;