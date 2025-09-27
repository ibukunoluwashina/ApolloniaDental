# Apollonia Dental API Documentation

## Overview

This is a RESTful API for managing departments, employees, and users in a dental practice management system.

## Base URL

```
http://localhost:5000
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## API Endpoints

### User Management

#### Register a new user

```
POST /users/register
```

**Body:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "admin" // optional: "admin", "employee", "user" (default: "user")
}
```

#### Login

```
POST /users/login
```

**Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "user": { ... },
  "token": "jwt_token_here",
  "message": "Login successful"
}
```

#### Get user by ID (Admin only)

```
GET /users/admin/:id
```

**Headers:** `Authorization: Bearer <token>`

#### Logout

```
POST /users/logout
```

**Headers:** `Authorization: Bearer <token>`

### Department Management

#### Get all departments

```
GET /departments
```

#### Get department by ID

```
GET /departments/:id
```

#### Create new department

```
POST /departments
```

**Body:**

```json
{
  "name": "Orthodontics"
}
```

#### Get employees in a department

```
GET /departments/:id/employees
```

### Employee Management

#### Get all employees

```
GET /employees
```

#### Get employee by ID

```
GET /employees/:id
```

#### Create new employee

```
POST /employees
```

**Body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "department": "department_id_here"
}
```

#### Update employee

```
PUT /employees/:id
```

**Body:**

```json
{
  "firstName": "Jane",
  "lastName": "Smith"
}
```

#### Set employee department

```
POST /employees/set-department
```

**Body:**

```json
{
  "employee_id": "employee_id_here",
  "department_id": "department_id_here"
}
```

#### Delete employee

```
DELETE /employees/:id
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DB_URI=mongodb://localhost:27017/apolloniadental
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
JWT_EXPIRATION=7d
NODE_ENV=development
```

## Installation and Setup

1. Install dependencies:

```bash
npm install
```

2. Make sure MongoDB is running on your system

3. Start the server:

```bash
npm start
```

## Database Schema

### User Schema

- `username`: String (required, unique)
- `email`: String (required, unique)
- `password`: String (required, hashed)
- `role`: String (enum: "admin", "employee", "user", default: "user")
- `tokens`: Array of JWT tokens

### Department Schema

- `name`: String (required, unique)

### Employee Schema

- `firstName`: String (required)
- `lastName`: String (required)
- `department`: ObjectId (reference to Department, required)

## Error Handling

The API returns appropriate HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

Error responses include a message and optional error details:

```json
{
  "error": "Error message",
  "message": "User-friendly message"
}
```
