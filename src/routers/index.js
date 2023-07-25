import express from "express";
import routerProducts from "./products";
import routerAuth from "./auth";
const router = express.Router();

router.use("/products", routerProducts);
router.use("/auth", routerAuth);
// router.use("/users", routerUsers);
export default router;
