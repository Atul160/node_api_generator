export class UserController {
  static async handleGET(req, res) {
    try {
      // Example implementation
      const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ];
      res.json({ data: users });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}