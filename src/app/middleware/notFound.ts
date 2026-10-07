import { Request, Response } from 'express';
import status from 'http-status';

export const notFound = (req: Request, res: Response) => {
  res.status(status.NOT_FOUND).json({
    status: status.NOT_FOUND,
    message: `Route ${req.originalUrl} not found`,
  });
};
