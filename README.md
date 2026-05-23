# 🔐 Password Manager

A full-stack password manager built with **React**, **Node.js**, **Express**, and **MongoDB**. Store, edit, and delete your passwords securely with a clean UI.

---

## 🖥️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React, Vite, Tailwind CSS           |
| Backend   | Node.js, Express.js                 |
| Database  | MongoDB                             |
| UI Icons  | Lord Icon                           |
| Toasts    | React Toastify                      |

---

## 📁 Project Structure

```
PasswordManager/
├── Backend/
│   ├── server.js        # Express server
│   ├── package.json
├── src/
│   ├── components/
│   │   ├── Manager.jsx  # Main password manager component
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   └── App.jsx
├── public/
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

---

### 1. Clone the repository

```bash
git clone https://github.com/RishabhBisht1/PasswordManager.git
cd PasswordManager
```

---

### 2. Setup the Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

Start the backend server:

```bash
node watch server.js
```

The backend runs on `http://localhost:3000`

---

### 3. Setup the Frontend

Open a new terminal in the project root:

```bash
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`

---

## ✨ Features

- ➕ Add new passwords with website, username and password fields
- ✏️ Edit existing passwords — updates in place without duplicates
- 🗑️ Delete passwords with confirmation
- 👁️ Toggle password visibility
- 📋 One-click copy for website, username and password
- 🔔 Toast notifications on copy
- 💾 Persistent storage with MongoDB

---

## 🔒 Security Notes

- Passwords are stored in plaintext in this version — consider adding encryption (e.g. `bcrypt` or `crypto`) for production use
- This project is intended for learning purposes

---

## 🙋‍♂️ Author

**Rishabh Bisht**  
[GitHub](https://github.com/RishabhBisht1)
