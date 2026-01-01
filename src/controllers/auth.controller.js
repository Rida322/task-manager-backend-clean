const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await pool.query("INSERT INTO users(name,email,password) VALUES(?,?,?)",
    [name,email,hash]);
  res.json({ message: "User created" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await pool.query("SELECT * FROM users WHERE email=?", [email]);
  if(rows.length===0) return res.status(400).json({message:"Invalid"});
  const valid = await bcrypt.compare(password, rows[0].password);
  if(!valid) return res.status(400).json({message:"Invalid"});
  const token = jwt.sign({id:rows[0].id,role:rows[0].role},process.env.JWT_SECRET);
  res.json({ token, user: rows[0] });
};
