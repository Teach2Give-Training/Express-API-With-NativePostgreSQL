import express, { Application,Response } from 'express';
import dotenv from 'dotenv';
import { logger } from './middleware/logger';
import client from './db/db';
import { userRouter } from './users/user.routes';

dotenv.config();

const app: Application = express();

// Basic Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);



//default route
app.get('/', (req, res:Response) => {
  res.send("Welcome to Express API Backend");
});

// Importing user routes
app.use('/api',userRouter)

const PORT = process.env.PORT || 5000;

// Connect to the database, then start the server
client.connect()
  .then(() => {
    console.log("✅ Connected to PG Database");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
  console.error("❌ Failed to connect to PostgreSQL database:", err);
  process.exit(1);
  });




