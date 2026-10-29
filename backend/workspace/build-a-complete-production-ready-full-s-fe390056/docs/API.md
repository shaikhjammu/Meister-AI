# API Documentation

Base URL: `/api`

## Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Log in, returns JWT |

All resource endpoints below require `Authorization: Bearer <token>`.

### Product
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/products | Yes | List all products |
| GET | /api/products/:id | Yes | Get one product |
| POST | /api/products | Yes | Create a product |
| PUT | /api/products/:id | Yes | Update a product |
| DELETE | /api/products/:id | Yes | Delete a product |

### Category
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/categorys | Yes | List all categorys |
| GET | /api/categorys/:id | Yes | Get one category |
| POST | /api/categorys | Yes | Create a category |
| PUT | /api/categorys/:id | Yes | Update a category |
| DELETE | /api/categorys/:id | Yes | Delete a category |

### CartItem
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/cartItems | Yes | List all cartItems |
| GET | /api/cartItems/:id | Yes | Get one cartItem |
| POST | /api/cartItems | Yes | Create a cartItem |
| PUT | /api/cartItems/:id | Yes | Update a cartItem |
| DELETE | /api/cartItems/:id | Yes | Delete a cartItem |

### Order
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/orders | Yes | List all orders |
| GET | /api/orders/:id | Yes | Get one order |
| POST | /api/orders | Yes | Create a order |
| PUT | /api/orders/:id | Yes | Update a order |
| DELETE | /api/orders/:id | Yes | Delete a order |

### Review
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/reviews | Yes | List all reviews |
| GET | /api/reviews/:id | Yes | Get one review |
| POST | /api/reviews | Yes | Create a review |
| PUT | /api/reviews/:id | Yes | Update a review |
| DELETE | /api/reviews/:id | Yes | Delete a review |

### Payment
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/payments | Yes | List all payments |
| GET | /api/payments/:id | Yes | Get one payment |
| POST | /api/payments | Yes | Create a payment |
| PUT | /api/payments/:id | Yes | Update a payment |
| DELETE | /api/payments/:id | Yes | Delete a payment |

