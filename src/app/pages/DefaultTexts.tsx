import { useState } from 'react';
import { Plus, Edit2, Trash2, Copy, ArrowLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router';
import { motion } from 'motion/react';

const mockDefaultTexts = [
  { id: '1', title: 'پیام خوش آمدگویی', text: 'سلام و خوش آمدید. از اینکه به ما اعتماد کردید متشکریم.', category: 'عمومی' },
  { id: '2', title: 'یادآوری وعده', text: 'یادآوری: وعده شما فردا ساعت 10 صبح می‌باشد. با تشکر', category: 'یادآوری' },
  { id: '3', title: 'تبریک تولد', text: 'تولدت مبارک! آرزوی بهترین ها را برایت داریم.', category: 'تبریک' },
  { id: '4', title: 'کد تایید', text: 'کد تایید شما: {code}. این کد تا 5 دقیقه معتبر است.', category: 'امنیتی' },
  { id: '5', title: 'اطلاع رسانی', text: 'خبر جدید: {message}. برای اطلاعات بیشتر به سایت مراجعه کنید.', category: 'اطلاع رسانی' },
];

export function DefaultTexts() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('همه');

  const categories = ['همه', ...new Set(mockDefaultTexts.map(t => t.category))];

  const filteredTexts = selectedCategory === 'همه' 
    ? mockDefaultTexts 
    : mockDefaultTexts.filter(t => t.category === selectedCategory);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('متن کپی شد');
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
          <h1 className="text-3xl font-bold">متن پیش فرض</h1>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          متن جدید
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : theme === 'dark'
                ? 'bg-gray-800 hover:bg-gray-700'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Default Texts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredTexts.map((item) => (
          <div 
            key={item.id}
            className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  {item.category}
                </span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => copyToClipboard(item.text)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-blue-500"
                  title="کپی متن"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <p className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} p-4 rounded text-sm leading-relaxed`}>
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {filteredTexts.length === 0 && (
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-12 text-center text-gray-500`}>
          متنی یافت نشد
        </div>
      )}

      {/* Info Box */}
      <div className={`${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50'} border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-6`}>
        <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-2">راهنما</h3>
        <ul className="text-sm space-y-2 opacity-80">
          <li>• از متغیرهایی مانند {'{code}'} و {'{message}'} برای شخصی‌سازی پیام استفاده کنید</li>
          <li>• متن‌های پیش فرض را می‌توانید در ارسال سریع پیام استفاده کنید</li>
          <li>• دسته‌بندی متن‌ها برای دسترسی سریع‌تر</li>
        </ul>
      </div>
    </div>
  );
}