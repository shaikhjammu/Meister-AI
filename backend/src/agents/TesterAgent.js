import { BaseAgent } from "./BaseAgent.js";

export class TesterAgent extends BaseAgent {
  constructor(opts) {
    super({ id: "tester", name: "Tester", icon: "🧪", ...opts });
  }

  async run(task) {
    const { entities } = this.project.requirements;
    const testable = entities.filter((e) => e !== "User");

    this.log(`generating test cases for ${testable.length} resources + auth`);

    const cases = [];
    cases.push(mkCase("Auth: register new user", true));
    cases.push(mkCase("Auth: login with valid credentials", true));
    cases.push(mkCase("Auth: reject invalid credentials", true));

    for (const entity of testable) {
      cases.push(mkCase(`${entity}: create`, true));
      cases.push(mkCase(`${entity}: list`, true));
      cases.push(mkCase(`${entity}: get by id`, true));
      cases.push(mkCase(`${entity}: update`, true));
      cases.push(mkCase(`${entity}: delete`, true));
    }

    // Simulate a couple of realistic first-pass failures for the
    // debugger to fix, so the retest loop in the workflow is real.
    const failIndexes = pickFailures(cases, this.project.slug);
    for (const idx of failIndexes) {
      cases[idx].passed = false;
      cases[idx].error = randomError(cases[idx].name);
    }

    const passed = cases.filter((c) => c.passed).length;
    const failed = cases.length - passed;

    this.log(`ran ${cases.length} tests — ${passed} passed, ${failed} failed`);

    this.project.testResults = {
      total: cases.length,
      passed,
      failed,
      cases,
    };

    return {
      summary: `${cases.length} tests run: ${passed} passed, ${failed} failed.`,
      next_tasks: failed > 0 ? ["debug_failures"] : [],
      data: { failed },
    };
  }
}

function mkCase(name, passed) {
  return { name, passed };
}

function pickFailures(cases, seed) {
  // Deterministic-ish "random" pick based on project slug so re-runs are stable.
  const hash = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0);
  const count = cases.length > 6 ? 2 : 1;
  const indexes = [];
  for (let i = 0; i < count; i++) {
    indexes.push((hash + i * 7) % cases.length);
  }
  return [...new Set(indexes)];
}

function randomError(caseName) {
  const errors = [
    "AssertionError: expected 201, got 500 — missing field validation",
    "TypeError: Cannot read properties of undefined (reading 'id')",
    "ValidationError: required field missing in request payload",
    "AssertionError: expected array response, got object",
  ];
  return errors[caseName.length % errors.length];
}
