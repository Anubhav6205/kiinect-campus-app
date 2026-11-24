// In-browser stand-in for the Express API, used only in demo mode.
// It replaces the axios adapter so the existing components keep calling
// the same URLs. Data lives in localStorage on the visitor's own browser.
import axios from "axios";
import { avatar } from "./demoMode";

const DB_KEY = "kiinect-demo-db-v1";

const people = [
  ["Aarav Mehta", "#e1664a"],
  ["Diya Sharma", "#2f9e6e"],
  ["Rohan Verma", "#3b7dd8"],
  ["Ishita Rao", "#c2428a"],
  ["Kabir Singh", "#d69a1f"],
  ["Meera Nair", "#7a56c9"],
  ["Neel Patel", "#1f8a9e"],
  ["Sana Khan", "#b5523b"]
];

function person(i) {
  const [name, color] = people[i];
  return {
    userName: name,
    photo: avatar(name, color),
    email: name.toLowerCase().replace(" ", ".") + "@example.com",
    uid: "seed-" + i
  };
}

const hoursAgo = (h) => new Date(Date.now() - h * 3600 * 1000).toISOString();

function seed() {
  const questions = [
    {
      _id: "q1",
      questionName: "Which library has the quietest study spots during exam week?",
      questionUrl: "",
      createdAt: hoursAgo(30),
      user: person(0),
      upvotes: 14,
      downvotes: 1
    },
    {
      _id: "q2",
      questionName: "How do I prepare for a data structures viva in two days?",
      questionUrl: "",
      createdAt: hoursAgo(12),
      user: person(2),
      upvotes: 9,
      downvotes: 0
    },
    {
      _id: "q3",
      questionName: "Is there a shuttle from the main gate to the hostels after 9 pm?",
      questionUrl: "",
      createdAt: hoursAgo(5),
      user: person(3),
      upvotes: 6,
      downvotes: 0
    },
    {
      _id: "q4",
      questionName: "Anyone interested in forming a team for the next hackathon?",
      questionUrl: "",
      createdAt: hoursAgo(1),
      user: person(5),
      upvotes: 3,
      downvotes: 0
    }
  ];
  const answers = [
    {
      _id: "a1",
      questionId: "q1",
      answer:
        "<p>The second floor reading room is usually the calmest. Go before 9 am to get a seat.</p>",
      createdAt: hoursAgo(28),
      user: person(1)
    },
    {
      _id: "a2",
      questionId: "q2",
      answer:
        "<p>Revisit trees, graphs and hashing first. Write each one by hand once, then explain it aloud.</p>",
      createdAt: hoursAgo(10),
      user: person(4)
    },
    {
      _id: "a3",
      questionId: "q2",
      answer: "<p>Go through your lab programs again. Vivas tend to follow them closely.</p>",
      createdAt: hoursAgo(8),
      user: person(1)
    }
  ];
  const userinfos = people.map((p, i) => ({
    _id: "u" + i,
    name: p[0],
    email: person(i).email,
    photoURL: person(i).photo
  }));
  return { questions, answers, userinfos, skills: {}, counter: 100 };
}

let memory = null;

function load() {
  if (memory) return memory;
  try {
    const raw = localStorage.getItem(DB_KEY);
    memory = raw ? JSON.parse(raw) : seed();
  } catch (e) {
    memory = seed();
  }
  return memory;
}

function save() {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(memory));
  } catch (e) {
    // storage full or blocked: keep working in memory for this page load
  }
}

function newId(db, prefix) {
  db.counter += 1;
  return prefix + db.counter;
}

function withAnswers(db, q) {
  return {
    ...q,
    allAnswers: db.answers.filter((a) => a.questionId === q._id)
  };
}

function route(method, path, body) {
  const db = load();
  const parts = path.replace(/^\/api\//, "").split("/").filter(Boolean);
  const [resource, a, b] = parts;

  if (resource === "questions") {
    if (method === "get") return [200, db.questions.map((q) => withAnswers(db, q))];
    if (method === "post" && a === "search") {
      const term = (body.searchTerm || "").toLowerCase();
      return [
        200,
        db.questions
          .filter((q) => q.questionName.toLowerCase().startsWith(term))
          .map((q) => withAnswers(db, q))
      ];
    }
    if (method === "post") {
      db.questions.push({
        _id: newId(db, "q"),
        questionName: body.questionName,
        questionUrl: body.questionUrl || "",
        createdAt: new Date().toISOString(),
        user: body.user,
        upvotes: 0,
        downvotes: 0
      });
      save();
      return [200, { status: true, message: "Question saved successfully" }];
    }
    if (method === "patch") {
      const q = db.questions.find((x) => x._id === a);
      if (!q) return [404, { status: false, message: "Question not found" }];
      if (b === "upvote") {
        q.upvotes += 1;
        q.downvotes = Math.max(0, q.downvotes - 1);
      } else if (b === "downvote") {
        q.downvotes += 1;
        q.upvotes = Math.max(0, q.upvotes - 1);
      } else {
        return [400, { status: false, message: "Invalid vote type" }];
      }
      save();
      return [200, { status: true, message: "Vote updated successfully" }];
    }
  }

  if (resource === "answers" && method === "post") {
    db.answers.push({
      _id: newId(db, "a"),
      questionId: body.questionId,
      answer: body.answer,
      createdAt: new Date().toISOString(),
      user: body.user
    });
    save();
    return [200, { status: true, message: "Answer saved successfully" }];
  }

  if (resource === "userinfos") {
    if (method === "get") {
      return [
        200,
        { status: true, message: "User info fetched successfully", data: db.userinfos }
      ];
    }
    if (method === "post") {
      if (!db.userinfos.some((u) => u.email === body.email)) {
        db.userinfos.push({ _id: newId(db, "u"), ...body });
        save();
      }
      return [200, { status: true, message: "User info saved successfully" }];
    }
  }

  if (resource === "skills" && method === "post") {
    if (a === "find") {
      const list = db.skills[body.username];
      return [
        200,
        list
          ? [{ username: body.username, skills: list }]
          : { status: false, message: "User does not exist" }
      ];
    }
    db.skills[body.username] = [...(db.skills[body.username] || []), body.skill];
    save();
    return [200, { status: true, message: "Skill saved successfully" }];
  }

  return [404, { status: false, message: "Not found" }];
}

export function installDemoApi() {
  axios.defaults.adapter = (config) =>
    new Promise((resolve, reject) => {
      let body = config.data;
      if (typeof body === "string") {
        try {
          body = JSON.parse(body);
        } catch (e) {
          body = {};
        }
      }
      const path = new URL(config.url, "http://demo.local").pathname;
      const [status, data] = route(
        (config.method || "get").toLowerCase(),
        path,
        body || {}
      );
      const response = {
        data,
        status,
        statusText: String(status),
        headers: {},
        config,
        request: {}
      };
      if (status >= 200 && status < 300) resolve(response);
      else {
        const err = new Error("Request failed with status code " + status);
        err.response = response;
        err.config = config;
        reject(err);
      }
    });
}

export function resetDemoData() {
  memory = null;
  localStorage.removeItem(DB_KEY);
}
