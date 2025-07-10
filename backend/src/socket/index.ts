import { Server } from 'socket.io';

const connectedUsers = new Map<string, string>();

export const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('✅ Socket connected:', socket.id);

    socket.on('join', (userId: string) => {
      try {
        if (!userId) {
          console.warn('⚠️ Cannot join - userId is required');
          socket.emit('error', { message: 'userId is required' });
          return;
        }

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
      } catch (error) {
        console.error('❌ Error in join handler:', error);
        socket.emit('error', { message: 'Failed to join room' });
      }
    });

    socket.on('disconnect', () => {
      try {
        console.log('❌ Socket disconnected:', socket.id);

        for (const [userId, socketId] of connectedUsers.entries()) {
          if (socketId === socket.id) {
            connectedUsers.delete(userId);
            console.log(`🧹 Cleaned up user ${userId} from map`);
            break;
          }
        }
      } catch (error) {
        console.error('❌ Error in disconnect handler:', error);
      }
    });

    // Handle any socket errors
    socket.on('error', (error) => {
      console.error('❌ Socket error:', error);
    });
  });
};

export const sendNotification = (io: Server, userId: string, notification: any) => {
  try {
    if (!userId) {
      console.warn('⚠️ Cannot send notification - userId is required');
      return;
    }

    if (!notification) {
      console.warn('⚠️ Cannot send notification - notification data is required');
      return;
    }

    if (!connectedUsers.has(userId)) {
      console.warn(`⚠️ Cannot send notification — user ${userId} not connected.`);
      return;
    }

    io.to(userId).emit('new_notification', notification);
    console.log(`📨 Sent notification to ${userId}`);
  } catch (error) {
    console.error('❌ Error sending notification:', error);
  }
};