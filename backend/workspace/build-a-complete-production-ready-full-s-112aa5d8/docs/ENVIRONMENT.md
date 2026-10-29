# Environment Variables

## Backend (`backend/.env`)
| Variable | Description |
|---|---|
| PORT | Port the API listens on |
| MONGODB_URI | MongoDB connection string |
| JWT_SECRET | Secret used to sign auth tokens |
| CORS_ORIGIN | Allowed frontend origin |

## Frontend (`frontend/.env`)
| Variable | Description |
|---|---|
| VITE_API_URL | URL of the backend API |

Never commit `.env` files — only `.env.example` is tracked in git.
