import { X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'motion/react';
import { useState } from 'react';

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
        <div className="p-4 space-y-6 max-h-96 overflow-y-auto">
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
                <input
                  type="text"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  placeholder="1405/11/01"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-gray-50 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className="block text-xs opacity-70 mb-1">تا تاریخ</label>
                <input
                  type="text"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  placeholder="1405/11/30"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-gray-50 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
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
