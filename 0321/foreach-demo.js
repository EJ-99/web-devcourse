// Array + forEach
// (value, index)
const days = ['🐻', '🦊', '🐰', '🐶'];
days.forEach((val, idx, c) => {
  console.log(`${idx} : ${val}`);
});

// Map + forEach
// (value, key)
const map = new Map();
map.set('🐻', 'bang');
map.set('🦊', 'ke');
map.set('🐰', 'pil');
map.set('🐶', 'don');

map.forEach((val, key) => {
  console.log(`${key} : ${val}`);
});
