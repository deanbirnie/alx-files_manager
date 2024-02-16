import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    const hashedPassword = sha1(password);

    if (!email) return res.status(400).send({ error: 'Missing email' });
    if (!password) return res.status(400).send({ error: 'Missing password' });

    const user = await dbClient.db.collection('users').findOne({ email });

    if (user) return res.status(400).send({ error: 'Already exist' });

    const result = await dbClient.db.collection('users').insertOne({ email, password: hashedPassword });
    const { _id } = result;
    return res.status(201).send({ email, password: hashedPassword, _id });
  }
}

export default UsersController;
