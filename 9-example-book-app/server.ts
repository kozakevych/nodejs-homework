import dotenv from "dotenv";
import * as database from "./config/database";
import express, { Express, Request, Response } from "express";

import User from "./model/user";
import Book from "./model/book";

import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { verifyToken, CurrentUser } from "./middleware/auth";
import { isAuthor } from "./middleware/isAuthor";
import { isBookAuthor } from "./middleware/isBookAuthor";

declare global {
    namespace Express {
        interface Request {
            user: CurrentUser
        }
    }
}

export async function bootstrap(): Promise<Express> {
  // use .env file to configure environment variables
  dotenv.config();
  // connect to database
  await database.connect();

  const app = express();

  app.use(express.json());

  app.post("/register", async (req: Request, res: Response) => {
    try {
      // Get user input
      const { first_name, last_name, isAuthor, email, password } = req.body;

      // Validate user input
      if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
      }

      // Validate if user already exist in our database
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        role: isAuthor === "true" ? "author" : "reader"
      });

      res.status(201).send("User successfully registered");
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });

  app.post("/login", async (req: Request, res: Response) => {
    try {
      // Get user input
      const { email, password } = req.body;

      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email, role: user.role },
          process.env.TOKEN_KEY!,
          {
            expiresIn: "2h",
          }
        );

        return res.status(200).json({
          token
        });
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get('/api/books', async (req: Request, res: Response) => {
    const books = await Book.find({});

    return res.status(200).json(books);
  });

  app.post('/api/books', isAuthor, async (req: Request, res: Response) => {
    try {
      // Get user input
      const { title, text } = req.body;
      const author = req.user;

      // Validate user input
      if (!(title && text)) {
        return res.status(400).send("All input is required");
      }

      // Validate if user already exist in our database
      const oldBook = await Book.findOne({ title });

      if (oldBook) {
        return res.status(409).send("Book Already Exist.");
      }

      const book = await Book.create({
        title,
        text,
        author_id: author.user_id
      });

      res.status(201).json({
        book_id: book._id
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });

  app.delete('/api/books/:bookId', isAuthor, isBookAuthor, async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;

        await Book.deleteOne({
            _id: bookId
        });

        res.status(204).send("Book deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
  });

  app.use('/api', verifyToken);

  return app;
}