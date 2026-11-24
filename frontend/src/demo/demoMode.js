// Demo mode runs the client without Firebase or the Express/MongoDB backend.
// It is on when VITE_DEMO_MODE=true, or when no Firebase API key is configured
// (for example on a static deployment).
export const DEMO_MODE =
  import.meta.env.VITE_DEMO_MODE === "true" ||
  !import.meta.env.VITE_FIREBASE_API_KEY;

const SESSION_KEY = "kiinect-demo-session";

// Small SVG avatar with initials, so the demo does not depend on external images.
export function avatar(name, color) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">' +
    '<rect width="96" height="96" fill="' +
    color +
    '"/>' +
    '<text x="48" y="60" font-size="38" font-family="Arial,sans-serif" ' +
    'fill="#fff" text-anchor="middle">' +
    initials +
    "</text></svg>";
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

export const DEMO_USER = {
  userName: "Demo Visitor",
  photo: avatar("Demo Visitor", "#6b4ae1"),
  email: "demo.visitor@example.com",
  uid: "demo-visitor"
};

export function getDemoSession() {
  try {
    return localStorage.getItem(SESSION_KEY) === "1" ? DEMO_USER : null;
  } catch (e) {
    return null;
  }
}

export function startDemoSession() {
  localStorage.setItem(SESSION_KEY, "1");
}

export function endDemoSession() {
  localStorage.removeItem(SESSION_KEY);
}
