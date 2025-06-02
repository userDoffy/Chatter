import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";
import { sendOtpEmail } from "../utils/nodemailer.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", message: "Email already exists" });
    }
    
    const Otp = Math.floor(100000 + Math.random() * 900000).toString();
    const OtpExpireAt = new Date(Date.now() + 5 * 60 * 1000);

    const newUser = await Users.create({
      username,
      email,
      password,
      Otp,
      OtpExpireAt,
    });
    await sendOtpEmail(email, Otp);

    res.status(201).json({
      status: "success",
      message: "User registered! Please verify OTP to continue",
      email,
    });
  } catch (error) {
    next(error);
  }
};

export const twoFactorAuth = async (req, res, next) => {
  try {
    const { email, Otp } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    
    if (user.Otp !== Otp || user.OtpExpireAt < new Date()) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid or expired OTP" });
    }
    user.Otp = null;
    user.OtpExpireAt = null;
    user.isVerified = true;
    await user.save();

    const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "5d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ status: "success", message: "Email verified successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid || !user.isAccountVerified) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid email or password." });
    }

    if (!(user.role === role)) {
      return res
        .status(400)
        .json({ status: "error", message: "Your role doesn't match." });
    }

    const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "5d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ status: "success", message: "Logged in successfully!" });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const _id = req.user._id;
    const user = await Users.findById(_id);

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const { username, email, image, bio, isVerified } = user;

    const host = `${req.protocol}://${req.get("host")}`;
    const profilepicUrl = image ? `${host}${image}` : "";

    return res.status(200).json({
      status: "success",
      user: {
        _id,
        username,
        email,
        bio,
        isVerified,
        image: profilepicUrl,
      },
    });
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};
