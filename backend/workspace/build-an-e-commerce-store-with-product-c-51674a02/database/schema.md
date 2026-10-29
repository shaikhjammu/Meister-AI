# Database Schema

Provider: MongoDB (Mongoose ODM)

## Collections

### Product
See `backend/src/models/Product.model.js` for the generated schema.

### Category
See `backend/src/models/Category.model.js` for the generated schema.

### CartItem
See `backend/src/models/CartItem.model.js` for the generated schema.

### Order
See `backend/src/models/Order.model.js` for the generated schema.

### Review
See `backend/src/models/Review.model.js` for the generated schema.

### Payment
See `backend/src/models/Payment.model.js` for the generated schema.

## Notes
- All collections include `createdAt`/`updatedAt` timestamps.
- Cross-entity references use `mongoose.Schema.Types.ObjectId`.
- Indexes: unique index on `User.email`; consider adding indexes on any
  frequently-queried foreign key fields as the app scales.
