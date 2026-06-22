# LinkHub - Linktree Clone

## Overview

LinkHub is a full-stack Linktree-style application that allows users to:

- Register and login
- Create and manage multiple links
- Share a public profile
- Track link clicks
- View analytics and performance data

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router DOM
- React Hook Form
- Axios
- Recharts
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Express Validator

---

## Features

### Authentication

- Register
- Login
- Protected Routes

### Dashboard

- Create Link
- Update Link
- Delete Link
- Toggle Active / Inactive
- Copy Public Profile Link

### Public Profile

- Public user profile
- Instagram-style profile page
- Public links page

### Analytics

- Total Links
- Total Clicks
- Active Links
- Last 7 Days Activity
- Link Performance

---

## Project Structure

```txt
client/
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   │   ├── auth/
│   │   ├── links/
│   │   ├── profile/
│   │   └── analytics/
│   └── main.jsx

server/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── app.js
```

---

## Installation

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## Environment Variables

```env
PORT=8080
DATABASE_URL=mongodb://localhost:27017/linkhub
JWT_SECRET=your_secret
LOGGER_LEVEL=info
NODE_ENV=development
ACCESS_TOKEN=siqH1aiZIFTTEtoJNpGtVVQs3itnaR3Nf
REFRESH_TOKEN=6ETcF87w1D19knceKxZjvDeZVNxHteMFMIR
```

---

# API Documentation

Base URL

```txt
http://localhost:8080/api
```

---

# Authentication APIs

## Register

```http
POST /api/auth/register
```

### Request

```json
{
  "name": "Praful Koli",
  "username": "prafulkoli",
  "email": "praful@gmail.com",
  "password": "123456"
}
```

### Response

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

## Login

```http
POST /api/auth/login
```

### Request

```json
{
  "email": "praful@gmail.com",
  "password": "123456"
}
```

### Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
            "id": "6a37dc0fe9492c9bb468d85d",
            "name": "Praful Koli",
            "username": "prafulkoli",
            "email": "prafulkoli852@gmail.com",
            "bio": "Full Stack MERN Developer",
            "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqPyqt09OiBbr24gGXiFxjNohLO2mJPB7wvFCmAX387A&s"
        },
    "accessToken": "jwt_token"
  }
}
```

---

# Links APIs

## Create Link

```http
POST /api/links
```

### Request

```json
{
  "title": "GitHub",
  "url": "https://github.com/praful"
}
```

### Response

```json
{
    "success": true,
    "message": "Links fetched successfully",
    "data": [
        {
            "_id": "6a38b5f1655c2af506233d3d",
            "title": "youtube",
            "url": "https://www.youtube.com",
            "user": "6a37dc0fe9492c9bb468d85d",
            "isActive": true,
            "clicks": 0,
            "createdAt": "2026-06-22T04:11:29.347Z",
            "updatedAt": "2026-06-22T04:11:29.347Z",
            "__v": 0
        }
    ]
}
```

---

---

## Update Link

```http
PATCH /api/links/:id
```

### Request

```json
{
  "title": "Portfolio",
  "url": "https://portfolio.com",
  "isActive": true
}
```
### Response

```json
{
    "success": true,
    "message": "Links update successfully",
    "data": {
        "_id": "6a38ad2da39ac8d8cac05c01",
        "title": "youtube",
        "url": "https://www.youtube.com",
        "user": "6a37dc0fe9492c9bb468d85d",
        "isActive": true,
        "clicks": 0,
        "createdAt": "2026-06-22T03:34:05.188Z",
        "updatedAt": "2026-06-22T04:01:07.291Z",
        "__v": 0
    }
}
```
---
---

## Delete Link

```http
DELETE /api/links/:id
```

### Response

```json
{
  "success": true,
  "message": "Link deleted successfully"
}
```

---

## Track Click

```http
GET /api/links/click/:id
```

### Response

```txt
302 Redirect
```

The click count increases and the user is redirected to the original URL.

---

# Public Profile APIs

## Get Public Profile

```http
GET /api/link/:username/profile
```

### Response

```json
{
  "success": true,
  "data": {
        "profile": {
            "_id": "6a37dc0fe9492c9bb468d85d",
            "name": "Praful Koli",
            "username": "prafulkoli",
            "bio": "Full Stack MERN Developer",
            "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqPyqt09OiBbr24gGXiFxjNohLO2mJPB7wvFCmAX387A&s"
        },
        "links": [
            {
                "_id": "6a38b5f1655c2af506233d3d",
                "title": "youtube",
                "url": "https://www.youtube.com",
                "user": "6a37dc0fe9492c9bb468d85d",
                "isActive": true,
                "clicks": 3,
                "createdAt": "2026-06-22T04:11:29.347Z",
                "updatedAt": "2026-06-22T11:01:31.142Z",
                "__v": 0
            },
            {
                "_id": "6a38b5e3655c2af506233d3c",
                "title": "google",
                "url": "https://www.google.com",
                "user": "6a37dc0fe9492c9bb468d85d",
                "isActive": true,
                "clicks": 3,
                "createdAt": "2026-06-22T04:11:15.872Z",
                "updatedAt": "2026-06-22T04:13:50.018Z",
                "__v": 0
            }
        ]
    }
}
```

---

# Analytics API

## Get Analytics

```http
GET /api/link/:username/analytics
```

### Response

```json
{
  "success": true,
    "data": {
        "totalLinks": 2,
        "totalClicks": 6,
        "linkPerformance": [
            {
                "_id": "6a38b5e3655c2af506233d3c",
                "title": "google",
                "url": "https://www.google.com",
                "isActive": true,
                "clicks": 3,
                "createdAt": "2026-06-22T04:11:15.872Z"
            },
            {
                "_id": "6a38b5f1655c2af506233d3d",
                "title": "youtube",
                "url": "https://www.youtube.com",
                "isActive": true,
                "clicks": 3,
                "createdAt": "2026-06-22T04:11:29.347Z"
            }
        ],
        "last7DaysActivity": [
            {
                "date": "2026-06-16",
                "clicks": 0
            },
            {
                "date": "2026-06-17",
                "clicks": 0
            },
            {
                "date": "2026-06-18",
                "clicks": 0
            }
        ]
    }
}
```

---

# Frontend Routes

```txt
/register
/login
/dashboard
/analytics
/:username
/:username/links
```

---

# Models

## User

```js
{
  name: String,
  username: String,
  email: String,
  password: String,
  bio: String,
  avatar: String
}
```

## Link

```js
{
  title: String,
  url: String,
  user: ObjectId,
  isActive: Boolean,
  clicks: Number
}
```

## Click

```js
{
  link: ObjectId,
  user: ObjectId,
  clickedAt: Date
}
```

---

## Author

Praful Koli
