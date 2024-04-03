const jwt = require('jsonwebtoken'); // jwt 모듈 불러오기
const dotenv = require('dotenv');

dotenv.config();

// 토큰 생성 = jwt 서명 (페이로드, 암호키), 암호화 알고리즘: SHA256
const token = jwt.sign({ foo: 'bar' }, process.env.PRIVATE_KEY);

console.log(token);

// 검증
// 만약 검증에 성공하면, 페이로드 값을 확인할 수 있음!
const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
console.log(decoded);

jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
  if (err) console.log('유효하지 않은 키');
  else console.log(decoded);
});
