# GitHub Viewer Application

[![Vue.js](https://img.shields.io/badge/Vue.js-3.3-4FC08D.svg?logo=vuedotjs)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000.svg?logo=express)](https://expressjs.com/)

A secure GitHub repository explorer with authentication and commit visualization.

![App Screenshot](./screenshoot/screenshot.png)

## Features

- 🔒 GitHub authentication flow
- 📂 Repository listing with search/filter
- 🌳 Branch selection and commit history
- ♻️ Infinite scroll for commit loading

## Prerequisites

- Node.js 18+
- npm 9+
- GitHub account
- [GitHub OAuth App](https://github.com/settings/applications/new)

## Setup

### 1. Clone Repository
```bash
git clone https://github.com/SOverFLow/salah_eddine_elhandaoui-frontend-challenge.git
cd salah_eddine_elhandaoui-frontend-challenge
```
### 2. Frontend Setup
```bash
npm install
```
### Create .env file
```bash
VUE_APP_GITHUB_CLIENT_ID=your_github_client_id
VUE_APP_REDIRECT_URI=http://localhost:8080/login
```

### 3. Backend Setup
```bash
cd server
npm install
```
### Create .env

Copy .env.example and fill in your GitHub credentials:

```bash
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### Running

### Start Backend (in server directory)

The server will run on http://localhost:4000 by default

```bash
node index.js
```

### Start Frontend (in root directory)

The app will run on http://localhost:8080

```bash
npm run serve
```
