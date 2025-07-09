// backend/src/controllers/comment.ts - Simple fix with type assertion
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendNotification } from '../socket';

const prisma = new PrismaClient();

export const createComment = async (req: Request, res: Response) => {
  try {
    const { content, postId } = req.body;
    const userId = req.user?.sub;

    if (!content || !postId || !userId) {
      return res.status(400).json({ error: 'Content, postId, and user authentication are required' });
    }

    // Check if post exists
    const postExists = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, authorId: true },
    });

    if (!postExists) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
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
        post: {
          select: {
            id: true,
            title: true,
            authorId: true,
          },
        },
      },
    }) as any; // Type assertion to bypass the error

    // Create notification for post author (if not commenting on own post)
    if (postExists.authorId !== userId) {
      const notification = await prisma.notification.create({
        data: {
          type: 'comment',
          message: `${comment.user.name || 'Someone'} commented on your post`,
          userId: postExists.authorId,
        },
      });

      // Send real-time notification
      const io = req.app.get('io');
      if (io) {
        sendNotification(io, postExists.authorId, notification);
      }
    }

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
};