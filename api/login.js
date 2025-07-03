import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Hanya POST' });
  }

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Input tidak lengkap' });
  }

  const dbPath = path.resolve('./users.json');
  const db = fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath)) : { users: {} };

  if (!db.users[username] || db.users[username].password !== password) {
    return res.status(401).json({ success: false, error: 'Login gagal' });
  }

  res.status(200).json({ success: true });
}
