### Initialize Project

```
mkdir express-ts-backend && cd express-ts-backend
pnpm init

```

### Install Dependencies

```
pnpm add express pg dotenv
pnpm add -D typescript tsx @types/express @types/node
```

### Add `tsconfig.json`

//` tsconfig.json`

```
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "moduleResolution": "nodenext",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Create Start Script

// package.json

```
 "scripts": {
    "dev": "tsx watch src/server.ts"
  }
```

### Basic App Bootstrap

// src/server.ts

```
import express, { Application } from 'express';
import dotenv from 'dotenv';
import { logger } from './middleware/logger';

dotenv.config();

const app: Application = express();

// Basic Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);


//  ⛔ Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

//default route
app.get('/', (req, res) => {
    res.send("Welcome to Express + Typescript Backend");
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

### Middleware and Request Flow

* Middleware functions have access to: `req`, `res`, and `next()`
* Used for logging, authentication, validation, etc.

// src/middleware/logger.ts

```
import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
};

```

### Environment Config

//.env file

```
PORT=5000
NODE_ENV=development
DATABASE_URL=postgres://username:password@localhost:5432/your_db
```

// src/config/env.ts

```
import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || 'development';

```
