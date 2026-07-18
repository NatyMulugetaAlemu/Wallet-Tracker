import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../lib/sendEmail.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const email = req.body.email?.trim().toLowerCase();
  const code = req.body.code?.trim();
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    if (username.length < 3) {
      return res.status(400).json({ message: "Username should be at least 3 characters long" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      username,
      email:email.toLowerCase(),
      password: hashedPassword,
      verificationCode,
      verificationCodeExpires:
        Date.now() + 10 * 60 * 1000,
    });

    if (user) {
      // const token = generateToken(user._id, res);
      await user.save();

      await sendVerificationEmail(
        email,
        verificationCode
      );

      return res.status(201).json({
        success: true,
        message: "Verification code sent to email",
      });

      // res.status(201).json({
      //   token,
      //   user: {
      //     id: user._id,
      //     username: user.username,
      //     email: user.email,
      //     profilePic: user.profilePic,
      //     createdAt: user.createdAt,
      //   },
      // });

    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const code = req.body.code?.trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.verificationCode) {
      return res.status(400).json({
        message: "No verification code found",
      });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({
        message: "Invalid verification code",
      });
    }

    if (user.verificationCodeExpires < Date.now()) {
      return res.status(400).json({
        message: "Verification code expired",
      });
    }

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;

    await user.save();

    const token = generateToken(user._id, res);

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        profilePic: user.profilePic,
      },
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message:
          "Please verify your email before logging in",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id, res);
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


