import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { Send } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { QuickSendModal } from '../components/QuickSendModal';
import { useTheme } from '../contexts/ThemeContext';

export function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const [showQuickSend, setShowQuickSend] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/');
    } else if (location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [navigate, location]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`} dir="rtl">
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      {/* Quick Send Button */}
      <button
        onClick={() => setShowQuickSend(true)}
        className="fixed bottom-8 left-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all hover:scale-110 z-40 group"
        aria-label="ارسال سریع پیام"
      >
        <Send className="w-6 h-6" />
        <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 rounded-full bg-gray-900 px-3 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
          ارسال پیام
        </span>
      </button>

      <QuickSendModal isOpen={showQuickSend} onClose={() => setShowQuickSend(false)} />
    </div>
  );
}
