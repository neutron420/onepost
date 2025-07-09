import jwt from 'jsonwebtoken';

export const decodeClerkToken = (token: string) => {
  try {
    return jwt.decode(token, { complete: true });
  } catch (err) {
    return null;
  }
};
