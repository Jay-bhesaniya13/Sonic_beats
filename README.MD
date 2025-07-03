
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

## 📁 Project Structure

```

sonic-beats/
├── react/                # React frontend
├── server/
│   ├── Auth/             # Token authentication middleware
│   ├── models/           # Mongoose models (User, Playlist, Track)
│   ├── routes/           # Express route handlers
│   ├── controllers/      # Business logic
│   ├── seed/             # Sample music seeders
│   ├── multer/           # File upload utility
│   ├── app.js            # Main Express app entry point
│   └── .env              # Environment variables

````

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/sonic-beats.git
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

## 📦 API Endpoints

### 🔐 **User Authentication & Management** (`/user`)

| Method | Endpoint      | Description                    |
| ------ | ------------- | ------------------------------ |
| POST   | `/user/login` | Login with credentials         |
| GET    | `/user/`      | Get all users                  |
| GET    | `/user/:id`   | Get user by ID                 |
| POST   | `/user/`      | Register a new user            |
| PUT    | `/user/:id`   | Update user by ID              |
| DELETE | `/user/:id`   | Delete user and their playlist |

---

### 🛠️ **Admin Management** (`/admin`)

| Method | Endpoint     | Description        |
| ------ | ------------ | ------------------ |
| GET    | `/admin/`    | Get all admins     |
| POST   | `/admin/`    | Create a new admin |
| PUT    | `/admin/:id` | Update admin by ID |
| DELETE | `/admin/:id` | Delete admin by ID |

---

### 🎵 **Music Management** (`/music`)

| Method | Endpoint     | Description                            |
| ------ | ------------ | -------------------------------------- |
| GET    | `/music/`    | Get all music tracks                   |
| GET    | `/music/:id` | Get a music track by ID                |
| POST   | `/music/`    | Upload a new track (with file + cover) |
| PUT    | `/music/:id` | Update a music track by ID             |
| DELETE | `/music/:id` | Delete a music track by ID             |

> 🔧 `POST /music/` uses `multipart/form-data` via `multer` for file and image uploads.

---

### 🎧 **Playlist Management** (`/playlist`)

| Method | Endpoint                        | Description                   |
| ------ | ------------------------------- | ----------------------------- |
| GET    | `/playlist/`                    | Get all playlists             |
| GET    | `/playlist/:id`                 | Get a playlist by ID          |
| POST   | `/playlist/`                    | Create a new playlist         |
| PUT    | `/playlist/:id/add/:musicId`    | Add a song to a playlist      |
| PUT    | `/playlist/:id/remove/:musicId` | Remove a song from a playlist |
| DELETE | `/playlist/:id`                 | Delete a playlist by ID       |
 
---

## 👤 User Flow

1. A user registers or logs in
2. The user browses or searches for music
3. They can add tracks to their personal playlist
4. Users can update or reset their playlist anytime

---

## 📸 Screenshots

 
---

## 🔗 Links

* 🧠 [GitHub Repository](https://github.com/your-username/sonic-beats)

---

## 🙌 Acknowledgements

* [MongoDB](https://www.mongodb.com/)
* [Express.js](https://expressjs.com/)
* [React.js](https://reactjs.org/)
* [Node.js](https://nodejs.org/)

---


