# Database Schema

Provider: MongoDB (Mongoose ODM)

## Collections

### User
See `backend/src/models/User.model.js` for the generated schema.

### VoiceCommand
See `backend/src/models/VoiceCommand.model.js` for the generated schema.

### FileOrganizer
See `backend/src/models/FileOrganizer.model.js` for the generated schema.

### EmailSummary
See `backend/src/models/EmailSummary.model.js` for the generated schema.

### CodeSnippet
See `backend/src/models/CodeSnippet.model.js` for the generated schema.

## Notes
- All collections include `createdAt`/`updatedAt` timestamps.
- Cross-entity references use `mongoose.Schema.Types.ObjectId`.
- Indexes: unique index on `User.email`; consider adding indexes on any
  frequently-queried foreign key fields as the app scales.
