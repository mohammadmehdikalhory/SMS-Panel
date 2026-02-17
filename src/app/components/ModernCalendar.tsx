import { useState, useEffect } from 'react';
import jalaali from 'jalaali-js';
import { X, ChevronDown } from 'lucide-react';
import { getPersianMonthName, PersianDate } from '../utils/jalali';
import { getHolidayInfo, isHolidayDate } from '../utils/persianHolidays';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';

interface ModernCalendarProps {
  onClose?: () => void;
  onSelectDate?: (date: PersianDate) => void;
  selectedDate?: PersianDate | null;
  embedded?: boolean;
}

export function ModernCalendar({
  onClose,
  onSelectDate,
  selectedDate,
  embedded = false,
}: ModernCalendarProps) {
  const { theme } = useTheme();
  const today = new Date();
  const todayJalali = jalaali.toJalaali(today);
  
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate?.month ?? todayJalali.jm,
  );
  const [currentYear, setCurrentYear] = useState(
    selectedDate?.year ?? todayJalali.jy,
  );
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      setCurrentYear(selectedDate.year);
      setCurrentMonth(selectedDate.month);
    }
  }, [selectedDate]);

  const getDaysInMonth = (year: number, month: number): number => {
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    return jalaali.isLeapJalaaliYear(year) ? 30 : 29;
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    const { gy, gm, gd } = jalaali.toGregorian(year, month, 1);
    const date = new Date(gy, gm - 1, gd);
    return date.getDay();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: (firstDay + 1) % 7 }, (_, i) => i);

  const weekDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
  const years = Array.from({ length: 20 }, (_, i) => todayJalali.jy - 10 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const isToday = (day: number) => {
    return day === todayJalali.jd && currentMonth === todayJalali.jm && currentYear === todayJalali.jy;
  };

  const isDayHoliday = (day: number) => {
    const { gy, gm, gd } = jalaali.toGregorian(currentYear, currentMonth, day);
    const date = new Date(gy, gm - 1, gd);
    return date.getDay() === 5 || isHolidayDate(currentYear, currentMonth, day);
  };

  const calendarCard = (
    <motion.div 
      initial={embedded ? false : { opacity: 0, scale: 0.9, y: 20 }}
      animate={embedded ? false : { opacity: 1, scale: 1, y: 0 }}
      exit={embedded ? false : { opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white' : 'bg-gradient-to-br from-white to-gray-50 text-gray-900'} rounded-2xl shadow-2xl p-6 w-[450px] relative overflow-hidden`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl -z-10" />

      {onClose && !embedded && (
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all hover:rotate-90 duration-300"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="relative">
          <div className="relative">
            <button
              onClick={() => {
                setShowYearSelector(!showYearSelector);
                setShowMonthSelector(false);
              }}
              className={`px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all flex items-center gap-2 font-bold text-lg`}
            >
              {currentYear}
              <ChevronDown className={`w-4 h-4 transition-transform ${showYearSelector ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showYearSelector && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`absolute top-full mt-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-xl shadow-lg max-h-64 overflow-y-auto z-20 w-32`}
                >
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setCurrentYear(year);
                        setShowYearSelector(false);
                      }}
                      className={`w-full px-4 py-2 text-center transition-colors ${
                        year === currentYear 
                          ? 'bg-blue-500 text-white' 
                          : theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                      } first:rounded-t-xl last:rounded-b-xl`}
                    >
                      {year}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Month Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setShowMonthSelector(!showMonthSelector);
                setShowYearSelector(false);
              }}
              className={`px-4 py-2 rounded-xl ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all flex items-center gap-2 font-bold text-lg`}
            >
              {getPersianMonthName(currentMonth)}
              <ChevronDown className={`w-4 h-4 transition-transform ${showMonthSelector ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showMonthSelector && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`absolute top-full mt-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-xl shadow-lg max-h-64 overflow-y-auto z-20 w-40`}
                >
                  {months.map((month) => (
                    <button
                      key={month}
                      onClick={() => {
                        setCurrentMonth(month);
                        setShowMonthSelector(false);
                      }}
                      className={`w-full px-4 py-2 text-center transition-colors ${
                        month === currentMonth 
                          ? 'bg-blue-500 text-white' 
                          : theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                      } first:rounded-t-xl last:rounded-b-xl`}
                    >
                      {getPersianMonthName(month)}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Week Days */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {weekDays.map((day, index) => (
            <div 
              key={day} 
              className={`text-center text-sm font-semibold ${index === 6 ? 'text-red-500' : 'opacity-70'}`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          {days.map((day) => {
            const holiday = getHolidayInfo(currentYear, currentMonth, day);
            const isDayHolidayOrFriday = isDayHoliday(day);
            const { gy, gm, gd } = jalaali.toGregorian(currentYear, currentMonth, day);
            const date = new Date(gy, gm - 1, gd);
            const isFriday = date.getDay() === 5;
            const isSelected =
              selectedDate &&
              selectedDate.year === currentYear &&
              selectedDate.month === currentMonth &&
              selectedDate.day === day;
            
            return (
              <motion.div
                key={day}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  onSelectDate?.({
                    year: currentYear,
                    month: currentMonth,
                    day,
                  })
                }
                className={`
                  relative text-center p-2 rounded-xl cursor-pointer transition-all group
                  ${isToday(day) 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold shadow-lg' 
                    : isDayHolidayOrFriday 
                      ? theme === 'dark' 
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                        : 'bg-red-50 text-red-600 hover:bg-red-100'
                      : theme === 'dark'
                        ? 'hover:bg-gray-700'
                        : 'hover:bg-gray-100'
                  }
                  ${isSelected ? 'ring-2 ring-blue-400' : ''}
                `}
              >
                <div className="relative z-10">{day}</div>
                {holiday && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl"
                  >
                    <div className="font-semibold">{holiday.name}</div>
                    {holiday.isHoliday && (
                      <div className="text-red-300 text-[10px] mt-1">تعطیل رسمی</div>
                    )}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600" />
            <span>امروز</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${theme === 'dark' ? 'bg-red-500/30' : 'bg-red-100'}`} />
            <span>تعطیل</span>
          </div>
        </div>
    </motion.div>
  );

  if (embedded) {
    return calendarCard;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center" 
      onClick={onClose}
    >
      {calendarCard}
    </motion.div>
  );
}
