const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/tasks.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Task Manager Backend Running ✅"));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
