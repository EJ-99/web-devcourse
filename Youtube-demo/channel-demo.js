const express = require('express');
const app = express();
app.listen(1234);
app.use(express.json());

const db = new Map();
let id = 1;

app
  .route('/channels')
  .post((req, res) => {
    // 개별 채널 생성
    const { channelTitle } = req.body;

    if (!channelTitle) {
      return res
        .status(400)
        .json({ message: '요청 데이터가 잘못 되었습니다.' });
    }

    db.set(id++, req.body);
    res
      .status(201)
      .json({ message: `${channelTitle} 채널 생성을 축하드립니다🎉` });
  })
  .get((req, res) => {
    // 전체 채널 조회
    const channels = [];
    db.forEach((channel, key) => {
      channels.push(channel);
    });

    if (channels.length) {
      return res.status(200).json(channels);
    }

    res.status(404).json({ message: '아직 채널이 없습니다' });
  });

app
  .route('/channels/:id')
  .put((req, res) => {
    // 개별 채널 수정
    const channelId = parseInt(req.params.id);
    const { channelTitle: newTitle } = req.body;
    const channel = db.get(channelId);
    const oldTitle = channel?.channelTitle;

    if (!channel) {
      return res.status(404).json({ message: '존재하지 않는 채널입니다.' });
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
      return res.status(404).json({ message: '존재하지 않는 채널입니다.' });
    }

    db.delete(channelId);
    res.status(200).json({
      message: `채널(${channel.channelTitle})이 삭제되었습니다.`,
    });
  })
  .get((req, res) => {
    // 개별 채널 조회
    const channelId = parseInt(req.params.id);
    const channel = db.get(channelId);

    if (!channel) {
      return res.status(404).json({ message: '존재하지 않는 채널입니다.' });
    }

    res.status(200).json(channel);
  });
