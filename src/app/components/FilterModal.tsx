import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'motion/react';
import { useState } from 'react';
import jalaali from 'jalaali-js';
import { getPersianMonthName } from '../utils/jalali';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  status: string[];
  numbers: string[];
  dateFrom: string;
  dateTo: string;
}

const mockPanelNumbers = [
  '30001234567',
  '30007654321',
  '30009876543',
];

export function FilterModal({ isOpen, onClose, onApply }: FilterModalProps) {
  const { theme } = useTheme();
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);
  const todayJalali = jalaali.toJalaali(new Date());
  const [fromMonth, setFromMonth] = useState(todayJalali.jm);
  const [fromYear, setFromYear] = useState(todayJalali.jy);
  const [toMonth, setToMonth] = useState(todayJalali.jm);
  const [toYear, setToYear] = useState(todayJalali.jy);

  if (!isOpen) return null;

  const toggleStatus = (status: string) => {
    setSelectedStatus(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const toggleNumber = (number: string) => {
    setSelectedNumbers(prev => 
      prev.includes(number) 
        ? prev.filter(n => n !== number)
        : [...prev, number]
    );
  };

  const handleApply = () => {
    onApply({
      status: selectedStatus,
      numbers: selectedNumbers,
      dateFrom,
      dateTo
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedStatus([]);
    setSelectedNumbers([]);
    setDateFrom('');
    setDateTo('');
  };

  const closeCalendars = () => {
    setShowFromCalendar(false);
    setShowToCalendar(false);
  };

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

  const buildCalendar = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: (firstDay + 1) % 7 }, (_, i) => i);
    return { days, emptyDays };
  };

  const formatJalali = (year: number, month: number, day: number) => {
    return `${year}/${month.toString().padStart(2, '0')}/${day
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-2xl w-full max-w-md mx-4`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold">فیلتر پیامک‌ها</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-6 max-h-96 overflow-y-auto" onClick={closeCalendars}>
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium mb-3">وضعیت</label>
            <div className="space-y-2">
              {['sent', 'failed', 'pending'].map((status) => (
                <label 
                  key={status}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedStatus.includes(status)}
                    onChange={() => toggleStatus(status)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span>
                    {status === 'sent' ? 'ارسال شده' : status === 'failed' ? 'ناموفق' : 'در انتظار'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Numbers Filter */}
          <div>
            <label className="block text-sm font-medium mb-3">سرشماره‌ها</label>
            <div className="space-y-2">
              {mockPanelNumbers.map((number) => (
                <label 
                  key={number}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedNumbers.includes(number)}
                    onChange={() => toggleNumber(number)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="font-mono">{number}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-sm font-medium mb-3">بازه زمانی</label>
            <div className="space-y-3">
              <div>
                <label className="block text-xs opacity-70 mb-1">از تاریخ</label>
                <div className="relative">
                  <input
                    type="text"
                    value={dateFrom}
                    placeholder="1405/11/01"
                    readOnly
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFromCalendar(!showFromCalendar);
                      setShowToCalendar(false);
                    }}
                    className={`w-full px-3 py-2 rounded-lg border cursor-pointer ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-gray-50 border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {showFromCalendar && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className={`absolute top-full left-0 right-0 mt-2 p-3 rounded-lg shadow-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} z-20`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <button
                          onClick={() => {
                            if (fromMonth === 1) {
                              setFromMonth(12);
                              setFromYear(fromYear - 1);
                            } else {
                              setFromMonth(fromMonth - 1);
                            }
                          }}
                          className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <div className="text-sm font-medium">
                          {getPersianMonthName(fromMonth)} {fromYear}
                        </div>
                        <button
                          onClick={() => {
                            if (fromMonth === 12) {
                              setFromMonth(1);
                              setFromYear(fromYear + 1);
                            } else {
                              setFromMonth(fromMonth + 1);
                            }
                          }}
                          className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-xs mb-2">
                        {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map((day) => (
                          <div key={day} className="text-center opacity-70">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {buildCalendar(fromYear, fromMonth).emptyDays.map((_, i) => (
                          <div key={`from-empty-${i}`} />
                        ))}
                        {buildCalendar(fromYear, fromMonth).days.map((day) => (
                          <button
                            key={`from-day-${day}`}
                            onClick={() => {
                              setDateFrom(formatJalali(fromYear, fromMonth, day));
                              closeCalendars();
                            }}
                            className={`text-xs p-1 rounded ${
                              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                            }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-xs opacity-70 mb-1">تا تاریخ</label>
                <div className="relative">
                  <input
                    type="text"
                    value={dateTo}
                    placeholder="1405/11/30"
                    readOnly
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowToCalendar(!showToCalendar);
                      setShowFromCalendar(false);
                    }}
                    className={`w-full px-3 py-2 rounded-lg border cursor-pointer ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-gray-50 border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {showToCalendar && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className={`absolute top-full left-0 right-0 mt-2 p-3 rounded-lg shadow-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} z-20`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <button
                          onClick={() => {
                            if (toMonth === 1) {
                              setToMonth(12);
                              setToYear(toYear - 1);
                            } else {
                              setToMonth(toMonth - 1);
                            }
                          }}
                          className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <div className="text-sm font-medium">
                          {getPersianMonthName(toMonth)} {toYear}
                        </div>
                        <button
                          onClick={() => {
                            if (toMonth === 12) {
                              setToMonth(1);
                              setToYear(toYear + 1);
                            } else {
                              setToMonth(toMonth + 1);
                            }
                          }}
                          className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-xs mb-2">
                        {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map((day) => (
                          <div key={day} className="text-center opacity-70">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {buildCalendar(toYear, toMonth).emptyDays.map((_, i) => (
                          <div key={`to-empty-${i}`} />
                        ))}
                        {buildCalendar(toYear, toMonth).days.map((day) => (
                          <button
                            key={`to-day-${day}`}
                            onClick={() => {
                              setDateTo(formatJalali(toYear, toMonth, day));
                              closeCalendars();
                            }}
                            className={`text-xs p-1 rounded ${
                              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                            }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t dark:border-gray-700 flex justify-between gap-2">
          <button
            onClick={handleReset}
            className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
          >
            پاک کردن فیلترها
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
            >
              انصراف
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              اعمال فیلتر
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
