import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const userId = req.headers['x-user-id'] as string;
  if (!userId) {
    return res.status(401).json({
      data: null,
      error: {
        message: "Header x-user-id is missing or no user with such id"
      }
    });
  }

  req.userId = userId;
  next();
};
