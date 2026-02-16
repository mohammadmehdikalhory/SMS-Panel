import { useState } from 'react';
import { X, Plus, Send } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'motion/react';

interface QuickSendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockPanelNumbers = [
  '30001234567',
  '30007654321',
  '30009876543',
];

const mockContacts = [
  { id: '1', name: 'علی احمدی', number: '09123456789' },
  { id: '2', name: 'مریم محمدی', number: '09121234567' },
  { id: '3', name: 'رضا رضایی', number: '09129876543' },
  { id: '4', name: 'فاطمه حسینی', number: '09127654321' },
];

export function QuickSendModal({ isOpen, onClose }: QuickSendModalProps) {
  const { theme } = useTheme();
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');
  const [showSenderList, setShowSenderList] = useState(false);
  const [showContactList, setShowContactList] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    if (sender && receiver && message) {
      alert(`پیام ارسال شد!\nاز: ${sender}\nبه: ${receiver}\nمتن: ${message}`);
      onClose();
      setSender('');
      setReceiver('');
      setMessage('');
    } else {
      alert('لطفا همه فیلدها را پر کنید');
    }
  };

  const selectSender = (number: string) => {
    setSender(number);
    setShowSenderList(false);
  };

  const selectContact = (contact: typeof mockContacts[0]) => {
    setReceiver(contact.number);
    setShowContactList(false);
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
          <h2 className="text-xl font-bold">ارسال سریع پیام</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          {/* Sender */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2">فرستنده</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="شماره فرستنده را انتخاب کنید"
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-gray-50 border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                readOnly
              />
              <button
                onClick={() => setShowSenderList(!showSenderList)}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            {showSenderList && (
              <div className={`absolute top-full left-0 right-0 mt-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} z-10`}>
                {mockPanelNumbers.map((number) => (
                  <div
                    key={number}
                    onClick={() => selectSender(number)}
                    className={`px-4 py-3 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'} first:rounded-t-lg last:rounded-b-lg`}
                  >
                    {number}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Receiver */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2">گیرنده</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                placeholder="شماره را وارد کنید"
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-gray-50 border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                onClick={() => setShowContactList(!showContactList)}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {showContactList && (
              <div className={`absolute top-full left-0 right-0 mt-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} z-10 max-h-60 overflow-y-auto`}>
                {mockContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => selectContact(contact)}
                    className={`px-4 py-3 cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'} first:rounded-t-lg last:rounded-b-lg`}
                  >
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm opacity-70">{contact.number}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-2">متن پیام</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="متن پیام خود را بنویسید..."
              rows={5}
              className={`w-full px-4 py-2 rounded-lg border ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600' 
                  : 'bg-gray-50 border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
            />
            <div className="text-sm opacity-70 mt-1 text-left">
              {message.length} کاراکتر
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
            onClick={handleSend}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            ارسال
          </button>
        </div>
      </motion.div>
    </div>
  );
}
