export const validate = (schema) => {
  return (req, res, next) => {
    try {
      // Basic validation implementation
      // You can enhance this with a validation library like Joi or Yup
      if (schema.body && req.body) {
        const { properties, required } = schema.body;
        
        // Check required fields
        if (required) {
          for (const field of required) {
            if (!(field in req.body)) {
              throw new Error(`Missing required field: ${field}`);
            }
          }
        }
      }
      
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
};