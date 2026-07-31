import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentUser } from "../redux/slices/authSlice";
// التخطيطات الخاصة بالصفحات
import HomeLayout from "../layouts/HomeLayout";
import MainLayout from "../layouts/MainLayout";

// حامي المسارات
import ProtectedRoute from "./ProtectedRoute";

// الصفحات العامة والخاصة
import Homepage from "../pages/home/Homepage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import LearnerDashboard from "../pages/learner/Dashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import NotFound from "../pages/errors/NotFound";
import Unauthorized from "../pages/errors/Unauthorized";
import LessonView from "../pages/learner/LessonView";
import QuizPage from "../pages/learner/QuizPage";

// -------------------- مكوّن مساعد: يمنع المستخدم المسجّل من دخول صفحات الضيف --------------------
function GuestRoute({ children }) {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
     if (localStorage.getItem("token")) {
      dispatch(fetchCurrentUser());
   }
  }, []);
  if (token) {
    // إذا كان مسجّلاً بالفعل، وجّهه إلى لوحة التحكم المناسبة مباشرة
    const destination =
      user?.role === "admin" ? "/admin/dashboard" : "/dashboard";
    return <Navigate to={destination} replace />;
  }

  return children;
}

// -------------------- تعريف الموجه (Router) --------------------
export const router = createBrowserRouter([
  // 1. مسارات عامة (لأي زائر) داخل تخطيط الصفحة الرئيسية
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: (
          <GuestRoute>
            <Homepage />
          </GuestRoute>
        ),
      },
    ],
  },

  // 2. مسارات المصادقة (Auth) بتخطيط بسيط
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
    ],
  },

  // 3. مسارات المتعلم المحمية (دور learner هو الافتراضي إذا لم نحدّد allowedRole)
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element: <LearnerDashboard /> },
      {
        path: "/lesson/:id",
        element: <LessonView />,
      },
      {
        path: "/quiz/:lessonId",
        element: <QuizPage />,
      },
    ],
  },

  // 4. مسارات الأدمن المحمية
  {
    element: (
      <ProtectedRoute allowedRole="admin">
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/admin/dashboard", element: <AdminDashboard /> },
      // مسارات أدمن إضافية تـُضاف هنا لاحقاً
    ],
  },
  // 5. صفحات الخطأ
  { path: "/unauthorized", element: <Unauthorized /> },
  { path: "*", element: <NotFound /> },
]);
