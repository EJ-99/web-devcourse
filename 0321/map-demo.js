const days = ['🐻', '🦊', '🐰', '🐶'];

const resultForeach = days.forEach((val) => {
  return val + val;
});
console.log(days);

const resultMap = days.map((val, idx, c) => {
  return val + val;
});
console.log(days);

console.log(`foreach로 리턴한 결과 : ${resultForeach}`);
console.log(`map으로 리턴한 결과 : ${resultMap}`);
