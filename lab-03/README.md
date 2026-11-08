# Lab 3: REST API, Query Parameters, Validation and Debugging

## Student Details
- **Name:** Hasini Gandla
- **Registration Number:** 252U1R6071
- **Section:** 207,2B
- **Lab:** 03
- **Module:** REST API Development and Validation

## 1. Objective
To develop a REST API for Book Management using Node.js and Express.js with search, sorting, filtering, pagination, input validation, proper HTTP status codes and error handling.

## 2. Technologies Used
- Node.js
- Express.js
- Postman
- JavaScript

## 3. Installation and Execution

1. Install Node.js.
2. Open the project folder in the terminal.
3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
node server.js
```

5. Base URL:

`http://localhost:3000`

## 4. API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /books | Retrieve all books |
| GET | /books?search=Python | Search books |
| GET | /books?sort_by=price&order_by=ASC | Sort books |
| GET | /books?min_price=300&max_price=500 | Filter by price |
| GET | /books?limit=5&offset=0 | Pagination |
| POST | /books | Add a new book |
| PUT | /books/:id | Update a book |
| DELETE | /books/:id | Delete a book |

## 5. Validation and Status Codes

- 200 OK – Successful retrieval, update or deletion.
- 201 Created – Book successfully created.
- 400 Bad Request – Invalid or missing input.
- 404 Not Found – Book ID does not exist.

## 6. Screenshots

Screenshots of successful GET, POST, PUT, DELETE requests and query parameter testing are available in the screenshots folder.

## 7. Debugging

Common errors handled:
- Invalid book details.
- Missing required fields.
- Non-numeric or negative price.
- Book ID not found.
- Port conflicts and incorrect routes.

## 8. Problems Faced and Solutions
- PowerShell blocked npm commands; used npm.cmd.
- Used Postman Desktop Agent to test the localhost API.
- Restarting the server reset the in-memory book data.

## 9. Conclusion

This lab helped me understand REST API development using Node.js and Express.js. I implemented CRUD operations, query parameters, searching, sorting, filtering, pagination, validation and error handling using Postman.

