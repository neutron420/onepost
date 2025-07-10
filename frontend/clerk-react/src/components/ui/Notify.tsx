import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import { io, Socket } from 'socket.io-client';

interface Notification {
  id: string;
  message: string;
  createdAt: string;
  read: boolean;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export default function Notify() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      message: 'Welcome! This is a sample notification.',
      createdAt: new Date().toISOString(),
      read: false,
      type: 'info'
    },
    {
      id: '2',
      message: 'You have a new comment on your blog.',
      createdAt: new Date().toISOString(),
      read: true,
      type: 'success'
    },
  ]);
  
  const socketRef = useRef<Socket | null>(null);
  const hasAddedWelcome = useRef(false);

  // Add sign-in notification (only once)
  useEffect(() => {
    if (user && !hasAddedWelcome.current) {
      const welcome: Notification = {
        id: `signin-${user.id}`,
        message: `Welcome back! You signed in with ${user.primaryEmailAddress?.emailAddress ?? 'your email'}`,
        createdAt: new Date().toISOString(),
        read: false,
        type: 'success'
      };
      setNotifications(prev => [welcome, ...prev]);
      hasAddedWelcome.current = true;
    }
  }, [user]);

  // Socket.IO connection and cleanup
  useEffect(() => {
    if (!user?.id) return;

    // Create socket connection
    socketRef.current = io('http://localhost:3001', {
      withCredentials: true,
    });

    const socket = socketRef.current;

    // Join user-specific room
    socket.emit("join", user.id);

    // Listen for new notifications
    socket.on("notification", (data: { id: string; message: string; type?: Notification['type'] }) => {
      const newNotification: Notification = {
        id: data.id,
        message: data.message,
        createdAt: new Date().toISOString(),
        read: false,
        type: data.type || 'info'
      };
      setNotifications(prev => [newNotification, ...prev]);
    });

    // Connection event handlers
    socket.on("connect", () => {
      console.log("Connected to notification server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from notification server");
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    // Cleanup function
    return () => {
      if (socket) {
        socket.off("notification");
        socket.off("connect");
        socket.off("disconnect");
        socket.off("connect_error");
        socket.disconnect();
      }
    };
  }, [user?.id]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string = 'info') => {
    const iconColors = {
      info: 'bg-blue-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500'
    };

    return (
      <div className={`w-2 h-2 ${iconColors[type as keyof typeof iconColors] || 'bg-black'} rounded-full`}></div>
    );
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="relative">
      {/* Notification button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative p-3 rounded-full bg-white shadow-lg border border-gray-300 hover:bg-gray-50 transition-all duration-300 group"
      >
        {/* Bell icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-black group-hover:text-gray-700 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 00-4-5.7V5a2 2 0 10-4 0v.3C7.7 6.2 6 8.4 6 11v3.2a2 2 0 01-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z"
          />
        </svg>

        {/* Notification badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Subtle pulse animation for new notifications */}
        {unreadCount > 0 && (
          <motion.div
            className="absolute inset-0 rounded-full bg-white opacity-10"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="absolute right-0 mt-2 w-96 bg-white/98 backdrop-blur-sm text-black rounded-xl shadow-2xl border border-gray-300 z-50 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-300 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-black">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-black hover:text-gray-600 font-medium transition-colors duration-200"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
                  </p>
                )}
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-6 py-8 text-center">
                    <p className="text-gray-500 text-sm">No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.3 }}
                      className={`group relative px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition-all duration-300 cursor-pointer ${!notification.read ? 'bg-gray-100' : ''}`}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-2">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${!notification.read ? 'font-medium text-black' : 'text-gray-600'}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTimeAgo(notification.createdAt)}
                          </p>
                        </div>
                        <div className="flex-shrink-0 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {!notification.read && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                              className="p-1 text-black hover:text-gray-600 rounded"
                              title="Mark as read"
                            >
                              ✓
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="p-1 text-gray-400 hover:text-black rounded"
                            title="Delete"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {notifications.length > 0 && (
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-300">
                  <button className="text-sm text-black hover:text-gray-600 font-medium transition-colors duration-200">
                    View all notifications
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}