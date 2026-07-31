import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-9xl font-bold text-gray-300">404</h1>
      <p className="text-2xl mt-4">الصفحة غير موجودة</p>
      <Link to="/" className="text-accent underline mt-4 block">العودة للرئيسية</Link>
    </div>
  );
}