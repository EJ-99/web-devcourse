const conn = require('../mariadb');

exports.create = (req, res) => {
  const { name, userId } = req.body;
  const sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`;
  const values = [name, userId];
  conn.query(sql, values, (err, result) => {
    if (err) {
      return res.status(400).end();
    }

    return res.status(201).json(result);
  });
};

exports.showAll = (req, res) => {
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
};

exports.update = (req, res) => {
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
};

exports.erase = (req, res) => {
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
};

exports.show = (req, res) => {
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
};
