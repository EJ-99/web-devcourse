const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');

// jwt 모듈
const jwt = require('jsonwebtoken');

// dotenv 모듈
const dotenv = require('dotenv');
dotenv.config();

const conn = require('../mariadb');
router.use(express.json());

const validate = (req, res, next) => {
  const err = validationResult(req);

  if (err.isEmpty()) {
    return next();
  }

  return res.status(400).json(err.array());
};

// 로그인
router.post(
  '/login',
  [
    body('email')
      .notEmpty()
      .isString()
      .isEmail()
      .withMessage('이메일 형식 오류'),
    body('password').notEmpty().isString().withMessage('패스워드 형식 오류'),
    validate,
  ],
  (req, res) => {
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
          process.env.PRIVATE_KEY
        );

        //res.cookie();

        return res.status(200).json({
          message: `로그인 되었습니다.`,
          token,
        });
      }

      return res.status(400).json({
        message: 'email 혹은 비밀번호를 잘못 입력하셨습니다.',
      });
    });
  }
);

// 회원 가입
router.post(
  '/join',
  [
    body('email')
      .notEmpty()
      .isString()
      .isEmail()
      .withMessage('이메일 형식 오류'),
    body('password').notEmpty().isString().withMessage('패스워드 형식 오류'),
    body('contact').notEmpty().isString().withMessage('연락처 형식 오류'),
    body('name').notEmpty().isString().withMessage('이름 형식 오류'),
    validate,
  ],
  (req, res) => {
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
  }
);

// 개별 회원 조회 & 회원 탈퇴
router
  .route('/users')
  .get(
    [
      body('email')
        .notEmpty()
        .isString()
        .isEmail()
        .withMessage('이메일 형식 오류'),
      validate,
    ],
    (req, res) => {
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
    }
  )
  .delete(
    [
      body('email')
        .notEmpty()
        .isString()
        .isEmail()
        .withMessage('이메일 형식 오류'),
      validate,
    ],
    (req, res) => {
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
    }
  );

module.exports = router;
