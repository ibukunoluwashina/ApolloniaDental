const User = require("./users");

const newUser = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: "Username, password, and email are required" });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({ username, password, email, role });
    console.log("Creating user with password:", password);
    await user.save();
    console.log("User saved successfully, hashed password:", user.password);
    res.status(201).json(user);
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt - Email:", email, "Password:", password);

    if (!email || !password) {
      console.log("Missing email or password");
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existingUser = await User.findByCredentials(email, password);
    console.log("User found, generating token...");
    const token = await existingUser.generateAuthToken();
    console.log("Login successful for user:", existingUser.username);
    res
      .status(200)
      .json({ user: existingUser, token, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error.message);
    res
      .status(400)
      .json({ message: "Invalid login credentials", error: error.message });
  }
};

const getUserAdmin = async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging out", error: error.message });
  }
};

// Test endpoint to debug login issues
const testLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Test login - Email:", email, "Password:", password);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found", email });
    }

    console.log(
      "User found:",
      user.username,
      "Hashed password:",
      user.password
    );
    const isMatch = await user.comparePassword(password);
    console.log("Password match:", isMatch);

    res.json({
      userFound: true,
      username: user.username,
      email: user.email,
      passwordMatch: isMatch,
      hashedPassword: user.password,
    });
  } catch (error) {
    console.error("Test login error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { newUser, loginUser, getUserAdmin, logoutUser, testLogin };
