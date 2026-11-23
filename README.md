# KIInect

A campus social app for university students, built with the MERN stack (MongoDB, Express, React, Node.js). Students post questions, answer them, and browse campus information. Sign-in uses Google through Firebase Authentication.

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

## Limitations

- No automated tests.
- Uses `nodemon` as the start command, which is meant for development.
- Some features in the sidebar are not built yet.

## License

MIT, see [LICENSE](LICENSE).

## Contact

Anubhav Gupta, [LinkedIn](https://www.linkedin.com/in/anubhav-gupta-92410a244/)
