import { Request, Response } from 'express';
import mongoose from 'mongoose';

class HealthCheckController {
  async dbHealthCheck(req: Request, res: Response) {
    try {
      const dbStatus = await mongoose.connection.readyState;
      if (dbStatus === 1) {
        return res.status(200).json({ status: 'UP', dbStatus: 'Connected' });
      } else {
        return res.status(500).json({ status: 'DOWN', dbStatus: 'Disconnected' });
      }
    } catch (error) {
      return res.status(500).json({ status: 'DOWN', error: (error as any).message });
    }
  }
}

export default new HealthCheckController();
