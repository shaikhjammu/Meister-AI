# Database Schema

Provider: MongoDB (Mongoose ODM)

## Collections

### Project
See `backend/src/models/Project.model.js` for the generated schema.

### Task
See `backend/src/models/Task.model.js` for the generated schema.

### BoardColumn
See `backend/src/models/BoardColumn.model.js` for the generated schema.

### Comment
See `backend/src/models/Comment.model.js` for the generated schema.

### Tag
See `backend/src/models/Tag.model.js` for the generated schema.

## Notes
- All collections include `createdAt`/`updatedAt` timestamps.
- Cross-entity references use `mongoose.Schema.Types.ObjectId`.
- Indexes: unique index on `User.email`; consider adding indexes on any
  frequently-queried foreign key fields as the app scales.
