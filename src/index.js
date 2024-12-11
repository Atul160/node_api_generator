import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Dynamically load all routes
const setupRoutes = async () => {
  const routesDir = join(__dirname, 'api/routes');
  
  try {
    const files = await fs.readdir(routesDir);
    
    for (const file of files) {
      if (file.endsWith('Route.js')) {
        const { setupRoutes } = await import(`./api/routes/${file}`);
        const router = express.Router();
        setupRoutes(router);
        app.use(router);
      }
    }
  } catch (error) {
    console.error('Error loading routes:', error);
  }
};

setupRoutes().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});