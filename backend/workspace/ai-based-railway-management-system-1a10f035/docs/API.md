# API Documentation

Base URL: `/api`

## Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Log in, returns JWT |

All resource endpoints below require `Authorization: Bearer <token>`.

### Item
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/items | Yes | List all items |
| GET | /api/items/:id | Yes | Get one item |
| POST | /api/items | Yes | Create a item |
| PUT | /api/items/:id | Yes | Update a item |
| DELETE | /api/items/:id | Yes | Delete a item |

### Record
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/records | Yes | List all records |
| GET | /api/records/:id | Yes | Get one record |
| POST | /api/records | Yes | Create a record |
| PUT | /api/records/:id | Yes | Update a record |
| DELETE | /api/records/:id | Yes | Delete a record |

