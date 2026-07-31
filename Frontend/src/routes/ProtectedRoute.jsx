import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, token } = useSelector((state) => state.auth);
  const location = useLocation();

  // إذا لم يسجل الدخول
  // if (!token || !user) {
  //   // return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  // إذا حاول الدخول لمسار غير مصرح به (حسب الصلاحية)
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // إذا المستخدم مسجل دخل وحاول يزور صفحات عامة مثل login أو home
  // (سيتم التعامل معها في تعريف المسار وليس هنا، لكن يمكن إضافتها)

  return children;
}