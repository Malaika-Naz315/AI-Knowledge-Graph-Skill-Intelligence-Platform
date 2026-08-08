import axios from "axios";

const HR_API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================================================
// JWT TOKEN
// =====================================================

HR_API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =====================================================
// HANDLE AUTH ERRORS
// =====================================================

HR_API.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// =====================================================
// HR PROFILE
// =====================================================

export const getHRProfile = async () => {
  const response = await HR_API.get("/hr/profile");
  return response.data;
};

// =====================================================
// HR DASHBOARD
// =====================================================

export const getHRDashboard = async () => {
  const response = await HR_API.get("/hr/dashboard");
  return response.data;
};

// =====================================================
// HR STUDENTS
// =====================================================

export const getHRStudents = async () => {
  const response = await HR_API.get("/hr/students");
  return response.data;
};

// =====================================================
// HR STUDENT PROFILE
// =====================================================

export const getHRStudentProfile = async (studentId) => {
  const response = await HR_API.get(
    `/hr/students/${studentId}`
  );

  return response.data;
};
// =====================================================
// HR MENTORS
// =====================================================

export const getHRMentors = async () => {
  const response = await HR_API.get("/hr/mentors");
  return response.data;
};

// =====================================================
// HR ANALYTICS
// =====================================================

export const getHRAnalytics = async () => {
  const response = await HR_API.get("/hr/analytics");
  return response.data;
};

// =====================================================
// HR REPORTS
// =====================================================

export const getHRReports = async () => {
  const response = await HR_API.get("/hr/reports");
  return response.data;
};

// =====================================================
// HR RECOMMENDATIONS
// =====================================================

export const getHRRecommendations = async (studentId) => {
  const response = await HR_API.get(
    `/hr/recommendations/${studentId}`
  );

  return response.data;
};

export default HR_API;