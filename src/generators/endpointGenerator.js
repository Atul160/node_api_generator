import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { generateRouteTemplate } from '../templates/routeTemplate.js';
import { generateControllerTemplate } from '../templates/controllerTemplate.js';
import { generateSchemaTemplate } from '../templates/schemaTemplate.js';

export class EndpointGenerator {
  constructor(baseDir = 'src/api') {
    this.baseDir = baseDir;
  }

  async generateEndpoint({ method, path, controllerName }) {
    try {
      await this.ensureDirectories();
      
      const files = [
        {
          path: `routes/${controllerName}Route.js`,
          content: generateRouteTemplate({ method, path, controllerName })
        },
        {
          path: `controllers/${controllerName}Controller.js`,
          content: generateControllerTemplate({ controllerName, method })
        },
        {
          path: `schemas/${controllerName}Schema.js`,
          content: generateSchemaTemplate({ controllerName })
        }
      ];

      for (const file of files) {
        await this.writeFile(file.path, file.content);
      }

      console.log(chalk.green(`✓ Generated ${controllerName} endpoint successfully`));
    } catch (error) {
      console.error(chalk.red(`Error generating endpoint: ${error.message}`));
      throw error;
    }
  }

  async ensureDirectories() {
    const dirs = ['routes', 'controllers', 'schemas'].map(dir => 
      path.join(this.baseDir, dir)
    );

    for (const dir of dirs) {
      await fs.mkdir(dir, { recursive: true });
    }
  }

  async writeFile(filePath, content) {
    const fullPath = path.join(this.baseDir, filePath);
    await fs.writeFile(fullPath, content.trim());
    console.log(chalk.blue(`Created ${fullPath}`));
  }
}