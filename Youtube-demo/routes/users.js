const express = require('express');
const router = express.Router();

const conn = require('../mariadb');
router.use(express.json());

// 로그인
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: '요청 데이터가 잘못되었습니다.',
    });
  }

  const sql = `SELECT email, password FROM users WHERE email = ?`;
  conn.query(sql, email, (err, result) => {
    if (!result[0] || result[0].password !== password) {
      return res.status(400).json({
        message: 'email 혹은 비밀번호를 잘못 입력하셨습니다.',
      });
    }

    return res.status(200).json({
      message: `로그인 되었습니다.`,
    });
  });
});

// 회원 가입
router.post('/join', (req, res) => {
  const { email, name, password, contact } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({
      message: '요청 데이터가 잘못되었습니다.',
    });
  }

  let sql = `SELECT id FROM users WHERE email = ?`;
  conn.query(sql, email, (err, result) => {
    if (result?.length) {
      return res.status(400).json({
        message: `${email}은 이미 존재하는 계정입니다.`,
      });
    }

    sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ? ,?)`;
    const values = [email, name, password, contact];
    conn.query(sql, values, (err, result) => {
      res.status(201).json({ message: '환영합니다🍀' });
    });
  });
});

// 개별 회원 조회 & 회원 탈퇴
router
  .route('/users')
  .get((req, res) => {
    const { email } = req.body;

    const sql = `SELECT * FROM users WHERE email = ?`;
    conn.query(sql, email, (err, result) => {
      if (result?.length) {
        return res.status(200).json(result);
      }

      return res.status(404).json({
        message: '회원 정보가 존재하지 않습니다.',
      });
    });
  })
  .delete((req, res) => {
    const { email } = req.body;

    const sql = `DELETE FROM users WHERE email = ?`;
    conn.query(sql, email, (err, result) => {
      if (result.affectedRows)
        return res.status(200).json({ message: '탈퇴 처리 되었습니다.' });

      return res.status(404).json({
        message: '회원 정보가 존재하지 않습니다.',
      });
    });
  });

module.exports = router;
