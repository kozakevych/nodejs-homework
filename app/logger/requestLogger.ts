import { Request, Response, NextFunction } from 'express';
import logger from './logger';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const startTime = new Date().getTime();

  res.on('finish', () => {
    const endTime = new Date().getTime();
    const responseTime = endTime - startTime;

    logger.info(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${responseTime}ms)`);
  });

  next();
}
