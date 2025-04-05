const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/blogs",blogRoutes);
app.use("/api/auth",authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));