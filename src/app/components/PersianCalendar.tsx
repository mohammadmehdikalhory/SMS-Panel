import { useState } from 'react';
import jalaali from 'jalaali-js';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getPersianMonthName, isHoliday, isFriday, getHolidayName } from '../utils/jalali';
import { useTheme } from '../contexts/ThemeContext';

interface PersianCalendarProps {
  onClose: () => void;
}

export function PersianCalendar({ onClose }: PersianCalendarProps) {
  const { theme } = useTheme();
  const today = new Date();
  const todayJalali = jalaali.toJalaali(today);
  
  const [currentMonth, setCurrentMonth] = useState(todayJalali.jm);
  const [currentYear, setCurrentYear] = useState(todayJalali.jy);

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

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: (firstDay + 1) % 7 }, (_, i) => i);

  const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

  const isToday = (day: number) => {
    return day === todayJalali.jd && currentMonth === todayJalali.jm && currentYear === todayJalali.jy;
  };

  const isDayHoliday = (day: number) => {
    const { gy, gm, gd } = jalaali.toGregorian(currentYear, currentMonth, day);
    const date = new Date(gy, gm - 1, gd);
    return isFriday(date) || isHoliday(currentYear, currentMonth, day);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center" onClick={onClose}>
      <div 
        className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-xl p-6 w-96`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <ChevronRight className="w-5 h-5" />
          </button>
          <h2 className="font-bold">
            {getPersianMonthName(currentMonth)} {currentYear}
          </h2>
          <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center font-semibold text-sm">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          {days.map((day) => {
            const holiday = isDayHoliday(day);
            const holidayName = getHolidayName(currentYear, currentMonth, day);
            
            return (
              <div
                key={day}
                className={`
                  text-center p-2 rounded cursor-pointer relative group
                  ${isToday(day) ? 'bg-blue-500 text-white font-bold' : ''}
                  ${holiday && !isToday(day) ? 'text-red-500' : ''}
                  ${!isToday(day) && !holiday ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : ''}
                `}
              >
                {day}
                {holidayName && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {holidayName}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
