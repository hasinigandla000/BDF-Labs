
# Lab 4: Registration, Login and JWT

**Subject:** Backend Development Fundamentals

**Student Name:** Gandla Hasini

**Registration Number:** 252U1R6071

**Section:** 207 & 2B

## Objective

To implement user registration and login using password hashing and JSON Web Tokens (JWT).

## Technologies Used

- Node.js
- Express.js
- SQLite
- bcrypt
- jsonwebtoken
- Postman

## How to Run

1. Clone the repository.
2. Install dependencies:

   npm install

3. Start the server:

   node index.js

Server runs at: http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /register | Register a new user |
| POST | /login | Login and generate JWT token |

## Screenshots

### 1. Successful Registration
![Register Success](screenshots/register-success.png)

### 2. Duplicate Registration
![Register Duplicate](screenshots/register-duplicate.png)

### 3. Successful Login
![Login Success](screenshots/login-success.png)

### 4. Wrong Password
![Wrong Password](screenshots/login-wrong-password.png)

### 5. Unknown Username
![Unknown User](screenshots/login-unknown-user.png)

### 6. JWT Decoding
![JWT Decoded](screenshots/jwt-decoded.png)

## Problems Faced and Solutions

- Faced difficulties while configuring Postman requests.
- Resolved the issue by setting the correct HTTP method and JSON request body.
- Verified JWT token generation and decoding using jwt.io.

