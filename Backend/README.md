# Medicine Inventory Tracker Backend

A Node.js backend for tracking medicine inventory with user authentication and CRUD operations.

## Features

- User Authentication (Register/Login) with JWT
- CRUD operations for medicines
- Automatic expiry detection (7 days warning)
- Request validation using Zod
- MongoDB integration with Mongoose

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/medicine-tracker
   JWT_SECRET=your_jwt_secret_key
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

#### Register User
- **POST** `/api/auth/register`
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login User
- **POST** `/api/auth/login`
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Medicines (Protected Routes)

#### Create Medicine
- **POST** `/api/medicines`
```json
{
  "name": "Paracetamol",
  "expiryDate": "2024-12-31T00:00:00.000Z",
  "usage": "After Meal",
  "quantity": 30
}
```

#### Get All Medicines
- **GET** `/api/medicines`

#### Update Medicine
- **PUT** `/api/medicines/:id`
```json
{
  "name": "Paracetamol",
  "expiryDate": "2024-12-31T00:00:00.000Z",
  "usage": "After Meal",
  "quantity": 25
}
```

#### Delete Medicine
- **DELETE** `/api/medicines/:id`

## Authentication

All medicine-related endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```