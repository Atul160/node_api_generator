export const defaultSchema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 2
      },
      email: {
        type: 'string',
        format: 'email'
      },
      age: {
        type: 'number',
        minimum: 0
      }
    },
    required: ['name', 'email']
  }
};