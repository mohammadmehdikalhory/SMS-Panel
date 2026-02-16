import { X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'motion/react';
import { useState } from 'react';

interface ColumnSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableColumns: { key: string; label: string }[];
  selectedColumns: string[];
  onApply: (columns: string[]) => void;
}

export function ColumnSelectorModal({ 
  isOpen, 
  onClose, 
  availableColumns,
  selectedColumns: initialSelected,
  onApply 
}: ColumnSelectorModalProps) {
  const { theme } = useTheme();
  const [selectedColumns, setSelectedColumns] = useState<string[]>(initialSelected);

  if (!isOpen) return null;

  const toggleColumn = (columnKey: string) => {
    setSelectedColumns(prev => 
      prev.includes(columnKey) 
        ? prev.filter(c => c !== columnKey)
        : [...prev, columnKey]
    );
  };

  const handleApply = () => {
    onApply(selectedColumns);
    onClose();
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
          <h2 className="text-xl font-bold">انتخاب ستون‌ها</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
          {availableColumns.map((column) => (
            <label 
              key={column.key}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedColumns.includes(column.key)}
                onChange={() => toggleColumn(column.key)}
                className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span className="font-medium">{column.label}</span>
            </label>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t dark:border-gray-700 flex justify-end gap-2">
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
            اعمال تغییرات
          </button>
        </div>
      </motion.div>
    </div>
  );
}
