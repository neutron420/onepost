// 4. src/routes/notifications.ts
import express from 'express';
import { getNotifications, markAsRead } from '../controllers/notification';
import { verifyClerkJWT } from '../middlewares/auth';
const router = express.Router();

router.get('/', verifyClerkJWT, getNotifications);
router.post('/read', verifyClerkJWT, markAsRead);

export default router;


