const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes);

mongoose.connect(
  "mongodb://Nithyashree06:Saibaba06@ac-rgcg0bv-shard-00-00.spypgov.mongodb.net:27017,ac-rgcg0bv-shard-00-01.spypgov.mongodb.net:27017,ac-rgcg0bv-shard-00-02.spypgov.mongodb.net:27017/todoDB?ssl=true&replicaSet=atlas-c36hxu-shard-0&authSource=admin&appName=Cluster0"
)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("DB ERROR ❌:", err));
app.listen(5000, () => console.log("Server running on 5000"));