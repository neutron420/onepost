// backend/src/controllers/like.ts - Fixed version
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendNotification } from '../socket';

const prisma = new PrismaClient();

export const toggleLike = async (req: Request, res: Response) => {
  try {
    const { postId } = req.body;
    const userId = req.user?.sub;

    if (!postId || !userId) {
      return res.status(400).json({ error: 'PostId and user authentication are required' });
    }

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, authorId: true },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if user already liked this post
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (existingLike) {
      // Unlike the post
      await prisma.like.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });

      // Get updated like count
      const likeCount = await prisma.like.count({
        where: { postId },
      });

      res.json({
        action: 'unliked',
        liked: false,
        likeCount,
      });
    } else {
      // Like the post
      const like = await prisma.like.create({
        data: {
          postId,
          userId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              imageUrl: true,
            },
          },
        },
      }) as any; // Type assertion to bypass the error

      // Create notification for post author (if not liking own post)
      if (post.authorId !== userId) {
        const notification = await prisma.notification.create({
          data: {
            type: 'like',
            message: `${like.user.name || 'Someone'} liked your post`,
            userId: post.authorId,
          },
        });

        // Send real-time notification
        const io = req.app.get('io');
        if (io) {
          sendNotification(io, post.authorId, notification);
        }
      }

      // Get updated like count
      const likeCount = await prisma.like.count({
        where: { postId },
      });

      res.json({
        action: 'liked',
        liked: true,
        likeCount,
        like,
      });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ error: 'Failed to toggle like' });
  }
};