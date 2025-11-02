import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
import { signupHTML } from "../utils/emailTemplates.js";
import { generateAccessToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";
import { sendToken } from "../utils/sendToken.js";

export const signup = async (req, res) => {
  const { email, username, password, governorate, city, street, role, avatar } =
    req.body;
  try {
    const emailExist = await User.findOne({ email });
    const usernameExist = await User.findOne({ username });

    if (emailExist && emailExist.isVerified) {
      return res.status(409).json({ message: "Email already exists" });
    } else if (
      emailExist &&
      !emailExist.isVerified &&
      emailExist.verificationTokenExpires > Date.now()
    ) {
      return res.status(400).json({
        message: "We already sent you a verification email",
      });
    } else if (
      emailExist &&
      !emailExist.isVerified &&
      emailExist.verificationTokenExpires < Date.now()
    ) {
      const verificationToken = crypto.randomBytes(32).toString("hex");
      emailExist.verificationToken = verificationToken;
      emailExist.verificationTokenExpires = Date.now() + 3600000;

      await emailExist.save();

      const verificationLink = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;
      sendEmail({
        to: email,
        subject: "Verify your Mashaal Market account",
        html: signupHTML(username, verificationLink),
      });

      return res.status(200).json({ message: "Please verify your email" });
    }

    if (usernameExist) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    await User.create({
      email,
      username,
      password: hashedPassword,
      address: { governorate, city, street },
      role: role || "customer",
      avatar,
      verificationToken,
      verificationTokenExpires: Date.now() + 3600000, // 1 hour
    });

    const verificationLink = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;

    sendEmail({
      to: email,
      subject: "Verify your Mashaal Market account",
      html: signupHTML(username, verificationLink),
    });

    res.status(201).json({ message: "User created, please verify your email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signupValidate = async (req, res) => {
  const { token } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified && user.verificationTokenExpires > Date.now()) {
      return res.status(403).json({
        message: "We already sent you a verification email",
      });
    } else if (!user.isVerified && user.verificationTokenExpires < Date.now()) {
      const verificationToken = crypto.randomBytes(32).toString("hex");
      user.verificationToken = verificationToken;
      user.verificationTokenExpires = Date.now() + 3600000;

      await user.save();

      const verificationLink = `${process.env.FRONTEND_URL}/verify/${verificationToken}`;
      sendEmail({
        to: email,
        subject: "Verify your Mashaal Market account",
        html: signupHTML(username, verificationLink),
      });

      return res.status(403).json({ message: "Please verify your email" });
    }

    sendToken(res, user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
 
    if (!refreshToken) {
      return res.status(400).json({ message: "No refresh token provided" });
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
 
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }

        const user = await User.findById(decoded.id);

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const newAccessToken = generateAccessToken(user);

        res.status(200).json({ accessToken: newAccessToken });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
