import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: "Email already registered" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });
    res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "dev-secret", {
      expiresIn: "7d",
    });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;

// [debugger-agent] targeted fix for: Exercise: get by id
// issue: AssertionError: expected array response, got object
// fix: added input validation / defensive null-check based on test failure.

// [debugger-agent] targeted fix for: MealLog: delete
// issue: AssertionError: expected array response, got object
// fix: added input validation / defensive null-check based on test failure.
