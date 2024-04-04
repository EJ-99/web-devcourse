const conn = require('../mariadb');
// jwt 모듈
const jwt = require('jsonwebtoken');
// dotenv 모듈
const dotenv = require('dotenv');

dotenv.config();

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT email, password FROM users WHERE email = ?`;
  conn.query(sql, email, (err, result) => {
    if (err) {
      return res.status(400).end();
    }

    if (result[0] && result[0].password === password) {
      // token 발급
      const token = jwt.sign(
        {
          email: result[0].email,
          name: result[0].name,
        },
        process.env.PRIVATE_KEY,
        {
          expiresIn: '30m', //h(시간) m(분)
          issuer: 'eunji', // 토큰을 발행한 사람
        }
      );

      res.cookie('token', token, {
        httpOnly: true,
      });

      return res.status(200).json({
        message: `로그인 되었습니다.`,
      });
    }

    return res.status(403).json({
      message: 'email 혹은 비밀번호를 잘못 입력하셨습니다.',
    });
  });
};

exports.join = (req, res) => {
  const { email, name, password, contact } = req.body;
  let sql = `SELECT id FROM users WHERE email = ?`;
  conn.query(sql, email, (err, result) => {
    if (err) {
      return res.status(400).end();
    }

    if (result?.length) {
      return res.status(400).json({
        message: `${email}은 이미 존재하는 계정입니다.`,
      });
    }

    sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ? ,?)`;
    const values = [email, name, password, contact];
    conn.query(sql, values, (err, result) => {
      if (err) {
        return res.status(400).end();
      }
      res.status(201).json({ message: '환영합니다🍀' });
    });
  });
};

exports.show = (req, res) => {
  const { email } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;
  conn.query(sql, email, (err, result) => {
    if (err) {
      return res.status(400).end();
    }

    if (result[0]) {
      return res.status(200).json(result);
    }

    return res.status(404).json({
      message: '회원 정보가 존재하지 않습니다.',
    });
  });
};

exports.erase = (req, res) => {
  const { email } = req.body;

  const sql = `DELETE FROM users WHERE email = ?`;
  conn.query(sql, email, (err, result) => {
    if (err) {
      return res.status(400).end();
    }

    if (result.affectedRows)
      return res.status(200).json({ message: '탈퇴 처리 되었습니다.' });

    return res.status(404).json({
      message: '회원 정보가 존재하지 않습니다.',
    });
  });
};
