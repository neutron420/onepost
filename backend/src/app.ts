
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';
import notificationRoutes from './routes/notification';
import { setupSocket } from './socket';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
  },
});

setupSocket(io);

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(json());

app.use('/api/notifications', notificationRoutes);

export { app, server };