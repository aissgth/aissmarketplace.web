function toggleSub(id) {
  const subMenu = document.getElementById(`sub-${id}`);
  if (subMenu.classList.contains('show')) {
    subMenu.classList.remove('show');
  } else {
    document.querySelectorAll('.sub-options').forEach(el => el.classList.remove('show'));
    subMenu.classList.add('show');
  }
}