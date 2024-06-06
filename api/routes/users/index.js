import express from "express";
import { addUser, findUserByEmail } from "../../services/users/index.js";
import { hashPassword, generateJwt, comparePassword } from "../../services/tools/index.js";
import isAuthenticated from "../../../middlewares/isAuth/index.js";
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

  const { email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = await addUser(email, hashedPassword);

    const payload = {
      _id: user._id,
      email: user.email,
    };

    const token = await generateJwt(payload);

    res.cookie("authToken", token, { httpOnly: true });

    return res.status(201).json({
      message: "User created",
      user: { email: user.email, _id: user._id },
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

    res.cookie("authToken", token, { httpOnly: true });

    return res.status(200).json({ message: "User logged in" });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

// logout a user
router.post("/logout", isAuthenticated, async (req, res) => {
  try {
    res.clearCookie("authToken");


    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});


export default router;
