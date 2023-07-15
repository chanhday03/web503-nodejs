import express from "express";
import dotenv from "dotenv";
import router from "./routers";
import mongoose from "mongoose";
const app = express();
dotenv.config();
const { PORT, DB_URL } = process.env;
app.use(express.json());
mongoose.connect(`${DB_URL}/demo`).then(() => console.log("Connected!"));

app.use("/api", router);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
