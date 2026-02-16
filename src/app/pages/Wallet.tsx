import { CreditCard, TrendingUp, TrendingDown, Plus, Download, ArrowLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router';
import { motion } from 'motion/react';

const mockTransactions = [
  { id: '1', type: 'charge', amount: 500000, date: '1405/11/26', time: '14:30', description: 'شارژ کیف پول' },
  { id: '2', type: 'send', amount: -50000, date: '1405/11/26', time: '13:15', description: 'ارسال 100 پیامک' },
  { id: '3', type: 'send', amount: -25000, date: '1405/11/25', time: '10:20', description: 'ارسال 50 پیامک' },
  { id: '4', type: 'charge', amount: 300000, date: '1405/11/24', time: '16:00', description: 'شارژ کیف پول' },
  { id: '5', type: 'send', amount: -75000, date: '1405/11/24', time: '09:45', description: 'ارسال 150 پیامک' },
];

export function Wallet() {
  const { theme } = useTheme();
  const balance = 650000;
  const smsCount = Math.floor(balance / 500);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fa-IR').format(Math.abs(num));
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link to="/dashboard">
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} transition-all shadow-md`}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
        </Link>
        <h1 className="text-3xl font-bold">کیف پول</h1>
      </div>

      {/* Balance Card */}
      <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-blue-600 to-blue-800' : 'bg-gradient-to-br from-blue-500 to-blue-700'} text-white p-8 rounded-lg shadow-lg mb-6`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm opacity-80 mb-2">موجودی کیف پول</p>
            <h2 className="text-4xl font-bold">{formatNumber(balance)} تومان</h2>
            <p className="text-sm opacity-80 mt-2">{formatNumber(smsCount)} پیامک</p>
          </div>
          <CreditCard className="w-16 h-16 opacity-80" />
        </div>
        
        <div className="flex gap-4">
          <button className="flex-1 bg-white text-blue-600 px-4 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            شارژ کیف پول
          </button>
          <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-3 rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            دریافت گزارش
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-70 mb-1">مجموع شارژ</div>
              <div className="text-2xl font-bold text-green-500">
                {formatNumber(800000)} تومان
              </div>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-70 mb-1">مجموع هزینه</div>
              <div className="text-2xl font-bold text-red-500">
                {formatNumber(150000)} تومان
              </div>
            </div>
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
              <TrendingDown className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </div>

        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-70 mb-1">تعداد تراکنش</div>
              <div className="text-2xl font-bold text-blue-500">
                {mockTransactions.length}
              </div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <CreditCard className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-hidden`}>
        <div className="px-6 py-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold">تراکنش های اخیر</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold">نوع تراکنش</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">مبلغ</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">تاریخ</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">ساعت</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">توضیحات</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {mockTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      transaction.type === 'charge' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {transaction.type === 'charge' ? 'شارژ' : 'برداشت'}
                    </span>
                  </td>
                  <td className={`px-6 py-4 font-bold ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {transaction.amount > 0 ? '+' : ''}{formatNumber(transaction.amount)} تومان
                  </td>
                  <td className="px-6 py-4">{transaction.date}</td>
                  <td className="px-6 py-4">{transaction.time}</td>
                  <td className="px-6 py-4">{transaction.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}