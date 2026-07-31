import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FloatingChat from '../components/chat/FloatingChat';  // ← استيراد
import { useSelector } from 'react-redux';

export default function MainLayout() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
      {/* زر الشات العائم (للمتعلم فقط) */}
      {user?.role === 'learner' && <FloatingChat />}
    </div>
  );
}