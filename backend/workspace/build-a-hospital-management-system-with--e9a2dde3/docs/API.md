# API Documentation

Base URL: `/api`

## Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Log in, returns JWT |

All resource endpoints below require `Authorization: Bearer <token>`.

### Patient
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/patients | Yes | List all patients |
| GET | /api/patients/:id | Yes | Get one patient |
| POST | /api/patients | Yes | Create a patient |
| PUT | /api/patients/:id | Yes | Update a patient |
| DELETE | /api/patients/:id | Yes | Delete a patient |

### Doctor
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/doctors | Yes | List all doctors |
| GET | /api/doctors/:id | Yes | Get one doctor |
| POST | /api/doctors | Yes | Create a doctor |
| PUT | /api/doctors/:id | Yes | Update a doctor |
| DELETE | /api/doctors/:id | Yes | Delete a doctor |

### Appointment
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/appointments | Yes | List all appointments |
| GET | /api/appointments/:id | Yes | Get one appointment |
| POST | /api/appointments | Yes | Create a appointment |
| PUT | /api/appointments/:id | Yes | Update a appointment |
| DELETE | /api/appointments/:id | Yes | Delete a appointment |

### MedicalRecord
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/medicalRecords | Yes | List all medicalRecords |
| GET | /api/medicalRecords/:id | Yes | Get one medicalRecord |
| POST | /api/medicalRecords | Yes | Create a medicalRecord |
| PUT | /api/medicalRecords/:id | Yes | Update a medicalRecord |
| DELETE | /api/medicalRecords/:id | Yes | Delete a medicalRecord |

### Prescription
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/prescriptions | Yes | List all prescriptions |
| GET | /api/prescriptions/:id | Yes | Get one prescription |
| POST | /api/prescriptions | Yes | Create a prescription |
| PUT | /api/prescriptions/:id | Yes | Update a prescription |
| DELETE | /api/prescriptions/:id | Yes | Delete a prescription |

### Department
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/departments | Yes | List all departments |
| GET | /api/departments/:id | Yes | Get one department |
| POST | /api/departments | Yes | Create a department |
| PUT | /api/departments/:id | Yes | Update a department |
| DELETE | /api/departments/:id | Yes | Delete a department |

