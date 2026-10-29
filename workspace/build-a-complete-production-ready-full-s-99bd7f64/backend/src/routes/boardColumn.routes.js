import { Router } from "express";
import { BoardColumn } from "../models/BoardColumn.model.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// GET all
router.get("/", requireAuth, async (req, res) => {
  const items = await BoardColumn.find().sort({ createdAt: -1 });
  res.json(items);
});

// GET one
router.get("/:id", requireAuth, async (req, res) => {
  const item = await BoardColumn.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "BoardColumn not found" });
  res.json(item);
});

// CREATE
router.post("/", requireAuth, async (req, res) => {
  try {
    const boardColumn = await BoardColumn.create(req.body);
    res.status(201).json(boardColumn);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", requireAuth, async (req, res) => {
  const item = await BoardColumn.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: "BoardColumn not found" });
  res.json(item);
});

// DELETE
router.delete("/:id", requireAuth, async (req, res) => {
  const item = await BoardColumn.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "BoardColumn not found" });
  res.json({ success: true });
});

export default router;
