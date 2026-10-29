# Database Schema

Provider: MongoDB (Mongoose ODM)

## Collections

### Patient
See `backend/src/models/Patient.model.js` for the generated schema.

### Doctor
See `backend/src/models/Doctor.model.js` for the generated schema.

### Appointment
See `backend/src/models/Appointment.model.js` for the generated schema.

### MedicalRecord
See `backend/src/models/MedicalRecord.model.js` for the generated schema.

### Prescription
See `backend/src/models/Prescription.model.js` for the generated schema.

### Department
See `backend/src/models/Department.model.js` for the generated schema.

## Notes
- All collections include `createdAt`/`updatedAt` timestamps.
- Cross-entity references use `mongoose.Schema.Types.ObjectId`.
- Indexes: unique index on `User.email`; consider adding indexes on any
  frequently-queried foreign key fields as the app scales.
