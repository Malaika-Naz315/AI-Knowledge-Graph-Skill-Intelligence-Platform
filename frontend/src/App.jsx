import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// =====================================================
// AUTH
// =====================================================

import Login from "./pages/Login";
import Signup from "./pages/Signup";

// =====================================================
// MAIN PAGES
// =====================================================

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Mentors from "./pages/Mentors";
import Skills from "./pages/Skills";
import Technologies from "./pages/Technologies";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import LearningResources from "./pages/LearningResources";
import Certificates from "./pages/Certificates";
import Products from "./pages/Products";
import CaseStudies from "./pages/CaseStudies";
import Recommendations from "./pages/Recommendations";

// =====================================================
// HR PAGES
// =====================================================

import HRDashboard from "./pages/HR/HRDashboard";
import HRStudents from "./pages/HR/HRStudents";
import HRStudentProfile from "./pages/HR/HRStudentProfile";
import HRMentors from "./pages/HR/HRMentors";
import HRAnalytics from "./pages/HR/HRAnalytics";
import HRReports from "./pages/HR/HRReports";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =================================================
            AUTH
        ================================================= */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* =================================================
            MAIN APPLICATION
        ================================================= */}

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/students"
            element={<Students />}
          />

          <Route
            path="/mentors"
            element={<Mentors />}
          />

          <Route
            path="/skills"
            element={<Skills />}
          />

          <Route
            path="/technologies"
            element={<Technologies />}
          />

          <Route
            path="/projects"
            element={<Projects />}
          />

          <Route
            path="/projects/:id"
            element={<ProjectDetails />}
          />

          <Route
            path="/learning-resources"
            element={<LearningResources />}
          />

          <Route
            path="/certificates"
            element={<Certificates />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/case-studies"
            element={<CaseStudies />}
          />

          <Route
            path="/recommendations"
            element={<Recommendations />}
          />

          {/* =================================================
              HR MODULE
          ================================================= */}

          <Route
            path="/hr/dashboard"
            element={
              <ProtectedRoute requiredRole="HR">
                <HRDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hr/students"
            element={
              <ProtectedRoute requiredRole="HR">
                <HRStudents />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hr/students/:id"
            element={
              <ProtectedRoute requiredRole="HR">
                <HRStudentProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hr/mentors"
            element={
              <ProtectedRoute requiredRole="HR">
                <HRMentors />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hr/analytics"
            element={
              <ProtectedRoute requiredRole="HR">
                <HRAnalytics />
              </ProtectedRoute>
            }
          />

          <Route
            path="/hr/reports"
            element={
              <ProtectedRoute requiredRole="HR">
                <HRReports />
              </ProtectedRoute>
            }
          />

        </Route>

        {/* =================================================
            404
        ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;