import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) return res.status(400).send({ error: 'Missing email' });
    if (!password) return res.status(400).send({ error: 'Missing password' });
    const userExists = await dbClient.users.find({ email });
    if (userExists.length > 0) return res.status(400).send({ error: 'Already exist' });
    const user = await dbClient.users.insertOne({
      email,
      password: sha1(password),
    });
    return res.status(201).send({ id: user.id, email: user.email });
  }
}

export default UsersController;
