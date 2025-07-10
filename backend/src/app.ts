// backend/src/app.ts
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';
import { setupSocket } from './socket';

// Import all routes
import postRoutes from './routes/post';
import commentRoutes from './routes/comment';
import likeRoutes from './routes/like';
import userRoutes from './routes/user';
import notificationRoutes from './routes/notification';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

// Setup socket and make it available to routes
setupSocket(io);
app.set('io', io);

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Register all routes with proper prefixes
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export { app, server };