import { Command } from 'commander';
import inquirer from 'inquirer';
import { EndpointGenerator } from './generators/endpointGenerator.js';

const program = new Command();

const questions = [
  {
    type: 'input',
    name: 'controllerName',
    message: 'Enter the controller name (e.g., User):',
    validate: input => input.length > 0
  },
  {
    type: 'list',
    name: 'method',
    message: 'Select the HTTP method:',
    choices: ['GET', 'POST', 'PUT', 'DELETE']
  },
  {
    type: 'input',
    name: 'path',
    message: 'Enter the endpoint path (e.g., /users):',
    validate: input => input.startsWith('/')
  }
];

program
  .name('api-generator')
  .description('Generate API endpoints with validation and controllers')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate a new API endpoint')
  .action(async () => {
    try {
      const answers = await inquirer.prompt(questions);
      const generator = new EndpointGenerator();
      await generator.generateEndpoint(answers);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse();