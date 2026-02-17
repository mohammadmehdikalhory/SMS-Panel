import { useState } from "react";
import {
  Search,
  Filter,
  Send,
  Settings,
  X,
  ArrowLeft,
  Users,
  User,
  BookUser,
  CalendarClock,
  Clock,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { FilterModal, FilterOptions } from "../components/FilterModal";
import { ColumnSelectorModal } from "../components/ColumnSelectorModal";
import { ModernCalendar } from "../components/ModernCalendar";
import { Link } from "react-router";
import { motion } from "motion/react";

const mockMessages = [
  {
    id: "1",
    recipient: "09123456789",
    sender: "30001234567",
    text: "سلام، این یک پیام تستی است",
    date: "1405/11/26",
    time: "14:30",
    status: "sent",
  },
  {
    id: "2",
    recipient: "09121234567",
    sender: "30007654321",
    text: "پیام دوم برای آزمایش",
    date: "1405/11/26",
    time: "13:15",
    status: "sent",
  },
  {
    id: "3",
    recipient: "09129876543",
    sender: "30001234567",
    text: "پیام سوم",
    date: "1405/11/25",
    time: "10:20",
    status: "failed",
  },
  {
    id: "4",
    recipient: "09127654321",
    sender: "30009876543",
    text: "پیام چهارم برای تست سیستم پیامکی",
    date: "1405/11/25",
    time: "09:45",
    status: "sent",
  },
  {
    id: "5",
    recipient: "09125556789",
    sender: "30001234567",
    text: "پیام پنجم",
    date: "1405/11/24",
    time: "16:00",
    status: "sent",
  },
];

const availableColumns = [
  { key: "recipient", label: "شماره گیرنده" },
  { key: "sender", label: "شماره فرستنده" },
  { key: "text", label: "متن پیام" },
  { key: "date", label: "تاریخ" },
  { key: "time", label: "ساعت" },
  { key: "status", label: "وضعیت" },
];

const mockSenderNumbers = ["30001234567", "30007654321", "30009876543"];

const mockContacts = [
  { id: "c1", name: "مریم محمدی", number: "09121234567" },
  { id: "c2", name: "فاطمه حسینی", number: "09129876543" },
  { id: "c3", name: "علی احمدی", number: "09123456789" },
];

const mockGroups = [
  { id: "g1", name: "دوستان" },
  { id: "g2", name: "همکاران" },
  { id: "g3", name: "خانواده" },
];

export function Messages() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "recipient",
    "text",
    "date",
    "time",
    "status",
  ]);
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    numbers: [],
    dateFrom: "",
    dateTo: "",
  });
  const [inlineSender, setInlineSender] = useState("");
  const [inlineRecipient, setInlineRecipient] = useState("");
  const [inlineText, setInlineText] = useState("");
  const [showSenderList, setShowSenderList] = useState(false);
  const [showContactList, setShowContactList] = useState(false);
  const [showGroupList, setShowGroupList] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<typeof mockContacts>(
    [],
  );
  const [selectedGroups, setSelectedGroups] = useState<typeof mockGroups>([]);
  const [manualRecipients, setManualRecipients] = useState<string[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<{
    year: number;
    month: number;
    day: number;
  } | null>(null);
  const [scheduleTime, setScheduleTime] = useState("");

  const applyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      status: [],
      numbers: [],
      dateFrom: "",
      dateTo: "",
    });
  };

  const applyColumns = (columns: string[]) => {
    setSelectedColumns(columns);
  };

  const hasActiveFilters =
    filters.status.length > 0 ||
    filters.numbers.length > 0 ||
    filters.dateFrom ||
    filters.dateTo;

  const filteredMessages = mockMessages.filter((msg) => {
    const matchesSearch =
      msg.recipient.includes(searchTerm) || msg.text.includes(searchTerm);
    const matchesStatus =
      filters.status.length === 0 || filters.status.includes(msg.status);
    const matchesNumber =
      filters.numbers.length === 0 || filters.numbers.includes(msg.sender);

    return matchesSearch && matchesStatus && matchesNumber;
  });

  const getColumnLabel = (key: string) => {
    return availableColumns.find((col) => col.key === key)?.label || "";
  };

  const handleInlineSend = () => {
    const recipientsCount =
      manualRecipients.length + selectedContacts.length + selectedGroups.length;
    if (!inlineSender || !inlineText || recipientsCount === 0) {
      return;
    }
    setInlineSender("");
    setInlineRecipient("");
    setInlineText("");
    setManualRecipients([]);
    setSelectedContacts([]);
    setSelectedGroups([]);
    setScheduleDate(null);
    setScheduleTime("");
  };

  const closeInlineLists = () => {
    setShowSenderList(false);
    setShowContactList(false);
    setShowGroupList(false);
  };

  const applySchedule = () => {
    if (!scheduleDate || !scheduleTime) return;
    setShowScheduleModal(false);
  };

  const clearSchedule = () => {
    setScheduleDate(null);
    setScheduleTime("");
    setShowScheduleModal(false);
  };

  const toPersianNumber = (value: string) => {
    return value.replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
  };

  const formatScheduleDate = (date: {
    year: number;
    month: number;
    day: number;
  }) => {
    const formatted = `${date.year}/${date.month.toString().padStart(2, "0")}/${date.day.toString().padStart(2, "0")}`;
    return toPersianNumber(formatted);
  };

  const addManualRecipient = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (!manualRecipients.includes(trimmed)) {
      setManualRecipients([...manualRecipients, trimmed]);
    }
  };

  const removeManualRecipient = (value: string) => {
    setManualRecipients(manualRecipients.filter((item) => item !== value));
  };

  const selectContact = (contact: (typeof mockContacts)[0]) => {
    if (!selectedContacts.find((c) => c.id === contact.id)) {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const removeContact = (contactId: string) => {
    setSelectedContacts(selectedContacts.filter((c) => c.id !== contactId));
  };

  const toggleGroup = (group: (typeof mockGroups)[0]) => {
    if (selectedGroups.find((g) => g.id === group.id)) {
      setSelectedGroups(selectedGroups.filter((g) => g.id !== group.id));
    } else {
      setSelectedGroups([...selectedGroups, group]);
    }
  };

  return (
    <div onClick={closeInlineLists}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-xl ${theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-100"} transition-all shadow-md`}
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
        className={`${theme === "dark" ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-white"} p-6 rounded-2xl shadow-lg mb-6`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">ارسال پیامک</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowScheduleModal(true);
              }}
              className={`p-2 rounded-lg border ${
                theme === "dark"
                  ? "border-gray-700 bg-gray-800 hover:bg-gray-700"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              } transition-colors`}
              aria-label="زمان بندی پیام"
            >
              <CalendarClock className="w-4 h-4" />
            </button>
            <button
              onClick={handleInlineSend}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              ارسال
            </button>
          </div>
        </div>
        {scheduleDate && scheduleTime && (
          <div
            className={`mb-4 flex items-center justify-between gap-3 text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <div className="flex items-center gap-2">
              <CalendarClock className="w-4 h-4" />
              <span>
                ارسال زمان‌بندی‌شده: {formatScheduleDate(scheduleDate)}{" "}
                {toPersianNumber(scheduleTime)}
              </span>
            </div>
            <button
              onClick={clearSchedule}
              className={`px-3 py-1 rounded-lg text-xs border ${
                theme === "dark"
                  ? "border-gray-700 hover:bg-gray-800"
                  : "border-gray-300 hover:bg-gray-100"
              } transition-colors`}
            >
              حذف زمان‌بندی
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">سر شماره</label>
            <div className="relative">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inlineSender}
                  placeholder="30001234567"
                  readOnly
                  className={`flex-1 px-4 py-2 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-gray-50 border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSenderList(!showSenderList);
                    setShowContactList(false);
                    setShowGroupList(false);
                  }}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  aria-label="انتخاب سر شماره"
                >
                  <BookUser className="w-5 h-5" />
                </button>
              </div>
              {showSenderList && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute top-full left-0 right-0 mt-2 rounded-lg shadow-lg border ${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"} z-20`}
                >
                  {mockSenderNumbers.map((number) => (
                    <div
                      key={number}
                      onClick={() => {
                        setInlineSender(number);
                        closeInlineLists();
                      }}
                      className={`px-4 py-3 cursor-pointer ${theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-100"} first:rounded-t-lg last:rounded-b-lg`}
                    >
                      {number}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              گروه گیرنده / گیرنده
            </label>
            <div className="relative">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inlineRecipient}
                  onChange={(e) => setInlineRecipient(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addManualRecipient(inlineRecipient);
                      setInlineRecipient("");
                    }
                  }}
                  placeholder="شماره را وارد کنید و Enter بزنید"
                  className={`flex-1 px-4 py-2 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-gray-50 border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowContactList(!showContactList);
                    setShowSenderList(false);
                    setShowGroupList(false);
                  }}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  aria-label="انتخاب مخاطب"
                >
                  <User className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowGroupList(!showGroupList);
                    setShowSenderList(false);
                    setShowContactList(false);
                  }}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  aria-label="انتخاب گروه"
                >
                  <Users className="w-5 h-5" />
                </button>
              </div>
              {(manualRecipients.length > 0 ||
                selectedContacts.length > 0 ||
                selectedGroups.length > 0) && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {manualRecipients.map((item) => (
                    <div
                      key={item}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                        theme === "dark"
                          ? "bg-gray-700 text-white"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      {item}
                      <button
                        onClick={() => removeManualRecipient(item)}
                        className="text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {selectedContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                        theme === "dark"
                          ? "bg-gray-700 text-white"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      {contact.name}
                      <button
                        onClick={() => removeContact(contact.id)}
                        className="text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {selectedGroups.map((group) => (
                    <div
                      key={group.id}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                        theme === "dark"
                          ? "bg-gray-700 text-white"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      {group.name}
                      <button
                        onClick={() => toggleGroup(group)}
                        className="text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {showContactList && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute top-full left-0 right-0 mt-2 rounded-lg shadow-lg border ${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"} z-20 max-h-60 overflow-y-auto`}
                >
                  {mockContacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => {
                        selectContact(contact);
                        closeInlineLists();
                      }}
                      className={`px-4 py-3 cursor-pointer ${theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-100"} first:rounded-t-lg last:rounded-b-lg`}
                    >
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm opacity-70">{contact.number}</div>
                    </div>
                  ))}
                </div>
              )}
              {showGroupList && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute top-full left-0 right-0 mt-2 rounded-lg shadow-lg border ${theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"} z-20`}
                >
                  {mockGroups.map((group) => (
                    <button
                      key={group.id}
                      onClick={() => {
                        toggleGroup(group);
                        closeInlineLists();
                      }}
                      className={`w-full text-right px-4 py-3 ${
                        theme === "dark"
                          ? "hover:bg-gray-600"
                          : "hover:bg-gray-100"
                      } ${
                        selectedGroups.find((g) => g.id === group.id)
                          ? "font-bold text-blue-500"
                          : ""
                      }`}
                    >
                      {group.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-50 border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
      </motion.div>
      {showScheduleModal && (
        <div
          onClick={() => setShowScheduleModal(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-3xl rounded-2xl p-6 shadow-xl ${
              theme === "dark" ? "bg-gray-900 text-white" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">زمان‌بندی ارسال</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className={`p-2 rounded-lg ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-100 hover:bg-gray-200"
                } transition-colors`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-4 mb-6 items-start">
              <ModernCalendar
                embedded
                selectedDate={scheduleDate}
                onSelectDate={setScheduleDate}
              />
              <div className="flex flex-col gap-4">
                <div
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {scheduleDate
                    ? `تاریخ انتخاب‌شده: ${formatScheduleDate(scheduleDate)}`
                    : "تاریخ انتخاب نشده"}
                </div>
                <div
                  className={`rounded-xl border p-4 ${
                    theme === "dark"
                      ? "border-gray-800 bg-gray-900/60"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-medium">ساعت</div>
                    <div
                      className={`text-xs ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {scheduleTime
                        ? `ساعت انتخاب‌شده: ${toPersianNumber(scheduleTime)}`
                        : "ساعت انتخاب نشده"}
                    </div>
                  </div>
                  <div className="relative">
                    <Clock
                      className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <input
                      type="time"
                      lang="fa-IR"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className={`w-full pl-9 pr-4 py-2 rounded-lg border ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700 text-white"
                          : "bg-white border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={clearSchedule}
                className={`px-4 py-2 rounded-lg border ${
                  theme === "dark"
                    ? "border-gray-700 hover:bg-gray-800"
                    : "border-gray-300 hover:bg-gray-100"
                } transition-colors`}
              >
                حذف زمان‌بندی
              </button>
              <button
                onClick={applySchedule}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                ثبت زمان‌بندی
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics - Moved to top */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          whileHover={{ y: -5 }}
          className={`${theme === "dark" ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-white to-gray-50"} p-6 rounded-2xl shadow-lg relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="text-3xl font-bold text-blue-500">
              {filteredMessages.length}
            </div>
            <div className="text-sm opacity-70 mt-1">کل پیامک ها</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className={`${theme === "dark" ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-white to-gray-50"} p-6 rounded-2xl shadow-lg relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="text-3xl font-bold text-green-500">
              {filteredMessages.filter((m) => m.status === "sent").length}
            </div>
            <div className="text-sm opacity-70 mt-1">ارسال موفق</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className={`${theme === "dark" ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-white to-gray-50"} p-6 rounded-2xl shadow-lg relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="text-3xl font-bold text-red-500">
              {filteredMessages.filter((m) => m.status === "failed").length}
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
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilterModal(true)}
          className={`px-5 py-3 rounded-xl border ${
            hasActiveFilters
              ? "bg-blue-500 text-white border-blue-500"
              : theme === "dark"
                ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                : "bg-white border-gray-300 hover:bg-gray-50"
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
            theme === "dark"
              ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
              : "bg-white border-gray-300 hover:bg-gray-50"
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
        className={`${theme === "dark" ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-white"} rounded-2xl shadow-lg overflow-hidden`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              className={`${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"} backdrop-blur-sm`}
            >
              <tr>
                {selectedColumns.map((colKey) => (
                  <th
                    key={colKey}
                    className="px-6 py-4 text-right text-sm font-semibold"
                  >
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
                  {selectedColumns.includes("recipient") && (
                    <td className="px-6 py-4 font-mono">{message.recipient}</td>
                  )}
                  {selectedColumns.includes("sender") && (
                    <td className="px-6 py-4 font-mono text-sm">
                      {message.sender}
                    </td>
                  )}
                  {selectedColumns.includes("text") && (
                    <td className="px-6 py-4 max-w-md truncate">
                      {message.text}
                    </td>
                  )}
                  {selectedColumns.includes("date") && (
                    <td className="px-6 py-4">{message.date}</td>
                  )}
                  {selectedColumns.includes("time") && (
                    <td className="px-6 py-4 font-mono">{message.time}</td>
                  )}
                  {selectedColumns.includes("status") && (
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          message.status === "sent"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {message.status === "sent" ? "ارسال شده" : "ناموفق"}
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
