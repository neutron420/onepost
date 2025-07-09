import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.sub;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            posts: true,
            comments: true,
            likes: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        imageUrl: true,
        createdAt: true,
        _count: {
          select: {
            posts: true,
            comments: true,
            likes: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.sub;
    const { name, imageUrl } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        imageUrl,
      },
      include: {
        _count: {
          select: {
            posts: true,
            comments: true,
            likes: true,
          },
        },
      },
    });

    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { id, email, name, imageUrl } = req.body;

    if (!id || !email) {
      return res.status(400).json({ error: 'ID and email are required' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await prisma.user.create({
      data: {
        id,
        email,
        name,
        imageUrl,
      },
      include: {
        _count: {
          select: {
            posts: true,
            comments: true,
            likes: true,
          },
        },
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.sub;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

export const getUserActivity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Get user's recent posts
    const recentPosts = await prisma.post.findMany({
      where: { authorId: id },
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        createdAt: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    // Get user's recent comments
    const recentComments = await prisma.comment.findMany({
      where: { userId: id },
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        content: true,
        createdAt: true,
        post: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    // Get user's recent likes
    const recentLikes = await prisma.like.findMany({
      where: { userId: id },
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        createdAt: true,
        post: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    res.json({
      recentPosts,
      recentComments,
      recentLikes,
    });
  } catch (error) {
    console.error('Error fetching user activity:', error);
    res.status(500).json({ error: 'Failed to fetch user activity' });
  }
};

export const searchUsers = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: q as string,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: q as string,
              mode: 'insensitive',
            },
          },
        ],
      },
      skip,
      take: Number(limit),
      select: {
        id: true,
        email: true,
        name: true,
        imageUrl: true,
        createdAt: true,
        _count: {
          select: {
            posts: true,
            comments: true,
            likes: true,
          },
        },
      },
    });

    const totalUsers = await prisma.user.count({
      where: {
        OR: [
          {
            name: {
              contains: q as string,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: q as string,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    res.json({
      users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalUsers,
        pages: Math.ceil(totalUsers / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Failed to search users' });
  }
};