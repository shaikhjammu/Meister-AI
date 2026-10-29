# API Documentation

Base URL: `/api`

## Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Log in, returns JWT |

All resource endpoints below require `Authorization: Bearer <token>`.

### Record
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/records | Yes | List all records |
| GET | /api/records/:id | Yes | Get one record |
| POST | /api/records | Yes | Create a record |
| PUT | /api/records/:id | Yes | Update a record |
| DELETE | /api/records/:id | Yes | Delete a record |

### ActivityLog
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/activityLogs | Yes | List all activityLogs |
| GET | /api/activityLogs/:id | Yes | Get one activityLog |
| POST | /api/activityLogs | Yes | Create a activityLog |
| PUT | /api/activityLogs/:id | Yes | Update a activityLog |
| DELETE | /api/activityLogs/:id | Yes | Delete a activityLog |

### Report
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/reports | Yes | List all reports |
| GET | /api/reports/:id | Yes | Get one report |
| POST | /api/reports | Yes | Create a report |
| PUT | /api/reports/:id | Yes | Update a report |
| DELETE | /api/reports/:id | Yes | Delete a report |

