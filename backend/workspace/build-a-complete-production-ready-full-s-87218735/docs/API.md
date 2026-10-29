# API Documentation

Base URL: `/api`

## Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Log in, returns JWT |

All resource endpoints below require `Authorization: Bearer <token>`.

### Project
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/projects | Yes | List all projects |
| GET | /api/projects/:id | Yes | Get one project |
| POST | /api/projects | Yes | Create a project |
| PUT | /api/projects/:id | Yes | Update a project |
| DELETE | /api/projects/:id | Yes | Delete a project |

### Task
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/tasks | Yes | List all tasks |
| GET | /api/tasks/:id | Yes | Get one task |
| POST | /api/tasks | Yes | Create a task |
| PUT | /api/tasks/:id | Yes | Update a task |
| DELETE | /api/tasks/:id | Yes | Delete a task |

### BoardColumn
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/boardColumns | Yes | List all boardColumns |
| GET | /api/boardColumns/:id | Yes | Get one boardColumn |
| POST | /api/boardColumns | Yes | Create a boardColumn |
| PUT | /api/boardColumns/:id | Yes | Update a boardColumn |
| DELETE | /api/boardColumns/:id | Yes | Delete a boardColumn |

### Comment
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/comments | Yes | List all comments |
| GET | /api/comments/:id | Yes | Get one comment |
| POST | /api/comments | Yes | Create a comment |
| PUT | /api/comments/:id | Yes | Update a comment |
| DELETE | /api/comments/:id | Yes | Delete a comment |

### Tag
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/tags | Yes | List all tags |
| GET | /api/tags/:id | Yes | Get one tag |
| POST | /api/tags | Yes | Create a tag |
| PUT | /api/tags/:id | Yes | Update a tag |
| DELETE | /api/tags/:id | Yes | Delete a tag |

