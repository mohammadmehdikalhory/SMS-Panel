import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MessageSquare } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function Login() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      // Simple mock authentication
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } else {
      alert('لطفا نام کاربری و رمز عبور را وارد کنید');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-2xl p-8 w-full max-w-md`}>
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-500 p-4 rounded-full mb-4">
            <MessageSquare className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold">پنل پیامکی</h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
            لطفا وارد شوید
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              نام کاربری
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-gray-50 border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="نام کاربری خود را وارد کنید"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              رمز عبور
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-gray-50 border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="رمز عبور خود را وارد کنید"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            ورود
          </button>
        </form>

        <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-center mt-6 text-sm`}>
          نام کاربری و رمز عبور: هر مقداری
        </div>
      </div>
    </div>
  );
}