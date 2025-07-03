import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Hanya POST' });
  }

  const { username, password, phone } = req.body;
  if (!username || !password || !phone) {
    return res.status(400).json({ success: false, error: 'Input tidak lengkap' });
  }

  const dbPath = path.resolve('./users.json');
  let db = fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath)) : { users: {} };

  if (db.users[username]) {
    return res.status(409).json({ success: false, error: 'Username sudah dipakai' });
  }

  db.users[username] = { password, phone };
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.status(200).json({ success: true });
}
