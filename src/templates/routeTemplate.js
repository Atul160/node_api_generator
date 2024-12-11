export const generateRouteTemplate = ({ method, path, controllerName, validationSchema }) => `
import { ${controllerName}Controller } from '../controllers/${controllerName}Controller.js';
import { validate } from '../middleware/validation.js';
import { ${validationSchema || 'defaultSchema'} } from '../schemas/${controllerName}Schema.js';

export const setup${controllerName}Routes = (router) => {
  router.${method.toLowerCase()}(
    '${path}',
    validate(${validationSchema || 'defaultSchema'}),
    ${controllerName}Controller.handle${method}
  );
};
`;