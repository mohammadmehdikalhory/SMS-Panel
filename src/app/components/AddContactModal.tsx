import { X, Plus, Trash2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'motion/react';
import { useState } from 'react';

export function AddContactModal({ isOpen, onClose, availableGroups, onAdd }) {
  const { theme } = useTheme();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [number, setNumber] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [showGroupSelector, setShowGroupSelector] = useState(false);

  if (!isOpen) return null;

  const handleAdd = () => {
    if (!firstName.trim() || !number.trim()) {
      alert('لطفا نام و شماره تلفن را وارد کنید');
      return;
    }

    onAdd({
      name: `${firstName} ${lastName}`.trim(),
      number,
      groups: selectedGroups,
      description
    });

    setFirstName('');
    setLastName('');
    setNumber('');
    setDescription('');
    setSelectedGroups([]);
    onClose();
  };

  const addGroup = (group) => {
    if (!selectedGroups.includes(group)) {
      setSelectedGroups([...selectedGroups, group]);
    }
    setShowGroupSelector(false);
  };

  const removeGroup = (group) => {
    setSelectedGroups(selectedGroups.filter(g => g !== group));
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
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold">افزودن مخاطب جدید</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">نام</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="نام"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">نام خانوادگی</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-gray-50 border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="نام خانوادگی"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">شماره تلفن</label>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-50 border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="09123456789"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">توضیحات</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 rounded-lg border ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-gray-50 border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
              placeholder="توضیحات اضافی..."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">گروه‌ها</label>
              <button
                onClick={() => setShowGroupSelector(!showGroupSelector)}
                className="text-sm text-blue-500 hover:underline flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                افزودن به گروه
              </button>
            </div>

            {showGroupSelector && (
              <div className={`mb-3 p-3 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}>
                <div className="space-y-2">
                  {availableGroups.map((group) => (
                    <button
                      key={group}
                      onClick={() => addGroup(group)}
                      disabled={selectedGroups.includes(group)}
                      className={`block w-full text-right px-3 py-2 rounded transition-colors ${
                        selectedGroups.includes(group)
                          ? 'opacity-50 cursor-not-allowed'
                          : theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                      }`}
                    >
                      {group}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {selectedGroups.map((group) => (
                <span
                  key={group}
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                    theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {group}
                  <button
                    onClick={() => removeGroup(group)}
                    className="hover:bg-red-500 hover:text-white rounded-full p-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {selectedGroups.length === 0 && (
                <span className="text-sm opacity-50">هیچ گروهی انتخاب نشده</span>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border-t dark:border-gray-700 flex justify-end gap-2">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
          >
            انصراف
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            افزودن مخاطب
          </button>
        </div>
      </motion.div>
    </div>
  );
}
