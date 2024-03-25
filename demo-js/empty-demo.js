const obj1 = {};
const obj2 = { message: '뭐 있음' };
const num = 1;
const str1 = 'one'; // 문자열도 객체
const str2 = '';

console.log(isEmpty(obj1));
console.log(isEmpty(obj2));

//console.log(Object.keys(num).length);
console.log(isEmpty(str1));
console.log(isEmpty(str2));

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
