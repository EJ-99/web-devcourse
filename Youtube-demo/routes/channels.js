const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const { body, validationResult, param } = require('express-validator');

router.use(express.json());

const validate = (req, res, next) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    return res.status(400).json(err.array());
  }

  next();
};

router
  .route('/')
  .post(
    [
      body('userId').notEmpty().isInt().withMessage('숫자 입력 필요'),
      body('name').notEmpty().isString().withMessage('문자 입력 필요'),
      validate,
    ],
    (req, res) => {
      // 개별 채널 생성
      const { name, userId } = req.body;
      const sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`;
      const values = [name, userId];
      conn.query(sql, values, (err, result) => {
        if (err) {
          return res.status(400).end();
        }

        return res.status(201).json(result);
      });
    }
  )
  .get(
    [body('userId').notEmpty().isInt().withMessage('숫자 입력 필요'), validate],
    (req, res) => {
      // 전체 채널 조회
      const { userId } = req.body;
      const sql = `SELECT * FROM channels WHERE user_id = ?`;
      conn.query(sql, userId, (err, results) => {
        if (err) {
          return res.status(400).end();
        }

        if (results.length) {
          return res.status(200).json(results);
        }

        return res.status(404).json({ message: '아직 채널이 없습니다.' });
      });
    }
  );

router
  .route('/:id')
  .put(
    [
      param('id').isInt().withMessage('채널 id 오류'),
      body('name').notEmpty().isString().withMessage('채널명 오류'),
      validate,
    ],
    (req, res) => {
      // 개별 채널 수정
      const id = parseInt(req.params.id);
      const { name } = req.body;
      const sql = `UPDATE channels SET name = ? WHERE id = ?`;
      const values = [name, id];
      conn.query(sql, values, (err, result) => {
        if (err) {
          return res.status(400).end();
        }

        if (result.affectedRows === 0) {
          return res.status(400).end();
        }

        return res.status(200).json(result);
      });
    }
  )
  .delete(
    [param('id').isInt().withMessage('채널 id 오류'), validate],
    (req, res) => {
      // 개별 채널 삭제
      const id = parseInt(req.params.id);
      const sql = `DELETE FROM channels WHERE id = ?`;
      conn.query(sql, id, (err, result) => {
        if (err) {
          return res.status(400).end();
        }

        if (result.affectedRows === 0) {
          return res.status(400).end();
        }

        return res.status(200).json(result);
      });
    }
  )
  .get(
    [param('id').isInt().withMessage('채널 id 오류'), validate],
    (req, res) => {
      // 개별 채널 조회
      const id = parseInt(req.params.id);
      const sql = `SELECT * FROM channels WHERE id = ?`;
      conn.query(sql, id, (err, result) => {
        if (err) {
          return res.status(400).end();
        }

        if (result[0]) {
          return res.status(200).json(result);
        }

        return res.status(404).json({ message: '존재하지 않는 채널입니다.' });
      });
    }
  );

module.exports = router;
