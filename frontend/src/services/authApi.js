import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-knowledge-graph-skill-intelligence-platform-production-7698.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================
// ATTACH JWT TOKEN
// ==========================================

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================================
// LOGIN
// ==========================================

export const login = async (credentials) => {
  const response = await API.post(
    "/auth/login",
    {
      email: credentials.email,
      password: credentials.password,
    }
  );

  return response.data;
};

// ==========================================
// SIGNUP
// ==========================================

export const signup = async (userData) => {
  const response = await API.post(
    "/auth/signup",
    {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    }
  );

  return response.data;
};

// ==========================================
// TOKEN
// ==========================================

export const getToken = () => {
  return localStorage.getItem("token");
};

export default API;