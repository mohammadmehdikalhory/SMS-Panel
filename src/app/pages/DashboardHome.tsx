import { MessageSquare, BookUser, Wallet, TrendingUp, Send, Users } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router';
import { motion } from 'motion/react';

export function DashboardHome() {
  const { theme } = useTheme();

  const stats = [
    { title: 'کل پیامک‌ها', value: '1,234', icon: MessageSquare, color: 'blue', link: '/messages', gradient: 'from-blue-500 to-blue-600' },
    { title: 'مخاطبین', value: '156', icon: BookUser, color: 'purple', link: '/contacts', gradient: 'from-purple-500 to-purple-600' },
    { title: 'موجودی کیف پول', value: '650,000 تومان', icon: Wallet, color: 'green', link: '/wallet', gradient: 'from-green-500 to-green-600' },
    { title: 'پیامک امروز', value: '45', icon: Send, color: 'orange', link: '/messages', gradient: 'from-orange-500 to-orange-600' },
  ];

  const recentMessages = [
    { id: '1', recipient: '09123456789', text: 'سلام، این یک پیام تستی است', time: '14:30', status: 'sent' },
    { id: '2', recipient: '09121234567', text: 'پیام دوم برای آزمایش', time: '13:15', status: 'sent' },
    { id: '3', recipient: '09129876543', text: 'پیام سوم', time: '10:20', status: 'failed' },
  ];

  const recentActivity = [
    { id: '1', action: 'شارژ کیف پول', amount: '+500,000 تومان', time: '2 ساعت پیش' },
    { id: '2', action: 'ارسال پیامک', amount: '-25,000 تومان', time: '4 ساعت پیش' },
    { id: '3', action: 'افزودن مخاطب جدید', amount: '5 مخاطب', time: '1 روز پیش' },
  ];

  return (
    <div>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        داشبورد
      </motion.h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Link 
            key={stat.title} 
            to={stat.link}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'} p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden group`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-500/10 rounded-full blur-2xl`} />
              
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-sm opacity-70 mb-2">{stat.title}</p>
                  <p className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className={`bg-gradient-to-br ${stat.gradient} p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
          <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-xl font-bold">پیامک‌های اخیر</h2>
            <Link to="/messages" className="text-sm text-blue-500 hover:underline">
              مشاهده همه
            </Link>
          </div>
          <div className="p-4 space-y-3">
            {recentMessages.map((msg) => (
              <div key={msg.id} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{msg.recipient}</span>
                  <span className="text-sm opacity-70">{msg.time}</span>
                </div>
                <p className="text-sm opacity-80 truncate mb-2">{msg.text}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  msg.status === 'sent' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {msg.status === 'sent' ? 'ارسال شده' : 'ناموفق'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
          <div className="p-4 border-b dark:border-gray-700">
            <h2 className="text-xl font-bold">فعالیت‌های اخیر</h2>
          </div>
          <div className="p-4 space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm opacity-70">{activity.time}</p>
                </div>
                <span className={`font-semibold ${
                  activity.amount.includes('+') ? 'text-green-500' : 
                  activity.amount.includes('-') ? 'text-red-500' : 'text-blue-500'
                }`}>
                  {activity.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
          <h2 className="text-xl font-bold mb-4">نمودار ارسال پیامک</h2>
          <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded">
            <p className="text-gray-500">نمودار آماری ارسال پیامک در 7 روز گذشته</p>
          </div>
        </div>

        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
          <h2 className="text-xl font-bold mb-4">نمودار تراکنش‌ها</h2>
          <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded">
            <p className="text-gray-500">نمودار تراکنش‌های مالی</p>
          </div>
        </div>
      </div>
    </div>
  );
}