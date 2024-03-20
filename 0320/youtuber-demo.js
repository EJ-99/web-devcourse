// express 모듈 셋팅
const express = require('express');
const app = express();
app.listen(3000);
app.use(express.json()); // http 외 모듈인 '미들웨어'인 json 설정

// 데이터 셋팅
const youtuber1 = {
  channelTitle: 'DAY6',
  subscribers: '194만명',
  videoNum: '600개',
};

const youtuber2 = {
  channelTitle: '노마드 코더 Nomad Coders',
  subscribers: '49.1만명',
  videoNum: '769개',
};

const youtuber3 = {
  channelTitle: '박성찐이야',
  subscribers: '7.65만명',
  videoNum: '87개',
};

const db = new Map();
let id = 1;
db.set(id++, youtuber1);
db.set(id++, youtuber2);
db.set(id++, youtuber3);

// REST API 설계
// 개별 조회
app.get('/youtuber/:id', function (req, res) {
  let { id } = req.params;
  id = parseInt(id);

  const youtuber = db.get(id);
  if (youtuber) {
    res.json(youtuber);
  } else {
    res.json({
      message: '유튜버 정보를 찾을 수 없습니다.',
    });
  }
});

// 전체 조회
app.get('/youtubers', (req, res) => {
  const result = {};
  for (id of db.keys()) {
    result[id] = db.get(id);
  }
  res.json(result);
});

// 등록
app.post('/youtuber', (req, res) => {
  db.set(id++, req.body);
  res.json({
    message: `${req.body.channelTitle}님, 유튜버가 되신 것을 축하드립니다🎉`,
  });
});
