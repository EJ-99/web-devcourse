const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { login, join, show, erase } = require('../api/usersController');

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
  login
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
  join
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
    show
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
    erase
  );

module.exports = router;
