import { X, Upload } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'motion/react';
import { useState } from 'react';

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserSettingsModal({ isOpen, onClose }: UserSettingsModalProps) {
  const { theme } = useTheme();
  const [username, setUsername] = useState('کاربر');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [logo, setLogo] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (newPassword && newPassword !== confirmPassword) {
      alert('رمز عبور جدید و تکرار آن یکسان نیستند');
      return;
    }
    alert('تغییرات با موفقیت ذخیره شد');
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
        className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-2xl w-full max-w-lg mx-4`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold">تنظیمات کاربری</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">لوگو</label>
            <div className="flex items-center gap-4">
              {logo ? (
                <img src={logo} alt="Logo" className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <div className={`w-20 h-20 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                  <Upload className="w-8 h-8 opacity-50" />
                </div>
              )}
              <div>
                <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-block">
                  انتخاب تصویر
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-xs opacity-70 mt-2">فرمت: JPG, PNG | حداکثر: 2MB</p>
              </div>
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-2">نام کاربری</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-gray-50 border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          {/* Password Section */}
          <div className="pt-4 border-t dark:border-gray-700">
            <h3 className="text-lg font-bold mb-4">تغییر رمز عبور</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">رمز عبور فعلی</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-gray-50 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="رمز عبور فعلی"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">رمز عبور جدید</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-gray-50 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="رمز عبور جدید"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">تکرار رمز عبور جدید</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-gray-50 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="تکرار رمز عبور جدید"
                />
              </div>
            </div>
          </div>
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
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            ذخیره تغییرات
          </button>
        </div>
      </motion.div>
    </div>
  );
}
