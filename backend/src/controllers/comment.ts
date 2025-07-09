// backend/src/controllers/comment.ts - Complete version with all functions
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
    });

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

export const getComments = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const comments = await prisma.comment.findMany({
      where: { postId },
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
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
    });

    const totalComments = await prisma.comment.count({
      where: { postId },
    });

    res.json({
      comments,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalComments,
        pages: Math.ceil(totalComments / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user?.sub;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Check if comment exists and user owns it
    const existingComment = await prisma.comment.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!existingComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (existingComment.userId !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this comment' });
    }

    const comment = await prisma.comment.update({
      where: { id },
      data: { content },
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
    });

    res.json(comment);
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Failed to update comment' });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.sub;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Check if comment exists and user owns it
    const existingComment = await prisma.comment.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!existingComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (existingComment.userId !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this comment' });
    }

    await prisma.comment.delete({
      where: { id },
    });

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};

export const getUserComments = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const comments = await prisma.comment.findMany({
      where: { userId },
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
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
          },
        },
      },
    });

    const totalComments = await prisma.comment.count({
      where: { userId },
    });

    res.json({
      comments,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalComments,
        pages: Math.ceil(totalComments / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching user comments:', error);
    res.status(500).json({ error: 'Failed to fetch user comments' });
  }
};