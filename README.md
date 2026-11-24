# KIInect

A campus social app for university students, built with the MERN stack (MongoDB, Express, React, Node.js). Students post questions, answer them, and browse campus information. Sign-in uses Google through Firebase Authentication.

**Live demo:** https://kiinect-campus-app.vercel.app (client only, runs in demo mode with sample data, see below)

[Demo video](https://github.com/Anubhav6205/KIInect/assets/82750157/d279f72c-498b-473b-9ecc-56cb1654074d)

**Status:** finished prototype (2023). Some sidebar sections are placeholders.

## Features

- Question and answer feed with posts and answers
- User profiles with skills and user information
- Google sign-in with Firebase Authentication
- Campus information sections for food, sports, tours and transport
- Notifications panel and people list

## Tech stack

React 18 with Vite and Redux Toolkit on the client. Express and Mongoose on the server, with MongoDB as the database. Firebase Authentication for login.

## Project structure

```
frontend/   React app (components, Redux slices, Firebase setup)
backend/    Express API: models, routes, server.js, db.js
```

The API is served under `/api`. In production mode the Express server also serves the built client from `frontend/dist`.

## Run locally

Requirements: Node.js 18 or later, a MongoDB instance, and a Firebase project with Google sign-in enabled.

```bash
# 1. Client environment: copy frontend/.env.example to frontend/.env and fill in your Firebase web config
# 2. Build the client
cd frontend && npm install && npm run build && cd ..

# 3. Start the server with your database URI
npm install
MONGO_URI="mongodb://localhost:27017/kiinect" npm start
```

The app is then available at `http://localhost:5000`. These steps are written from the code and have not been re-verified on a clean machine.

## Live demo (demo mode)

The hosted link serves the React client only. The Express and MongoDB backend and the Firebase project are not deployed there, so the client runs in demo mode:

- It turns on when `VITE_DEMO_MODE=true` or when `VITE_FIREBASE_API_KEY` is not set. With a Firebase config present it behaves as before.
- Firebase is not initialised. The login screen has an "Enter demo" button instead of Google sign-in.
- The `/api` calls are answered in the browser by `frontend/src/demo/demoApi.js`, using a few sample questions, answers and users. Anything you add is saved in your own browser's localStorage and never leaves it.
- A banner marks demo mode and has a button to reset the sample data.

Deployment config is in `vercel.json` (installs and builds `frontend/`, serves `frontend/dist`).

## Limitations

- The hosted demo does not use the real backend or real authentication.
- No automated tests.
- Uses `nodemon` as the start command, which is meant for development.
- Some features in the sidebar are not built yet.

## License

MIT, see [LICENSE](LICENSE).

## Contact

Anubhav Gupta, [LinkedIn](https://www.linkedin.com/in/anubhavgupta8)
