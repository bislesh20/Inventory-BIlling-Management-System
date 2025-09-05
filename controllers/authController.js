const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const { validateEmail } = require("../utils/validation");

// Register new user
const register = async (req, res) => {
  try {
    const { username, email, password, businessName } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password || !businessName) {
      return res.status(400).json({
        error: true,
        message: "All fields are required",
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        error: true,
        message: "Please enter a valid email",
      });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({
        error: true,
        message: "Username or email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      businessName,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      error: true,
      message: "Something went wrong. Please try again",
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if both fields are provided
    if (!username || !password) {
      return res.status(400).json({
        error: true,
        message: "Please enter both username and password",
      });
    }

    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return res.status(401).json({
        error: true,
        message: "Invalid username or password",
      });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: true,
        message: "Invalid username or password",
      });
    }

    // Create JWT token
    const token = generateToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.json({
      success: true,
      message: "Login successful",
      token,
      businessName: user.businessName,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: true,
      message: "Something went wrong. Please try again",
    });
  }
};

// Logout user
const logout = (req, res) => {
  try {
    // Clear JWT cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: "strict",
    });

    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      error: true,
      message: "Could not logout. Please try again",
    });
  }
};

module.exports = {
  register,
  login,
  logout,
};
