const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const pool = require("../config/db");

router.get("/tasks", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admins only" });

  const { rows } = await pool.query("SELECT * FROM tasks");
  res.json(rows);
});

module.exports = router;
