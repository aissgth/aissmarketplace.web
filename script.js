function toggleSub(id) {
  const subMenu = document.getElementById(`sub-${id}`);
  if (subMenu.classList.contains('show')) {
    subMenu.classList.remove('show');
  } else {
    document.querySelectorAll('.sub-options').forEach(el => el.classList.remove('show'));
    subMenu.classList.add('show');
  }
}

function startQRISPayment() {
  alert("Redirecting to QRIS payment...");
  window.location.href = "payqris.html"; // Ganti dengan URL pembayaran QRIS yang sebenarnya
}

function startDanaPayment() {
  alert("Redirecting to DANA payment...");
  window.location.href = "paydana.html"; // Ganti dengan URL pembayaran DANA yang sebenarnya
}

function startGopayPayment() {
  alert("Redirecting to GOPAY payment...");
  window.location.href = "paygopay.html"; // Ganti dengan URL pembayaran GOPAY yang sebenarnya
}
