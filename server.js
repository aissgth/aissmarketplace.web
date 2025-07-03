const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname)); // biar HTML/CSS bisa diakses

const dbPath = path.join(__dirname, 'users.json');

// Pastikan file database ada
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({ users: {} }, null, 2));
}

// API untuk daftar
app.post('/api/daftar', (req, res) => {
  const { username, password, phone } = req.body;

  if (!username || !password || !phone)
    return res.json({ success: false, error: 'Data tidak lengkap' });

  const db = JSON.parse(fs.readFileSync(dbPath));
  if (db.users[username])
    return res.json({ success: false, error: 'Username sudah terdaftar' });

  db.users[username] = { password, phone };
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.json({ success: true });
});

// API untuk login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const db = JSON.parse(fs.readFileSync(dbPath));
  if (!db.users[username])
    return res.json({ success: false, error: 'User tidak ditemukan' });

  if (db.users[username].password !== password)
    return res.json({ success: false, error: 'Password salah' });

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});