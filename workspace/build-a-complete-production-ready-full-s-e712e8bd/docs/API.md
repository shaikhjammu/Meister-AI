# API Documentation

Base URL: `/api`

## Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Log in, returns JWT |

All resource endpoints below require `Authorization: Bearer <token>`.

### WorkoutPlan
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/workoutPlans | Yes | List all workoutPlans |
| GET | /api/workoutPlans/:id | Yes | Get one workoutPlan |
| POST | /api/workoutPlans | Yes | Create a workoutPlan |
| PUT | /api/workoutPlans/:id | Yes | Update a workoutPlan |
| DELETE | /api/workoutPlans/:id | Yes | Delete a workoutPlan |

### Exercise
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/exercises | Yes | List all exercises |
| GET | /api/exercises/:id | Yes | Get one exercise |
| POST | /api/exercises | Yes | Create a exercise |
| PUT | /api/exercises/:id | Yes | Update a exercise |
| DELETE | /api/exercises/:id | Yes | Delete a exercise |

### MealLog
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/mealLogs | Yes | List all mealLogs |
| GET | /api/mealLogs/:id | Yes | Get one mealLog |
| POST | /api/mealLogs | Yes | Create a mealLog |
| PUT | /api/mealLogs/:id | Yes | Update a mealLog |
| DELETE | /api/mealLogs/:id | Yes | Delete a mealLog |

### MacroNutrient
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/macroNutrients | Yes | List all macroNutrients |
| GET | /api/macroNutrients/:id | Yes | Get one macroNutrient |
| POST | /api/macroNutrients | Yes | Create a macroNutrient |
| PUT | /api/macroNutrients/:id | Yes | Update a macroNutrient |
| DELETE | /api/macroNutrients/:id | Yes | Delete a macroNutrient |

### ProgressRecord
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/progressRecords | Yes | List all progressRecords |
| GET | /api/progressRecords/:id | Yes | Get one progressRecord |
| POST | /api/progressRecords | Yes | Create a progressRecord |
| PUT | /api/progressRecords/:id | Yes | Update a progressRecord |
| DELETE | /api/progressRecords/:id | Yes | Delete a progressRecord |

