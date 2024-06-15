import express from "express";
import { addUser, findUserByEmail, findAllUsers } from "../../services/users/index.js";
import { hashPassword, generateJwt, comparePassword } from "../../services/tools/index.js";
import isAuthenticated from "../../../middlewares/isAuth/index.js";
import isAdmin from "../../../middlewares/isAdmin/index.js";
import { check, validationResult } from "express-validator";

const router = express.Router();

const validateUser = [
  check("email").isEmail().withMessage("Please provide a valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

router.post("/adduser", validateUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, role } = req.body;

  try {
    const userExists = await findUserByEmail(email);

    const hashedPassword = await hashPassword(password);
    // Check if user already exists
    if (userExists) {
      return res.status(400).json({ message: "This mail already exists" });
    }
    const user = await addUser(email, hashedPassword, role);

    const payload = {
      _id: user._id,
      email: user.email,
    };

    const token = await generateJwt(payload);

    res.cookie('authToken', token, {httpOnly: true,secure: true,sameSite: 'strict'
    });
    
    return res.status(201).json({
      message: "agent created",
      user: { email: user.email, _id: user._id},
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});


// login a user
router.post("/login", validateUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      _id: user._id,
      email: user.email,
    };

    const token = await generateJwt(payload);

  res.cookie('authToken', token, {httpOnly: true,secure: true,sameSite: 'strict'
    });
    return res.status(200).json({ message: "agent logged in" });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

// logout a user
router.post("/logout", isAuthenticated, async (req, res) => {
  try {
    res.clearCookie("authToken");


    return res.status(200).json({ message: "agent logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});


//retrieve all users (admin only)
router.get("/allusers", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const users = await findAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});


export default router;
