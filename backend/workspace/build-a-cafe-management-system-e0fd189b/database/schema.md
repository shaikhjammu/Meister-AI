# Database Schema

Provider: MongoDB (Mongoose ODM)

## Collections

### User
See `backend/src/models/User.model.js` for the generated schema.

### Record
See `backend/src/models/Record.model.js` for the generated schema.

### ActivityLog
See `backend/src/models/ActivityLog.model.js` for the generated schema.

### Report
See `backend/src/models/Report.model.js` for the generated schema.

## Notes
- All collections include `createdAt`/`updatedAt` timestamps.
- Cross-entity references use `mongoose.Schema.Types.ObjectId`.
- Indexes: unique index on `User.email`; consider adding indexes on any
  frequently-queried foreign key fields as the app scales.
