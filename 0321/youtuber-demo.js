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
  channelTitle: '도운',
  subscribers: '16.4만명',
  videoNum: '48개',
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
app.get('/youtubers/:id', function (req, res) {
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
  const youtubers = {};
  db.forEach((youtuber, id) => {
    youtubers[id] = youtuber;
  });
  res.json(youtubers);
});

// 등록
app.post('/youtubers', (req, res) => {
  db.set(id++, req.body);
  res.json({
    message: `${req.body.channelTitle}님, 유튜버가 되신 것을 축하드립니다🎉`,
  });
});

// 개별 유튜버 삭제
app.delete('/youtubers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const youtuber = db.get(id);
  let message;

  if (youtuber) {
    db.delete(id);
    message = `${youtuber.channelTitle}님, 탈퇴 처리되었습니다.`;
  } else {
    message = `요청하신 id(${id})는 존재하지 않는 유튜버입니다.`;
  }

  res.json({ message });
});

// 전체 유튜버 삭제
app.delete('/youtubers', (req, res) => {
  let message;
  if (db.size) {
    db.clear();
    message = '유튜버가 모두 삭제되었습니다🧹';
  } else {
    message = '삭제할 유튜버가 없습니다.';
  }

  res.json({ message });
});

// 개별 유튜버 수정
app.put('/youtubers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const youtuber = db.get(id);
  let message;

  if (youtuber) {
    const newTitle = req.body.channelTitle;
    db.set(id, { ...youtuber, channelTitle: newTitle });
    message = `채널명이 ${youtuber.channelTitle}에서 ${newTitle}으로 변경되었습니다.`;
  } else {
    message = `요청하신 id(${id})는 존재하지 않는 유튜버입니다.`;
  }

  res.json({ message });
});
