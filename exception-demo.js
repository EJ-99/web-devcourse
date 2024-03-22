const express = require('express');
const app = express();
app.listen(1234);

const days = [
  { id: 1, name: '성진' },
  { id: 2, name: '영현' },
  { id: 3, name: '원필' },
  { id: 4, name: '도운' },
];

// 전체 조회
app.get('/days', (req, res) => {
  res.json(days); // json array
});

// 개별 조회
app.get('/days/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const day = days.find((day) => day.id === id);

  if (day) {
    res.json(day);
  } else {
    res
      .status(404)
      .json({ message: `전달해주신 id(${id})는 존재하지 않는 id입니다.` });
  }
});
