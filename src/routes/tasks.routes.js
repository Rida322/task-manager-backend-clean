const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const pool = require("../config/db");

router.get("/", auth, async (req, res) => {
  const [rows] = await pool.execute(
    "SELECT * FROM tasks WHERE user_id=?",
    [req.user.id]
  );
  res.json(rows);
});

router.post("/", auth, async (req, res) => {
  const { title } = req.body;
  await pool.execute(
    "INSERT INTO tasks (user_id, title, status) VALUES (?, ?, 'pending')",
    [req.user.id, title]
  );
  res.json({ message: "Task added" });
});

module.exports = router;
