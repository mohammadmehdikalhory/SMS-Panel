import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, UserPlus, Users as UsersIcon, ArrowLeft } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { EditContactModal } from '../components/EditContactModal';
import { AddContactModal } from '../components/AddContactModal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Link } from 'react-router';
import { motion } from 'motion/react';

interface Contact {
  id: string;
  name: string;
  number: string;
  groups: string[];
  description?: string;
}

const initialContacts: Contact[] = [
  { id: '1', name: 'علی احمدی', number: '09123456789', groups: ['دوستان'], description: 'دوست قدیمی' },
  { id: '2', name: 'مریم محمدی', number: '09121234567', groups: ['همکاران'], description: 'همکار بخش فروش' },
  { id: '3', name: 'رضا رضایی', number: '09129876543', groups: ['خانواده'], description: 'برادر' },
  { id: '4', name: 'فاطمه حسینی', number: '09127654321', groups: ['دوستان', 'همکاران'], description: '' },
  { id: '5', name: 'محمد کریمی', number: '09125556789', groups: ['همکاران'], description: '' },
  { id: '6', name: 'زهرا محمودی', number: '09123334444', groups: ['خانواده'], description: 'خواهر' },
];

const initialGroups = ['دوستان', 'همکاران', 'خانواده'];

export function Contacts() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [groups, setGroups] = useState<string[]>(initialGroups);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [showAddGroup, setShowAddGroup] = useState(false);

  const filteredContacts = contacts.filter(contact => 
    contact.name.includes(searchTerm) || 
    contact.number.includes(searchTerm) || 
    contact.groups.some(g => g.includes(searchTerm))
  );

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };

  const handleAddContact = (newContact: { name: string; number: string; groups: string[]; description: string }) => {
    const contact: Contact = {
      id: Date.now().toString(),
      ...newContact
    };
    setContacts([...contacts, contact]);
  };

  const handleSaveContact = (updatedContact: Contact) => {
    setContacts(contacts.map(c => c.id === updatedContact.id ? updatedContact : c));
  };

  const handleDeleteClick = (contactId: string) => {
    setContactToDelete(contactId);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (contactToDelete) {
      setContacts(contacts.filter(c => c.id !== contactToDelete));
      setContactToDelete(null);
    }
  };

  const handleAddGroup = () => {
    if (newGroupName.trim() && !groups.includes(newGroupName.trim())) {
      setGroups([...groups, newGroupName.trim()]);
      setNewGroupName('');
      setShowAddGroup(false);
    }
  };

  const getContactsByGroup = (group: string) => {
    return contacts.filter(c => c.groups.includes(group)).length;
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
          <h1 className="text-3xl font-bold">دفتر شماره ها</h1>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all flex items-center gap-2 shadow-lg"
        >
          <UserPlus className="w-5 h-5" />
          مخاطب جدید
        </motion.button>
      </div>

      {/* Statistics - Moved to top */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div 
          whileHover={{ y: -5 }}
          className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'} p-6 rounded-2xl shadow-lg relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="text-3xl font-bold text-blue-500">{contacts.length}</div>
            <div className="text-sm opacity-70 mt-1">کل مخاطبین</div>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'} p-6 rounded-2xl shadow-lg relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="text-3xl font-bold text-purple-500">{groups.length}</div>
            <div className="text-sm opacity-70 mt-1">گروه ها</div>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'} p-6 rounded-2xl shadow-lg relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="text-3xl font-bold text-green-500">100%</div>
            <div className="text-sm opacity-70 mt-1">دسته بندی شده</div>
          </div>
        </motion.div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو در مخاطبین..."
            className={`w-full pr-10 pl-4 py-3 rounded-xl border ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-md`}
          />
        </div>
      </div>

      {/* Groups Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <UsersIcon className="w-5 h-5 text-blue-500" />
            گروه‌ها
          </h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddGroup(!showAddGroup)}
            className="text-sm text-blue-500 hover:underline flex items-center gap-1 font-medium"
          >
            <Plus className="w-4 h-4" />
            گروه جدید
          </motion.button>
        </div>

        {showAddGroup && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-4 rounded-xl shadow-lg mb-4`}
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="نام گروه جدید..."
                className={`flex-1 px-3 py-2 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600' 
                    : 'bg-gray-50 border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                onKeyPress={(e) => e.key === 'Enter' && handleAddGroup()}
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddGroup}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                افزودن
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowAddGroup(false);
                  setNewGroupName('');
                }}
                className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
              >
                انصراف
              </motion.button>
            </div>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-white'} p-5 rounded-2xl shadow-lg`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {groups.map((group, index) => (
              <motion.div 
                key={group}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100'} cursor-pointer transition-all text-center shadow-md`}
              >
                <div className="font-bold mb-1">{group}</div>
                <div className="text-sm opacity-70">{getContactsByGroup(group)} نفر</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Contacts Section */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-blue-500" />
          مخاطبین
        </h2>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts.map((contact, index) => (
          <motion.div 
            key={contact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'} p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden`}
            onClick={() => handleEditContact(contact)}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl" />
            
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {contact.name.charAt(0)}
              </div>
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEditContact(contact)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-blue-500" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeleteClick(contact.id)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </motion.button>
              </div>
            </div>
            
            <h3 className="font-bold text-lg mb-2 relative z-10">{contact.name}</h3>
            <p className="text-blue-500 mb-3 font-mono relative z-10">{contact.number}</p>
            
            {contact.description && (
              <p className="text-sm opacity-70 mb-3 relative z-10">{contact.description}</p>
            )}
            
            <div className="flex flex-wrap gap-2 relative z-10">
              {contact.groups.map((group, i) => (
                <motion.span 
                  key={group}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700'
                  }`}
                >
                  {group}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-12 text-center text-gray-500`}
        >
          <UsersIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p>مخاطبی یافت نشد</p>
        </motion.div>
      )}

      <AddContactModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        availableGroups={groups}
        onAdd={handleAddContact}
      />

      <EditContactModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        contact={selectedContact}
        availableGroups={groups}
        onSave={handleSaveContact}
      />

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="حذف مخاطب"
        message="آیا از حذف این مخاطب مطمئن هستید؟"
      />
    </div>
  );
}
