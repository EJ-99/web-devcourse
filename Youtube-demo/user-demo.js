// express 모듈 셋팅
const express = require('express');
const app = express();
app.listen(7777);

// http 외 모듈 사용
// json 모듈 : body에서 json을 사용할 때
app.use(express.json());

// 데이터 셋팅
const users = new Map();
users.set('day6leader', { pwd: 'bang0116', name: '박성진' });
users.set('fromyoungk', { pwd: 'yk931219', name: '강영현' });
users.set('lovemyday', { pwd: 'judy94', name: '김원필' });

// 로그인
app.post('/login', (req, res) => {
  const { id, pwd } = req.body;

  if (id && pwd) {
    const user = users.get(id);

    if (user) {
      if (user.pwd === pwd) {
        res.json({
          message: `${user.name}님 환영합니다`,
        });
      } else {
        res.json({
          message: 'id 혹은 비밀번호를 잘못 입력하셨습니다.',
        });
      }
    } else {
      res.json({
        message: 'id 혹은 비밀번호를 잘못 입력하셨습니다.',
      });
    }
  } else {
    res.status(400).json({
      message: '요청 데이터가 잘못되었습니다.',
    });
  }
});

// 회원 가입
app.post('/join', (req, res) => {
  const { id, name, pwd } = req.body;

  if (id && name && pwd) {
    if (users.get(id)) {
      res.status(400).json({
        message: `${id}는 이미 존재하는 id입니다.`,
      });
    } else {
      users.set(id, { name, pwd });
      res.status(201).json({
        message: `${users.get(id).name}님 회원이 되신 걸 환영합니다.`,
      });
    }
  } else {
    res.status(400).json({
      message: '요청 데이터가 잘못되었습니다.',
    });
  }
});

app
  .route('/users/:id')
  .get((req, res) => {
    const { id } = req.params;
    const user = users.get(id);

    if (user) {
      res.status(200).json({
        id,
        name: user.name,
      });
    } else {
      res.status(404).json({
        message: '회원 정보가 존재하지 않습니다.',
      });
    }
  })
  .delete((req, res) => {
    const { id } = req.params;
    const user = users.get(id);

    if (user) {
      users.delete(id);

      res.status(200).json({
        message: `${user.name}님 탈퇴 처리되었습니다.`,
      });
    } else {
      res.status(404).json({
        message: '회원 정보가 존재하지 않습니다.',
      });
    }
  });

// // 회원 정보 조회
// app.get('/users/:id', (req, res) => {
//   const { id } = req.params;
//   const user = users.get(id);

//   if (user) {
//     res.status(200).json({
//       id,
//       name: user.name,
//     });
//   } else {
//     res.status(404).json({
//       message: '회원 정보가 존재하지 않습니다.',
//     });
//   }
// });

// // 회원 탈퇴
// app.delete('/users/:id', (req, res) => {
//   const { id } = req.params;
//   const user = users.get(id);

//   if (user) {
//     users.delete(id);

//     res.status(200).json({
//       message: `${user.name}님 탈퇴 처리되었습니다.`,
//     });
//   } else {
//     res.status(404).json({
//       message: '회원 정보가 존재하지 않습니다.',
//     });
//   }
// });