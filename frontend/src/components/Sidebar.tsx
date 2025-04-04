import React from 'react';
import { MessageSquarePlus, History } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-800 p-4 border-r">
      <button className="w-full flex items-center gap-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-4">
        <MessageSquarePlus className="w-5 h-5" />
        New Chat
      </button>

      <div className="flex items-center gap-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
        <History className="w-5 h-5" />
        Chat History
      </div>
      
      {/* Chat history list will go here */}
    </div>
  );
};

export default Sidebar;