const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
router.use(express.json());

const db = new Map();
let id = 1;

router
  .route('/')
  .post((req, res) => {
    // 개별 채널 생성
    const { name, user_id } = req.body;

    if (!name || !user_id) {
      return res
        .status(400)
        .json({ message: '요청 데이터가 잘못 되었습니다.' });
    }

    const sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`;
    const values = [name, user_id];
    conn.query(sql, values, (err, result) => {
      if (result?.affectedRows) {
        return res
          .status(201)
          .json({ message: `${name} 채널 생성을 축하드립니다🎉` });
      }

      return res
        .status(400)
        .json({ message: 'user_id값이 유효하지 않습니다.' });
    });
  })
  .get((req, res) => {
    // 전체 채널 조회
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: '로그인이 필요한 페이지입니다.' });
    }

    const sql = `SELECT * FROM channels WHERE user_id = ?`;
    conn.query(sql, user_id, (err, results) => {
      if (results.length) {
        return res.status(200).json(results);
      }

      return res.status(404).json({ message: '아직 채널이 없습니다.' });
    });
  });

router
  .route('/:id')
  .put((req, res) => {
    // 개별 채널 수정
    const channelId = parseInt(req.params.id);
    const { channelTitle: newTitle } = req.body;
    const channel = db.get(channelId);
    const oldTitle = channel?.channelTitle;

    if (!channel) {
      return res.status(404).json({ message: '존재하지 않는 채널입니다' });
    }

    if (!newTitle) {
      return res
        .status(400)
        .json({ message: '요청 데이터가 잘못 되었습니다.' });
    }

    channel.channelTitle = newTitle;
    db.set(channelId, channel);
    res.status(200).json({
      message: `채널명이 ${oldTitle}에서 ${newTitle}(으)로 변경되었습니다.`,
    });
  })
  .delete((req, res) => {
    // 개별 채널 삭제
    const channelId = parseInt(req.params.id);
    const channel = db.get(channelId);

    if (!channel) {
      return res.status(404).json({ message: '존재하지 않는 채널입니다' });
    }

    db.delete(channelId);
    res.status(200).json({
      message: `채널(${channel.channelTitle})이 삭제되었습니다.`,
    });
  })
  .get((req, res) => {
    // 개별 채널 조회
    const id = parseInt(req.params.id);
    const sql = `SELECT * FROM channels WHERE id = ?`;
    conn.query(sql, id, (err, result) => {
      if (result[0]) {
        return res.status(200).json(result);
      }

      return res.status(404).json({ message: '존재하지 않는 채널입니다.' });
    });
  });

module.exports = router;
