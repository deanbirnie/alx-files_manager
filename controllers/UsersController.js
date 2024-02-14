import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) return res.status(400).json({ error: 'Missing email' });
    if (!password) return res.status(400).json({ error: 'Missing password' });
    try {
      const user = await dbClient.users.create({ email, password });
      return res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      if (err.parent.code === '23505') {
        return res.status(400).json({ error: 'Already exist' });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UsersController;
