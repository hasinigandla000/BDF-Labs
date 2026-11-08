
const express = require("express");

const app = express();


// Sample book data
let books = [
    { id: 1, title: "Python Basics", author: "John", isbn: "ISBN001", price: 350 },
    { id: 2, title: "Java Programming", author: "David", isbn: "ISBN002", price: 500 },
    { id: 3, title: "Web Development", author: "Smith", isbn: "ISBN003", price: 450 },
    { id: 4, title: "Data Science", author: "Alice", isbn: "ISBN004", price: 600 },
    { id: 5, title: "Machine Learning", author: "Robert", isbn: "ISBN005", price: 700 }
];


// Middleware to read JSON data
app.use(express.json());


// GET all books with search, sorting, pagination and price filtering
app.get("/books", (req, res) => {

    let result = [...books];

    // Search by title
    if (req.query.search) {
        result = result.filter(book =>
            book.title.toLowerCase().includes(req.query.search.toLowerCase())
        );
    }

    // Price range filter
    const minPrice = Number(req.query.min_price);
    const maxPrice = Number(req.query.max_price);

    if (req.query.min_price !== undefined && !Number.isFinite(minPrice)) {
        return res.status(400).json({ message: "Invalid minimum price" });
    }

    if (req.query.max_price !== undefined && !Number.isFinite(maxPrice)) {
        return res.status(400).json({ message: "Invalid maximum price" });
    }

    if (req.query.min_price !== undefined) {
        result = result.filter(book => book.price >= minPrice);
    }

    if (req.query.max_price !== undefined) {
        result = result.filter(book => book.price <= maxPrice);
    }

    // Sorting
    const sortBy = req.query.sort_by || "id";
    const orderBy = (req.query.order_by || "ASC").toUpperCase();

    if (!["id", "title", "price"].includes(sortBy)) {
        return res.status(400).json({ message: "Invalid sort field" });
    }

    if (!["ASC", "DESC"].includes(orderBy)) {
        return res.status(400).json({ message: "Invalid sort order" });
    }

    result.sort((a, b) => {
        let comparison;

        if (typeof a[sortBy] === "string") {
            comparison = a[sortBy].localeCompare(b[sortBy]);
        } else {
            comparison = a[sortBy] - b[sortBy];
        }

        return orderBy === "ASC" ? comparison : -comparison;
    });

    // Pagination
    const limit = Number(req.query.limit ?? 10);
    const offset = Number(req.query.offset ?? 0);

    if (!Number.isInteger(limit) || limit <= 0 ||
        !Number.isInteger(offset) || offset < 0) {
        return res.status(400).json({ message: "Invalid limit or offset" });
    }

    const total = result.length;
    result = result.slice(offset, offset + limit);

    res.status(200).json({
        message: "Books retrieved successfully",
        total: total,
        limit: limit,
        offset: offset,
        data: result
    });
});


// First test route
app.get("/", (req, res) => {
    res.send("Lab 3 REST API is running!");
});

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// POST - Add a new book
app.post("/books", (req, res) => {
    const { title, author, isbn, price } = req.body;

    if (!title || !author || !isbn ||
        price === undefined || typeof price !== "number" ||
        !Number.isFinite(price) || price <= 0) {
        return res.status(400).json({
            message: "Invalid book details. Provide title, author, ISBN and a positive numeric price."
        });
    }

    if (books.some(book => book.isbn === isbn)) {
        return res.status(400).json({
            message: "ISBN already exists"
        });
    }

    const newBook = {
        id: Math.max(0, ...books.map(book => book.id)) + 1,
        title,
        author,
        isbn,
        price
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        data: newBook
    });
});

// PUT - Update an existing book
app.put("/books/:id", (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const { title, author, isbn, price } = req.body;

    if (!title || !author || !isbn ||
        typeof price !== "number" || !Number.isFinite(price) || price <= 0) {
        return res.status(400).json({
            message: "Invalid book details"
        });
    }

    if (books.some(item => item.isbn === isbn && item.id !== id)) {
        return res.status(400).json({
            message: "ISBN already exists"
        });
    }

    book.title = title;
    book.author = author;
    book.isbn = isbn;
    book.price = price;

    res.status(200).json({
        message: "Book updated successfully",
        data: book
    });
});


// DELETE - Remove a book
app.delete("/books/:id", (req, res) => {
    const id = Number(req.params.id);

    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const deletedBook = books.splice(bookIndex, 1)[0];

    res.status(200).json({
        message: "Book deleted successfully",
        data: deletedBook
    });
});
