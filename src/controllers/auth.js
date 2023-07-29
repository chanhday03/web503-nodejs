import { signInValidator, signUpValidator } from "../validate/user";
import User from "../models/User";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { SECRET_CODE } = process.env;
///////////////////
export const signUp = async (req, res) => {
  try {
    //B1 : Kiem tra dl
    const { error } = signUpValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        messages: errors,
      });
    }

    //B2 : Email da dki chua ?
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({
        message: "Email nay da ton tai || Dang Nhap",
      });
    }

    // b3: Ma Hoa Mat Khau
    //const hashPassword = bcryptjs.hashSync(req.body.password, 10)
    const hashPassword = await bcryptjs.hash(req.body.password, 10);

    //b4 : Thong bao
    const user = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: hashPassword,
    });
    user.password = undefined; //che mk
    return res.status(200).json({
      message: "DKI thanh cong",
      user,
    });
  } catch (error) {
    return error.status(500).json({
      name: error.name || "Loi",
      messages: error.message || "KT lai ",
    });
  }
};
export const signIn = async (req, res) => {
  try {
    // b1 : validate DL nguoi dung
    const { error } = signInValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        messages: errors,
      });
    }
    // b2 : Kiểm tra xem email có trong db hay không?
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "Email nay chua dk , ban co muon dki khong",
      });
    }

    //b3 : kta pw
    const isMatch = await bcryptjs.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "pw khong dung , vui long kt lai",
      });
    }

    //b4  : tao ra token
    const accessToken = jwt.sign({ _id: user._id }, SECRET_CODE, {
      expiresIn: "1d",
    });

    //b5 : RETURN DNHAP thanh cong
    user.password = undefined
    return res.status(200).json({
      message: "dang nhap thanh cong ",
      accessToken,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
