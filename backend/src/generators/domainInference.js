/**
 * Dynamic domain inference engine.
 * Parses user prompts to dynamically infer Application Title, Entities,
 * Roles, and Features for ANY prompt entered (E-commerce, Healthcare, School,
 * Finance, Fitness, Task Management, AI Tools, Custom Apps, etc.).
 */

const KNOWN_DOMAINS = [
  {
    match: /amazon|e-?commerce|e\s*commerce|shop|store|marketplace|product|cart|checkout|billing|buy|seller/i,
    appType: "E-Commerce Store & Marketplace",
    roles: ["Admin", "Seller", "Customer"],
    entities: ["Product", "Category", "CartItem", "Order", "Review", "Payment"],
    features: [
      "Customer & Seller Authentication",
      "Interactive Product Catalog & Category Filters",
      "Dynamic Shopping Cart & Price Calculator",
      "Instant Order Checkout & Status Tracking",
      "Customer Product Reviews & Star Ratings",
      "Admin Sales & Inventory Analytics",
    ],
  },
  {
    match: /hospital|clinic|patient|doctor|medical|prescription|appointment|health record/i,
    appType: "Hospital Management System",
    roles: ["Admin", "Doctor", "Receptionist", "Patient"],
    entities: ["Patient", "Doctor", "Appointment", "MedicalRecord", "Prescription", "Department"],
    features: [
      "Admin, Doctor & Patient Login Portal",
      "Interactive Doctor Appointment Scheduling",
      "Patient Medical Records & Clinical History",
      "Digital Prescription & Diagnosis Generator",
      "Department & Room Inventory Tracking",
      "Billing & Invoice Status Overview",
    ],
  },
  {
    match: /school|student|teacher|classroom|attendance|grade|exam|timetable/i,
    appType: "School & Student Portal System",
    roles: ["Admin", "Teacher", "Student", "Parent"],
    entities: ["Student", "Teacher", "Class", "Attendance", "Grade", "Timetable"],
    features: [
      "Student, Teacher, and Parent Portals",
      "Daily Student Attendance & Leave Tracker",
      "Exam Results & GPA Report Card Generator",
      "Interactive Class Timetable & Schedule",
      "Fee Payment & Outstanding Dues Overview",
      "School Announcement & Notice Board",
    ],
  },
  {
    match: /inventory|warehouse|stock|supplier|warehouse management/i,
    appType: "Inventory & Warehouse Tracking System",
    roles: ["Admin", "Manager", "Warehouse Staff"],
    entities: ["Product", "Category", "Supplier", "StockMovement", "WarehouseOrder"],
    features: [
      "Real-Time Stock Level Tracking",
      "Low-Stock Automatic Alert System",
      "Supplier & Vendor Directory Management",
      "Purchase & Sales Order Workflow",
      "Warehouse Location & Bin Tracking",
      "Inventory Valuation & Analytics",
    ],
  },
  {
    match: /task|todo|project management|kanban|board|sprint|jira|trello/i,
    appType: "Kanban Task & Project Management System",
    roles: ["Admin", "Project Manager", "Team Member"],
    entities: ["Project", "Task", "BoardColumn", "Comment", "Tag"],
    features: [
      "Interactive Kanban Drag & Status Boards",
      "Project Workspaces & Sprint Milestones",
      "Task Assignee & Priority Controls",
      "Comment Threads & File Attachments",
      "Real-Time Team Activity Logs",
      "Project Completion Metrics Dashboard",
    ],
  },
  {
    match: /chat|messaging|social|network|feed|community|discussion/i,
    appType: "Real-Time Social & Chat Messaging Platform",
    roles: ["Admin", "User", "Moderator"],
    entities: ["Channel", "Message", "User", "Post", "Comment", "Notification"],
    features: [
      "Real-Time Channel & Direct Messaging",
      "Interactive Community Feed & Posts",
      "User Profile Customization & Badges",
      "Media & Image Sharing Sandbox",
      "Direct Notifications Console",
      "Community Moderation Tools",
    ],
  },
  {
    match: /fitness|gym|workout|health|diet|nutrition|calorie/i,
    appType: "Fitness & Nutrition Tracker App",
    roles: ["Admin", "Trainer", "Member"],
    entities: ["WorkoutPlan", "Exercise", "MealLog", "MacroNutrient", "ProgressRecord"],
    features: [
      "Interactive Workout Routine Logger",
      "Exercise Video & Instructions Library",
      "Daily Calorie & Macro Tracker",
      "Body Progress & Weight Analytics",
      "Trainer Client Coaching Console",
      "Fitness Goal Milestone Badges",
    ],
  },
  {
    match: /finance|expense|budget|wallet|banking|transaction|crypto|money/i,
    appType: "Financial Budget & Expense Tracker",
    roles: ["Admin", "Accountant", "User"],
    entities: ["Account", "Transaction", "BudgetCategory", "RecurringBill", "Goal"],
    features: [
      "Income & Expense Transaction Logging",
      "Category Spending Breakdown Charts",
      "Monthly Budget Limit & Goal Tracker",
      "Recurring Subscription & Bill Alerts",
      "Account Balance & Cash Flow Summary",
      "Financial Export & PDF Reports",
    ],
  },
  {
    match: /ai|operating system|assistant|voice|command|samjhe|desktop assistant/i,
    appType: "AI Operating System & Voice Assistant",
    roles: ["Admin", "User", "AI Agent"],
    entities: ["VoiceCommand", "FileRecord", "EmailSummary", "CodeSnippet"],
    features: [
      "Voice Command Speech Processor (Samjhe)",
      "Automated Desktop & System File Organizer",
      "Email AI Key Takeaway Summarizer",
      "AI Code Generation Sandbox",
      "Smart Automated Workflows Console",
      "Live System Health Metrics Dashboard",
    ],
  },
];

export function inferDomain(prompt) {
  const text = (prompt || "").trim();

  // Strip boilerplate headers if prompt was generated by MVP enhancer
  const cleanPrompt = text
    .replace(/Build a complete, production-ready full-stack application for/i, "")
    .replace(/Architecture:[\s\S]*?Key MVP Features Required:/i, "")
    .trim();

  // Find explicit domain match
  const found = KNOWN_DOMAINS.find((d) => d.match.test(cleanPrompt)) || KNOWN_DOMAINS.find((d) => d.match.test(text));

  // Determine App Title dynamically
  let appType = "";
  if (found) {
    appType = found.appType;
  } else {
    const firstLine = cleanPrompt.split("\n")[0] || text.split("\n")[0] || "";
    appType = cleanTitle(firstLine);
  }

  // Extract features
  const features = found
    ? found.features
    : [
        "User Authentication & Access Control",
        "Interactive Real-Time Dashboard",
        "Dynamic Entity Data Management (CRUD)",
        "Search & Category Filtering System",
        "Automated Data Analytics & Metrics",
        "Export & Report Generator",
      ];

  const entities = found
    ? found.entities
    : inferEntitiesFromText(cleanPrompt);

  const roles = found ? found.roles : ["Admin", "Manager", "User"];

  return {
    appType,
    roles,
    entities,
    features,
  };
}

function cleanTitle(str) {
  const s = str
    .replace(/^["']|["']$/g, "")
    .replace(/^(build|create|make|a|an|the|system|app|for)\s+/i, "")
    .replace(/with.*$/i, "")
    .trim();
  return capitalizeSentence(s) || "Custom Enterprise Application";
}

function capitalizeSentence(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function inferEntitiesFromText(text) {
  const entities = ["User"];
  const lower = text.toLowerCase();
  
  if (lower.includes("product") || lower.includes("item") || lower.includes("shop")) entities.push("Product", "Category", "Order");
  if (lower.includes("patient") || lower.includes("doctor")) entities.push("Patient", "Doctor", "Appointment");
  if (lower.includes("student") || lower.includes("teacher")) entities.push("Student", "Teacher", "Grade");
  if (lower.includes("task") || lower.includes("project")) entities.push("Project", "Task", "Comment");
  if (lower.includes("expense") || lower.includes("account")) entities.push("Transaction", "Budget", "Category");

  if (entities.length === 1) {
    entities.push("Record", "ActivityLog", "Report");
  }
  return entities;
}
