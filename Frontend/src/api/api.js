const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const SERVER_URL = API_URL.replace(/\/api\/?$/, "");

export const api = async (endpoint, options = {}) => {
  const token = localStorage.getItem("music_token");
  const headers = {
    ...(options.body instanceof FormData
      ? {}
      : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
  const text = await response.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text };
  }
  if (!response.ok) throw new Error(data.message || "Something went wrong");
  return data;
};

export const mediaUrl = (path) =>
  path
    ? path.startsWith("http")
      ? path
      : `${SERVER_URL}${path}`
    : "/MusicLogoI.jpg";
