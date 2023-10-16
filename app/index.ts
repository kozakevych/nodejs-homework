import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cartRoutes from './routes/cartRoutes';
import productRoutes from './routes/productRoutes';
import healthRoutes from './routes/healthCheck';
import mongoose from 'mongoose';
import User from './models/user.model';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { requestLogger } from './logger/requestLogger';
import logger from './logger/logger';
import debug from 'debug';

export interface CurrentUser {
  id: string,
  email: string,
  role: string,
  user_id: string
}

const app = express();
let connections: any = [];

declare global {
  namespace Express {
      interface Request {
          user: CurrentUser
      }
  }
}

async function main() {
  dotenv.config();

  if (process.env.NODE_ENV === 'development') {
    debug.enable(process.env.DEBUG || 'app:*');
  } else {
    debug.disable();
  }

  const { PORT, URI } = process.env;
  await mongoose.connect(URI || 'mongodb://mongoadmin:bdung@localhost:27017');
  const server = app.listen(PORT || 3000);

  logger.info(`Server started on port ${PORT}`);

  server.on('connection', (connection) => {
    connections.push(connection);
    connection.on('close', () => {
      connections = connections.filter((currentConnection: any) => currentConnection !== connection);
    });
  });

  function shutdown() {
    console.log('Received kill signal, shutting down gracefully');
    
    server.close(() => {
      console.log('Closed out remaining connections');
      process.exit(0);
    });
  
    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 20000);
  
    connections.forEach((connection: any) => connection.end());

    setTimeout(() => {
      connections.forEach((connection: any) => connection.destroy());
    }, 10000);
  }
  
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use('/register', async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, isAdmin, email, password } = req.body;

    if (!(email && password && first_name && last_name)) {
      res.status(400).send('All input is required');
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      role: isAdmin === 'true' ? 'admin' : 'user'
    });

    res.status(201).send('User successfully registered');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send('All input is required');
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email, role: user.role },
        process.env.TOKEN_KEY!,
        {
          expiresIn: '2h',
        }
      );

      return res.status(200).json({
        token
      });
    }
    res.status(400).send('Invalid Credentials');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/api/profile/cart', cartRoutes);
app.use('/api/products', productRoutes);
app.use('/api/health', healthRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({
    data: null,
    error: {
      message: 'Ooops, something went wrong'
    }
  });
});

main();
