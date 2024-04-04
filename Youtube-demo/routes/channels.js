const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const {
  create,
  showAll,
  update,
  erase,
  show,
} = require('../api/channelsController');

router.use(express.json());

const validate = (req, res, next) => {
  const err = validationResult(req);

  if (err.isEmpty()) {
    return next(); // 다음 할 일 (미들 웨어, 함수)
  }

  return res.status(400).json(err.array());
};

router
  .route('/')
  .post(
    // 개별 채널 생성
    [
      body('userId').notEmpty().isInt().withMessage('숫자 입력 필요'),
      body('name').notEmpty().isString().withMessage('문자 입력 필요'),
      validate,
    ],
    create
  )
  .get(
    // 전체 채널 조회
    [body('userId').notEmpty().isInt().withMessage('숫자 입력 필요'), validate],
    showAll
  );

router
  .route('/:id')
  .put(
    // 개별 채널 수정
    [
      param('id').isInt().withMessage('채널 id 오류'),
      body('name').notEmpty().isString().withMessage('채널명 오류'),
      validate,
    ],
    update
  )
  .delete(
    // 개별 채널 삭제
    [param('id').isInt().withMessage('채널 id 오류'), validate],
    erase
  )
  .get(
    // 개별 채널 조회
    [param('id').isInt().withMessage('채널 id 오류'), validate],
    show
  );

module.exports = router;
