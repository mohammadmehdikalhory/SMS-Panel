import { useState, useEffect } from 'react';
import { Sun, Moon, User, Settings, Calendar } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { getPersianDateString, getPersianDayName, formatTime } from '../utils/jalali';
import { ModernCalendar } from './ModernCalendar';
import { UserSettingsModal } from './UserSettingsModal';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userName] = useState('علی احمدی'); // نام کامل کاربر
  const [username] = useState('کاربر'); // نام کاربری

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dateString = getPersianDateString(currentTime);
  const dayName = getPersianDayName(currentTime);
  const timeString = formatTime(currentTime);

  return (
    <>
      <header className={`${theme === 'dark' ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white' : 'bg-gradient-to-r from-white to-gray-50 text-gray-900'} shadow-lg px-6 py-4 relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10" />
        
        <div className="flex items-center justify-between relative z-10">
          {/* Date and Time Section */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className={`flex items-center gap-4 cursor-pointer ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-white'} px-5 py-3 rounded-2xl transition-all shadow-md hover:shadow-lg backdrop-blur-sm`}
            onClick={() => setShowCalendar(true)}
          >
            <Calendar className="w-5 h-5 text-blue-500" />
            <div className="flex items-center gap-3">
              <span className="font-semibold text-sm">{dayName}</span>
              <div className="w-px h-5 bg-gray-300 dark:bg-gray-600" />
              <span className="font-bold">{dateString}</span>
              <div className="w-px h-5 bg-gray-300 dark:bg-gray-600" />
              <span className="text-blue-500 font-bold tabular-nums">{timeString}</span>
            </div>
          </motion.div>

          {/* Right Side - Theme and User */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} transition-all shadow-md`}
              aria-label="تغییر تم"
            >
              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun className="w-5 h-5 text-yellow-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} transition-all shadow-md`}
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {userName.charAt(0)}
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">{userName}</div>
                  <div className="text-xs opacity-70">@{username}</div>
                </div>
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute left-0 top-full mt-2 w-52 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-2xl shadow-2xl border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} z-50 overflow-hidden`}
                  >
                    <motion.button
                      whileHover={{ x: 5 }}
                      onClick={() => {
                        setShowSettings(true);
                        setShowUserMenu(false);
                      }}
                      className={`w-full text-right px-5 py-3 flex items-center gap-3 ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'} transition-all`}
                    >
                      <Settings className="w-4 h-4 text-blue-500" />
                      <span>تنظیمات</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {showCalendar && <ModernCalendar onClose={() => setShowCalendar(false)} />}
      </AnimatePresence>
      
      <UserSettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
}
