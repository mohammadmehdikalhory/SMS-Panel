import { NavLink } from 'react-router';
import { LayoutDashboard, MessageSquare, BookUser, Wallet, FileText } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function Sidebar() {
  const { theme } = useTheme();

  const menuItems = [
    { icon: LayoutDashboard, label: 'داشبورد', path: '/dashboard' },
    { icon: MessageSquare, label: 'پیامک ها', path: '/messages' },
    { icon: BookUser, label: 'دفتر شماره ها', path: '/contacts' },
    { icon: Wallet, label: 'کیف پول', path: '/wallet' },
    { icon: FileText, label: 'متن پیش فرض', path: '/default-texts' },
  ];

  return (
    <aside className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} w-64 min-h-screen shadow-lg`}>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-500 mb-8">پنل پیامکی</h1>
        <nav className="space-y-2">
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
      </div>
    </aside>
  );
}