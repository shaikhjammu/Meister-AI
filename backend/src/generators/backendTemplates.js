export function packageJson(appSlug) {
  return JSON.stringify(
    {
      name: `${appSlug}-backend`,
      version: "1.0.0",
      type: "module",
      scripts: {
        dev: "node src/index.js",
        start: "node src/index.js",
        test: "node --test src/**/*.test.js",
      },
      dependencies: {
        express: "^4.19.2",
        mongoose: "^8.4.0",
        cors: "^2.8.5",
        dotenv: "^16.4.5",
        jsonwebtoken: "^9.0.2",
        bcryptjs: "^2.4.3",
        zod: "^3.23.8",
      },
    },
    null,
    2
  );
}

export function envExample(entities) {
  return [
    "PORT=5000",
    "MONGODB_URI=mongodb://localhost:27017/app",
    "JWT_SECRET=replace-with-a-strong-secret",
    "CORS_ORIGIN=http://localhost:5173",
  ].join("\n");
}

export function serverIndex(appType, entities) {
  const imports = entities
    .map((e) => `import ${lower(e)}Routes from "./routes/${lower(e)}.routes.js";`)
    .join("\n");
  const uses = entities
    .map((e) => `app.use("/api/${lower(e)}s", ${lower(e)}Routes);`)
    .join("\n");

  return `import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
${imports}

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => res.json({ status: "ok", app: "${appType}" }));

app.use("/api/auth", authRoutes);
${uses}

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to MongoDB");
    } else {
      console.warn("MONGODB_URI not set — running without a database connection");
    }
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
  app.listen(PORT, () => console.log(\`${appType} API listening on port \${PORT}\`));
}

start();

export default app;
`;
}

export function authRoutes() {
  return `import { Router } from "express";
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
`;
}

export function authMiddleware() {
  return `import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing auth token" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}
`;
}

export function userModel(roles) {
  return `import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ${JSON.stringify(roles)}, default: "${roles[roles.length - 1] || "User"}" },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
`;
}

export function entityModel(entity, fields) {
  const schemaFields = fields
    .map((f) => `    ${f.name}: { type: ${f.type}, required: ${f.required} }`)
    .join(",\n");
  return `import mongoose from "mongoose";

const ${lower(entity)}Schema = new mongoose.Schema(
  {
${schemaFields}
  },
  { timestamps: true }
);

export const ${entity} = mongoose.model("${entity}", ${lower(entity)}Schema);
`;
}

export function entityRoutes(entity) {
  const varName = lower(entity);
  return `import { Router } from "express";
import { ${entity} } from "../models/${entity}.model.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// GET all
router.get("/", requireAuth, async (req, res) => {
  const items = await ${entity}.find().sort({ createdAt: -1 });
  res.json(items);
});

// GET one
router.get("/:id", requireAuth, async (req, res) => {
  const item = await ${entity}.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "${entity} not found" });
  res.json(item);
});

// CREATE
router.post("/", requireAuth, async (req, res) => {
  try {
    const ${varName} = await ${entity}.create(req.body);
    res.status(201).json(${varName});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", requireAuth, async (req, res) => {
  const item = await ${entity}.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ error: "${entity} not found" });
  res.json(item);
});

// DELETE
router.delete("/:id", requireAuth, async (req, res) => {
  const item = await ${entity}.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "${entity} not found" });
  res.json({ success: true });
});

export default router;
`;
}

export function entityTest(entity) {
  return `import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the ${entity} API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("${entity} model file exists and exports a model", async () => {
  const mod = await import("../models/${entity}.model.js");
  assert.ok(mod.${entity}, "${entity} model should be exported");
});

test("${entity} routes module exports an Express router", async () => {
  const mod = await import("../routes/${lower(entity)}.routes.js");
  assert.ok(mod.default, "${entity} router should be the default export");
});
`;
}

function lower(s) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}
