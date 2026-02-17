import { useState } from 'react';
import { Search, Filter, Send, Settings, X, ArrowLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { FilterModal, FilterOptions } from '../components/FilterModal';
import { ColumnSelectorModal } from '../components/ColumnSelectorModal';
import { Link } from 'react-router';
import { motion } from 'motion/react';

const mockMessages = [
  { id: '1', recipient: '09123456789', sender: '30001234567', text: 'سلام، این یک پیام تستی است', date: '1405/11/26', time: '14:30', status: 'sent' },
  { id: '2', recipient: '09121234567', sender: '30007654321', text: 'پیام دوم برای آزمایش', date: '1405/11/26', time: '13:15', status: 'sent' },
  { id: '3', recipient: '09129876543', sender: '30001234567', text: 'پیام سوم', date: '1405/11/25', time: '10:20', status: 'failed' },
  { id: '4', recipient: '09127654321', sender: '30009876543', text: 'پیام چهارم برای تست سیستم پیامکی', date: '1405/11/25', time: '09:45', status: 'sent' },
  { id: '5', recipient: '09125556789', sender: '30001234567', text: 'پیام پنجم', date: '1405/11/24', time: '16:00', status: 'sent' },
];

const availableColumns = [
  { key: 'recipient', label: 'شماره گیرنده' },
  { key: 'sender', label: 'شماره فرستنده' },
  { key: 'text', label: 'متن پیام' },
  { key: 'date', label: 'تاریخ' },
  { key: 'time', label: 'ساعت' },
  { key: 'status', label: 'وضعیت' },
];

export function Messages() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>(['recipient', 'text', 'date', 'time', 'status']);
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    numbers: [],
    dateFrom: '',
    dateTo: ''
  });
  const [inlineSender, setInlineSender] = useState('');
  const [inlineRecipient, setInlineRecipient] = useState('');
  const [inlineText, setInlineText] = useState('');

  const applyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      status: [],
      numbers: [],
      dateFrom: '',
      dateTo: ''
    });
  };

  const applyColumns = (columns: string[]) => {
    setSelectedColumns(columns);
  };

  const hasActiveFilters = filters.status.length > 0 || filters.numbers.length > 0 || filters.dateFrom || filters.dateTo;

  const filteredMessages = mockMessages.filter(msg => {
    const matchesSearch = msg.recipient.includes(searchTerm) || msg.text.includes(searchTerm);
    const matchesStatus = filters.status.length === 0 || filters.status.includes(msg.status);
    const matchesNumber = filters.numbers.length === 0 || filters.numbers.includes(msg.sender);
    
    return matchesSearch && matchesStatus && matchesNumber;
  });

  const getColumnLabel = (key: string) => {
    return availableColumns.find(col => col.key === key)?.label || '';
  };

  const handleInlineSend = () => {
    if (!inlineSender || !inlineRecipient || !inlineText) {
      return;
    }
    setInlineSender('');
    setInlineRecipient('');
    setInlineText('');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} transition-all shadow-md`}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          </Link>
          <h1 className="text-3xl font-bold">پیامک ها</h1>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-white'} p-6 rounded-2xl shadow-lg mb-6`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">ارسال پیامک</h2>
          <button
            onClick={handleInlineSend}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            ارسال
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">شماره فرستنده</label>
            <input
              type="text"
              value={inlineSender}
              onChange={(e) => setInlineSender(e.target.value)}
              placeholder="30001234567"
              className={`w-full px-4 py-2 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-gray-50 border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">شماره گیرنده</label>
            <input
              type="text"
              value={inlineRecipient}
              onChange={(e) => setInlineRecipient(e.target.value)}
              placeholder="09123456789"
              className={`w-full px-4 py-2 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-gray-50 border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">متن پیام</label>
          <textarea
            value={inlineText}
            onChange={(e) => setInlineText(e.target.value)}
            placeholder="متن پیام را وارد کنید..."
            rows={4}
            className={`w-full px-4 py-2 rounded-lg border resize-none ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-gray-50 border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
      </motion.div>

      {/* Statistics - Moved to top */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div 
          whileHover={{ y: -5 }}
          className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'} p-6 rounded-2xl shadow-lg relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="text-3xl font-bold text-blue-500">{filteredMessages.length}</div>
            <div className="text-sm opacity-70 mt-1">کل پیامک ها</div>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'} p-6 rounded-2xl shadow-lg relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="text-3xl font-bold text-green-500">
              {filteredMessages.filter(m => m.status === 'sent').length}
            </div>
            <div className="text-sm opacity-70 mt-1">ارسال موفق</div>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'} p-6 rounded-2xl shadow-lg relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="text-3xl font-bold text-red-500">
              {filteredMessages.filter(m => m.status === 'failed').length}
            </div>
            <div className="text-sm opacity-70 mt-1">ارسال ناموفق</div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو در پیامک ها..."
            className={`w-full pr-10 pl-4 py-3 rounded-xl border ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
          />
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilterModal(true)}
          className={`px-5 py-3 rounded-xl border ${
            hasActiveFilters ? 'bg-blue-500 text-white border-blue-500' : theme === 'dark' 
              ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
              : 'bg-white border-gray-300 hover:bg-gray-50'
          } transition-all flex items-center gap-2 shadow-md relative`}
        >
          <Filter className="w-5 h-5" />
          فیلتر
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {filters.status.length + filters.numbers.length}
            </span>
          )}
        </motion.button>

        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilters}
            className="px-5 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all flex items-center gap-2 shadow-md"
          >
            <X className="w-5 h-5" />
            حذف فیلترها
          </motion.button>
        )}
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowColumnSelector(true)}
          className={`px-5 py-3 rounded-xl border ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
              : 'bg-white border-gray-300 hover:bg-gray-50'
          } transition-all flex items-center gap-2 shadow-md`}
        >
          <Settings className="w-5 h-5" />
          ستون‌ها
        </motion.button>
      </div>

      {/* Messages List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'} backdrop-blur-sm`}>
              <tr>
                {selectedColumns.map(colKey => (
                  <th key={colKey} className="px-6 py-4 text-right text-sm font-semibold">
                    {getColumnLabel(colKey)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {filteredMessages.map((message, index) => (
                <motion.tr 
                  key={message.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all"
                >
                  {selectedColumns.includes('recipient') && (
                    <td className="px-6 py-4 font-mono">{message.recipient}</td>
                  )}
                  {selectedColumns.includes('sender') && (
                    <td className="px-6 py-4 font-mono text-sm">{message.sender}</td>
                  )}
                  {selectedColumns.includes('text') && (
                    <td className="px-6 py-4 max-w-md truncate">{message.text}</td>
                  )}
                  {selectedColumns.includes('date') && (
                    <td className="px-6 py-4">{message.date}</td>
                  )}
                  {selectedColumns.includes('time') && (
                    <td className="px-6 py-4 font-mono">{message.time}</td>
                  )}
                  {selectedColumns.includes('status') && (
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        message.status === 'sent' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {message.status === 'sent' ? 'ارسال شده' : 'ناموفق'}
                      </span>
                    </td>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMessages.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Send className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p>پیامی یافت نشد</p>
          </div>
        )}
      </motion.div>

      <FilterModal 
        isOpen={showFilterModal} 
        onClose={() => setShowFilterModal(false)} 
        onApply={applyFilters}
      />
      
      <ColumnSelectorModal
        isOpen={showColumnSelector}
        onClose={() => setShowColumnSelector(false)}
        availableColumns={availableColumns}
        selectedColumns={selectedColumns}
        onApply={applyColumns}
      />
    </div>
  );
}
