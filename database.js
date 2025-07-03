// Struktur database sederhana untuk menyimpan data user dan skor game // Gunakan localStorage (browser) atau bisa dimodifikasi untuk Firebase / backend

// ===== FILE: database.js =====

const DB_KEY = 'aiss_leaderboard_data';

// Ambil data dari localStorage
function loadData() { const data = localStorage.getItem(DB_KEY); return data ? JSON.parse(data) : []; }

// Simpan data ke localStorage 
function saveData(data) { localStorage.setItem(DB_KEY, JSON.stringify(data)); }

// Tambah atau update skor pengguna function updateScore(username, game, score) { const data = loadData(); const userIndex = data.findIndex(u => u.username === username);

if (userIndex !== -1) { if (!data[userIndex].scores[game] || data[userIndex].scores[game] < score) { data[userIndex].scores[game] = score; // update skor jika lebih tinggi } } else { data.push({ username, scores: { [game]: score } }); }

saveData(data); }

// Ambil leaderboard global berdasarkan nama game 
function getLeaderboard(game) { const data = loadData(); return data .filter(user => user.scores[game]) .sort((a, b) => b.scores[game] - a.scores[game]) .slice(0, 10); // top 10 }

// ===== FILE: leaderboard.html (contoh tampilan leaderboard) =====



<div class="leaderboard-card">
  <h2>Leaderboard Memory Puzzle</h2>
  <ul id="leaderboard-list"></ul>
</div><script>
const leaderboardList = document.getElementById('leaderboard-list');
const topPlayers = getLeaderboard('memory'); // atau 'minesweeper', 'dam', dst

leaderboardList.innerHTML = topPlayers.map((player, i) =>
  `<li>#${i + 1} ${player.username} - ${player.scores['memory']} pts</li>`
).join('');
</script>


