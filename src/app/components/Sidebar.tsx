import { useState } from 'react';
import { NavLink } from 'react-router';
import { LayoutDashboard, MessageSquare, BookUser, Wallet, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { UserSettingsModal } from './UserSettingsModal';

export function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userName] = useState('علی احمدی');

  const menuItems = [
    { icon: LayoutDashboard, label: 'داشبورد', path: '/dashboard' },
    { icon: MessageSquare, label: 'پیامک ها', path: '/messages' },
    { icon: BookUser, label: 'دفتر شماره ها', path: '/contacts' },
    { icon: Wallet, label: 'کیف پول', path: '/wallet' },
    // { icon: FileText, label: 'متن پیش فرض', path: '/default-texts' },
  ];

  return (
    <>
      <aside className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} w-64 h-screen shadow-lg sticky top-0 self-start`}>
        <div className="p-6 flex flex-col h-full">
          <h1 className="text-2xl font-bold text-blue-500 mb-8">پنل پیامکی</h1>
          <nav className="space-y-2 flex-1 overflow-y-auto">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : theme === 'dark'
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className={`pt-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center justify-center px-4 py-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors group`}
              aria-label="تغییر تم"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400 transition-transform duration-300 group-hover:rotate-180" />
              ) : (
                <Moon className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" />
              )}
            </button>

            <div className="relative mt-3">
              <button
                onClick={() => setShowUserMenu((prev) => !prev)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {userName.charAt(0)}
                </div>
                <div className="text-right flex-1">
                  <div className="text-sm font-bold">{userName}</div>
                </div>
              </button>

              {showUserMenu && (
                <div className={`absolute bottom-full left-0 mb-2 w-full ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-lg shadow-xl border overflow-hidden z-50`}>
                  <button
                    onClick={() => {
                      setShowSettings(true);
                      setShowUserMenu(false);
                    }}
                    className={`w-full text-right px-4 py-3 text-sm ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}
                  >
                    تنظیمات کاربری
                  </button>
                  <button
                    className={`w-full text-right px-4 py-3 text-sm text-red-500 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}
                  >
                    خروج
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
      {showSettings && (
        <UserSettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </>
  );
}
