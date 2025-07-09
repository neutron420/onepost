import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const toggleLike = async (req: Request, res: Response) => {
  try {
    const { postId } = req.body;
    const userId = req.user?.sub;

    if (!postId) {
      return res.status(400).json({ error: 'PostId is required' });
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
      });

      // Create notification for post author (if not liking own post)
      if (post.authorId !== userId) {
        await prisma.notification.create({
          data: {
            type: 'like',
            message: `${like.user.name || 'Someone'} liked your post`,
            userId: post.authorId,
          },
        });
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

export const getPostLikes = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const likes = await prisma.like.findMany({
      where: { postId },
      skip,
      take: Number(limit),
      orderBy: {
        createdAt: 'desc',
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
    });

    const totalLikes = await prisma.like.count({
      where: { postId },
    });

    res.json({
      likes,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalLikes,
        pages: Math.ceil(totalLikes / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching post likes:', error);
    res.status(500).json({ error: 'Failed to fetch post likes' });
  }
};

export const getUserLikes = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const likes = await prisma.like.findMany({
      where: { userId },
      skip,
      take: Number(limit),
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            content: true,
            imageUrl: true,
            author: {
              select: {
                id: true,
                name: true,
                email: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    const totalLikes = await prisma.like.count({
      where: { userId },
    });

    res.json({
      likes,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalLikes,
        pages: Math.ceil(totalLikes / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Error fetching user likes:', error);
    res.status(500).json({ error: 'Failed to fetch user likes' });
  }
};

export const checkLikeStatus = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = req.user?.sub;

    if (!userId) {
      return res.json({ liked: false });
    }

    const like = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    res.json({ liked: !!like });
  } catch (error) {
    console.error('Error checking like status:', error);
    res.status(500).json({ error: 'Failed to check like status' });
  }
};