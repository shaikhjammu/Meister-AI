# API Documentation

Base URL: `/api`

## Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Log in, returns JWT |

All resource endpoints below require `Authorization: Bearer <token>`.

### VoiceCommand
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/voiceCommands | Yes | List all voiceCommands |
| GET | /api/voiceCommands/:id | Yes | Get one voiceCommand |
| POST | /api/voiceCommands | Yes | Create a voiceCommand |
| PUT | /api/voiceCommands/:id | Yes | Update a voiceCommand |
| DELETE | /api/voiceCommands/:id | Yes | Delete a voiceCommand |

### FileOrganizer
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/fileOrganizers | Yes | List all fileOrganizers |
| GET | /api/fileOrganizers/:id | Yes | Get one fileOrganizer |
| POST | /api/fileOrganizers | Yes | Create a fileOrganizer |
| PUT | /api/fileOrganizers/:id | Yes | Update a fileOrganizer |
| DELETE | /api/fileOrganizers/:id | Yes | Delete a fileOrganizer |

### EmailSummary
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/emailSummarys | Yes | List all emailSummarys |
| GET | /api/emailSummarys/:id | Yes | Get one emailSummary |
| POST | /api/emailSummarys | Yes | Create a emailSummary |
| PUT | /api/emailSummarys/:id | Yes | Update a emailSummary |
| DELETE | /api/emailSummarys/:id | Yes | Delete a emailSummary |

### CodeSnippet
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/codeSnippets | Yes | List all codeSnippets |
| GET | /api/codeSnippets/:id | Yes | Get one codeSnippet |
| POST | /api/codeSnippets | Yes | Create a codeSnippet |
| PUT | /api/codeSnippets/:id | Yes | Update a codeSnippet |
| DELETE | /api/codeSnippets/:id | Yes | Delete a codeSnippet |

