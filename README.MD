
---

```markdown
# 🎵 Sonic Beats Music Player

A full-featured **MERN Stack** (MongoDB, Express.js, React.js, Node.js) music player application that allows users to browse, play, and manage their favorite tracks — with each user having a personal updatable playlist.

---

## 🚀 Features

- 🎶 Store and manage music tracks (title, artist, genre, duration, cover image)
- 🧑‍💼 Secure user authentication with JWT
- 📁 Each user has **one updatable playlist**
- 🌐 RESTful API for tracks and playlist operations
- 🖼️ Upload and serve metadata (cover images)
- 🔐 Passwords hashed securely with `bcrypt`
- 📦 Well-structured MongoDB models for scalability

---

## 🛠️ Tech Stack

| Tech         | Purpose                          |
|--------------|----------------------------------|
| MongoDB      | NoSQL database                   |
| Express.js   | Web framework for API backend    |
| React.js     | Frontend interface               |
| Node.js      | Backend runtime environment      |
| Mongoose     | MongoDB ODM for schemas          |
| bcrypt       | Password encryption              |
| jsonwebtoken | JWT authentication               |
| dotenv       | Environment config management    |


---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/jay-bhesaniya13/sonic-beats.git
cd sonic-beats
````

---

### 2. Backend Setup (`server/`)

```bash
cd server
npm install
```

Create a `.env` file inside the `/server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/Sonic_beats
JWT_SECRET=your_jwt_secret_key 
```

Run the backend server:

```bash
node app.js
# or if using nodemon:
npm run dev
```

---

### 3. Frontend Setup (`react/`)

```bash
cd ../react
npm install
npm run dev
```

> Make sure your frontend makes requests to the correct API URL (e.g., `http://localhost:5000/api`).

---

## 👤 User Flow

1. A user registers or logs in
2. The user browses or searches for music
3. They can add tracks to their personal playlist
4. Users can update or reset their playlist anytime

---
  
 