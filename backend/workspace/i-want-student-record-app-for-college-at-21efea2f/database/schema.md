# Database Schema

Provider: MongoDB (Mongoose ODM)

## Collections

### Student
See `backend/src/models/Student.model.js` for the generated schema.

### Teacher
See `backend/src/models/Teacher.model.js` for the generated schema.

### Class
See `backend/src/models/Class.model.js` for the generated schema.

### Attendance
See `backend/src/models/Attendance.model.js` for the generated schema.

### Grade
See `backend/src/models/Grade.model.js` for the generated schema.

### Timetable
See `backend/src/models/Timetable.model.js` for the generated schema.

## Notes
- All collections include `createdAt`/`updatedAt` timestamps.
- Cross-entity references use `mongoose.Schema.Types.ObjectId`.
- Indexes: unique index on `User.email`; consider adding indexes on any
  frequently-queried foreign key fields as the app scales.
