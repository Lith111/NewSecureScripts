import { Link } from 'react-router-dom';
export default function Unauthorized() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-9xl font-bold text-red-500">403</h1>
      <p className="text-2xl mt-4">غير مصرح لك بالدخول</p>
      <Link to="/" className="text-accent underline mt-4 block">العودة للرئيسية</Link>
    </div>
  );
}