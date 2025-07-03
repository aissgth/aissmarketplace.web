import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password, phone } = req.body;
  const dbPath = path.resolve('./users.json');
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

  if (!username || !password || !phone) {
    return res.status(400).json({ success: false, error: 'Semua data harus diisi' });
  }

  if (db.users[username]) {
    return res.status(409).json({ success: false, error: 'Username sudah terdaftar' });
  }

  db.users[username] = { password, phone };
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.status(200).json({ success: true });
}