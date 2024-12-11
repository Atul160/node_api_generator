export const generateSchemaTemplate = ({ controllerName }) => `
export const defaultSchema = {
  body: {
    type: 'object',
    properties: {
      // Define your schema properties here
    },
    required: []
  }
};
`;