const pool = require("../config/db");

exports.getTasks = async (req,res)=>{
  const [rows] = await pool.query("SELECT * FROM tasks WHERE user_id=?",[req.user.id]);
  res.json(rows);
};

exports.createTask = async (req,res)=>{
  await pool.query("INSERT INTO tasks(user_id,title) VALUES(?,?)",[req.user.id, req.body.title]);
  res.json({message:"Task added"});
};
