# Database Schema

Provider: MongoDB (Mongoose ODM)

## Collections

### WorkoutPlan
See `backend/src/models/WorkoutPlan.model.js` for the generated schema.

### Exercise
See `backend/src/models/Exercise.model.js` for the generated schema.

### MealLog
See `backend/src/models/MealLog.model.js` for the generated schema.

### MacroNutrient
See `backend/src/models/MacroNutrient.model.js` for the generated schema.

### ProgressRecord
See `backend/src/models/ProgressRecord.model.js` for the generated schema.

## Notes
- All collections include `createdAt`/`updatedAt` timestamps.
- Cross-entity references use `mongoose.Schema.Types.ObjectId`.
- Indexes: unique index on `User.email`; consider adding indexes on any
  frequently-queried foreign key fields as the app scales.
