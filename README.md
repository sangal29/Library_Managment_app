# 📚 Library Management Application (Online Library System)

This is a React-based online library management system that allows users to browse, view details, and add new books to an online library. It uses **React**, **React Router**, and **Redux** for state management and routing.

---

## 🎯 Features

- 🏠 Home page with book categories and popular books
- 🔍 Browse and search books by title, author, or category
- 📖 View detailed information about individual books
- ➕ Add new books via a form (with validation)
- ❌ 404 Not Found page for invalid routes
- 🔄 Redux-based state management

---

## 🧱 Component Structure

- **Home** – Displays welcome message, categories, and popular books
- **Browse Books** – Lists books filtered by category with search functionality
- **Book Details** – Shows detailed info about a selected book
- **Add Book** – Form to add a new book, with validation and Redux integration
- **NotFound** – 404 page for undefined routes

---

## 🗂 Folder Structure

```
├── public/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page components (Home, Browse, Add Book, etc.)
│   ├── utils/             # Utilities
│   │   ├── store/         # Redux store
│   │   │   ├── slices/    # Redux slices (book slice, etc.)
│   │   │   └── bookStore.js  # Store setup
│   ├── App.jsx            # Root App component
│   └── main.jsx           # Entry point
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

### Installation

```bash
git clone https://github.com/sangal29/Library_Managment_app.git
cd Library_Managment_app
npm install
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 📎 Repository

🔗 [GitHub Repository](https://github.com/sangal29/Library_Managment_app)

---

## 📧 Contact

For queries or suggestions, email: **rishabhsangal29@gmail.com**

---
