import { Server } from 'socket.io';

const connectedUsers = new Map<string, string>();

export const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('✅ Socket connected:', socket.id);

    socket.on('join', (userId: string) => {
      const existingSocket = connectedUsers.get(userId);

      // Prevent duplicate socket mapping
      if (existingSocket && existingSocket !== socket.id) {
        console.log(`🔁 User ${userId} already had socket ${existingSocket}. Replacing with ${socket.id}`);
      }

      connectedUsers.set(userId, socket.id);
      socket.join(userId);
      console.log(`👤 User ${userId} joined their room.`);

      // Optional: Confirm join to client
      socket.emit('joined', { userId });
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected:', socket.id);

      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          console.log(`🧹 Cleaned up user ${userId} from map`);
          break;
        }
      }
    });
  });
};

export const sendNotification = (io: Server, userId: string, notification: any) => {
  if (!connectedUsers.has(userId)) {
    console.warn(`⚠️ Cannot send notification — user ${userId} not connected.`);
    return;
  }

  io.to(userId).emit('new_notification', notification);
  console.log(`📨 Sent notification to ${userId}`);
};
