import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

// Note: The global type declaration is moved to src/types/express.d.ts
// to avoid duplicate declarations

const client = jwksClient({
  jwksUri: process.env.CLERK_JWKS_URL!,
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
});

function getKey(header: any, callback: any) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      return callback(err);
    }
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}

export const verifyClerkJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      message: 'Missing or invalid authorization header. Expected format: Bearer <token>' 
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Missing or invalid token' });
  }

  jwt.verify(
    token,
    getKey,
    {
      audience: process.env.CLERK_AUDIENCE,
      issuer: process.env.CLERK_ISSUER,
      algorithms: ['RS256'],
    },
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ 
          message: 'Token verification failed', 
          error: err.message 
        });
      }

      // Type guard to ensure decoded is a valid JwtPayload with sub
      if (typeof decoded === 'object' && decoded && 'sub' in decoded) {
        req.user = decoded as JwtPayload & { sub: string };
        next();
      } else {
        return res.status(401).json({ 
          message: 'Invalid token format - missing required claims' 
        });
      }
    }
  );
};

// Optional: Helper function to get current user from request
export const getCurrentUser = (req: Request) => {
  return req.user;
};

// Optional: Middleware to check for specific roles or permissions
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  next();
};

// Optional: Middleware to check for specific user ID
export const requireUserId = (userId: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.sub !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};