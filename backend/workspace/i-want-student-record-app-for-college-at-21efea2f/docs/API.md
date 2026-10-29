# API Documentation

Base URL: `/api`

## Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Log in, returns JWT |

All resource endpoints below require `Authorization: Bearer <token>`.

### Student
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/students | Yes | List all students |
| GET | /api/students/:id | Yes | Get one student |
| POST | /api/students | Yes | Create a student |
| PUT | /api/students/:id | Yes | Update a student |
| DELETE | /api/students/:id | Yes | Delete a student |

### Teacher
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/teachers | Yes | List all teachers |
| GET | /api/teachers/:id | Yes | Get one teacher |
| POST | /api/teachers | Yes | Create a teacher |
| PUT | /api/teachers/:id | Yes | Update a teacher |
| DELETE | /api/teachers/:id | Yes | Delete a teacher |

### Class
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/classs | Yes | List all classs |
| GET | /api/classs/:id | Yes | Get one class |
| POST | /api/classs | Yes | Create a class |
| PUT | /api/classs/:id | Yes | Update a class |
| DELETE | /api/classs/:id | Yes | Delete a class |

### Attendance
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/attendances | Yes | List all attendances |
| GET | /api/attendances/:id | Yes | Get one attendance |
| POST | /api/attendances | Yes | Create a attendance |
| PUT | /api/attendances/:id | Yes | Update a attendance |
| DELETE | /api/attendances/:id | Yes | Delete a attendance |

### Grade
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/grades | Yes | List all grades |
| GET | /api/grades/:id | Yes | Get one grade |
| POST | /api/grades | Yes | Create a grade |
| PUT | /api/grades/:id | Yes | Update a grade |
| DELETE | /api/grades/:id | Yes | Delete a grade |

### Timetable
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/timetables | Yes | List all timetables |
| GET | /api/timetables/:id | Yes | Get one timetable |
| POST | /api/timetables | Yes | Create a timetable |
| PUT | /api/timetables/:id | Yes | Update a timetable |
| DELETE | /api/timetables/:id | Yes | Delete a timetable |

