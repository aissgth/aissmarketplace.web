import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  const dbPath = path.resolve('./users.json');
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

  if (!db.users[username]) {
    return res.status(404).json({ success: false, error: 'User tidak ditemukan' });
  }

  if (db.users[username].password !== password) {
    return res.status(401).json({ success: false, error: 'Password salah' });
  }

  res.status(200).json({ success: true });
}
