# Database Schema

Provider: MongoDB (Mongoose ODM)

## Collections

### User
See `backend/src/models/User.model.js` for the generated schema.

### Item
See `backend/src/models/Item.model.js` for the generated schema.

### Record
See `backend/src/models/Record.model.js` for the generated schema.

### Activity
See `backend/src/models/Activity.model.js` for the generated schema.

## Notes
- All collections include `createdAt`/`updatedAt` timestamps.
- Cross-entity references use `mongoose.Schema.Types.ObjectId`.
- Indexes: unique index on `User.email`; consider adding indexes on any
  frequently-queried foreign key fields as the app scales.
