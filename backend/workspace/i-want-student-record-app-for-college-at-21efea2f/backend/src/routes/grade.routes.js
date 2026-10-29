import { Router } from "express";
import { Grade } from "../models/Grade.model.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// GET all
router.get("/", requireAuth, async (req, res) => {
  const items = await Grade.find().sort({ createdAt: -1 });
  res.json(items);
});

// GET one
router.get("/:id", requireAuth, async (req, res) => {
  const item = await Grade.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Grade not found" });
  res.json(item);
});

// CREATE
router.post("/", requireAuth, async (req, res) => {
  try {
    const grade = await Grade.create(req.body);
    res.status(201).json(grade);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", requireAuth, async (req, res) => {
  const item = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: "Grade not found" });
  res.json(item);
});

// DELETE
router.delete("/:id", requireAuth, async (req, res) => {
  const item = await Grade.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Grade not found" });
  res.json({ success: true });
});

export default router;
