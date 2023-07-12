// import { createServer } from "http";
// const server = createServer((req, res) => {
//   console.log("hi , chanh day");
//   res.end(`<h1>chanhday</h1>`);
// });
// server.listen(8088, () => {
//   console.log("Server is running port 8088");
// });
// const products = [
//   {
//     id: "1",
//     name: "SP1",
//     price: 100,
//   },
//   {
//     id: "2",
//     name: "SP2",
//     price: 200,
//   },
//   {
//     id: "3",
//     name: "SP3",
//     price: 300,
//   },
// ];
import express from "express";
import router from "./routers"
import dotenv from "dotenv"
// import {
//   getAll,
//   getDetail,
//   update,
//   create,
//   remove,
// } from "./controllers/products";

const app = express();
dotenv.config()
const { PORT } = process.env
app.use(express.json());
app.use("/api" , router)

app.get("/", (req, res) => {
  res.end(`<h1>Home</h1>`);
});
app.get("/about", (req, res) => {
  res.end(`<h1>About</h1>`);
});
//Call List Products
app.get("/products", getAll);
///Call Detail Product
app.get("/products/:id", getDetail);
///Add Products
app.post("/products", create);
///Update Products
app.put("/products/:id", update);
//Delete
app.delete("/products/:id", remove);
// app.delete("/products/:id", (req, res) => {
//   const id = req.params.id;
//   const product = products.find((product) => +product.id === +id);
//   if (!product) {
//     return res.status(404).json({
//       message: "No products found",
//     });
//   }
//   const NewProduct = products.filter((product) => +product.id !== +id);
//   return res.status(200).json({
//     message: "Delete for successful detail product list!",
//     product: product,
//     NewProduct,
//   });
// });
///
app.listen(8088, () => {
  console.log("Server is running on port 8088");
});
