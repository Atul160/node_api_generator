export const generateControllerTemplate = ({ controllerName, method }) => `
export class ${controllerName}Controller {
  static async handle${method}(req, res) {
    try {
      // TODO: Implement your business logic here
      res.json({ message: '${controllerName} ${method} endpoint' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
`;