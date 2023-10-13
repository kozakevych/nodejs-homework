import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cartRoutes from './routes/cartRoutes';
import productRoutes from './routes/productRoutes';
import mongoose from 'mongoose';
import User from './models/user.model';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export interface CurrentUser {
  id: string,
  email: string,
  role: string,
  user_id: string
}

const uri = 'mongodb://mongoadmin:bdung@localhost:27017';
const PORT = 3000;

const app = express();

declare global {
  namespace Express {
      interface Request {
          user: CurrentUser
      }
  }
}

async function main() {
  await mongoose.connect(uri);
  app.listen(3000);
  console.log(`Server started on port ${PORT}`);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
        'someverysecterstring'!,
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
