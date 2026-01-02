const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const pool = require("../config/db");

router.get("/", auth, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id=$1",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/", auth, async (req, res) => {
  const { title } = req.body;

  try {
    await pool.query(
      "INSERT INTO tasks (user_id, title, status) VALUES ($1, $2, $3)",
      [req.user.id, title, "pending"]
    );
    res.json({ message: "Task added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
