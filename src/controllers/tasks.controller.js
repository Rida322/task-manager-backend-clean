const pool = require("../config/db");

exports.getTasks = async (req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM tasks WHERE user_id = $1",
    [req.user.id]
  );
  res.json(rows);
};

exports.createTask = async (req, res) => {
  await pool.query(
    "INSERT INTO tasks(user_id, title) VALUES ($1, $2)",
    [req.user.id, req.body.title]
  );
  res.json({ message: "Task added" });
};
exports.deleteTask = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2",
      [req.params.id, req.user.id]
    );
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};

