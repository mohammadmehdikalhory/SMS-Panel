import { AlertTriangle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'motion/react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }: ConfirmDialogProps) {
  const { theme } = useTheme();

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
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
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
          
          <p className="text-sm opacity-80 mb-6">{message}</p>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
            >
              خیر
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              حذف
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
