import { signUpValidator } from "../validate/user";
import User from "../models/User";
import bcryptjs from "bcrypt";
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
