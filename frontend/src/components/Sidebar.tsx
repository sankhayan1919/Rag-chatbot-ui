import React, { useState } from 'react';
import { MessageSquarePlus, History, ChevronDown, ChevronUp } from 'lucide-react';

interface Chat {
  id: string;
  title: string;
  timestamp: string;
}

const Sidebar = () => {
  const [showHistory, setShowHistory] = useState(false);
  
  // Mock data for recent chats - replace with actual data from your backend
  const recentChats: Chat[] = [
    { id: '1', title: 'Project Discussion', timestamp: '2 hours ago' },
    { id: '2', title: 'Code Review', timestamp: '5 hours ago' },
    { id: '3', title: 'Bug Analysis', timestamp: '1 day ago' },
    { id: '4', title: 'Feature Planning', timestamp: '2 days ago' },
    { id: '5', title: 'Team Meeting', timestamp: '3 days ago' },
    { id: '6', title: 'Documentation Review', timestamp: '4 days ago' },
    { id: '7', title: 'API Integration', timestamp: '5 days ago' },
    { id: '8', title: 'Database Design', timestamp: '1 week ago' },
    { id: '9', title: 'UI/UX Discussion', timestamp: '1 week ago' },
    { id: '10', title: 'Architecture Review', timestamp: '2 weeks ago' },
  ];

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-800 p-4 border-r">
      <button className="w-full flex items-center gap-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-4">
        <MessageSquarePlus className="w-5 h-5" />
        New Chat
      </button>

      <div 
        onClick={toggleHistory}
        className="flex items-center justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg cursor-pointer mb-2"
      >
        <div className="flex items-center gap-2">
          <History className="w-5 h-5" />
          <span>Chat History</span>
        </div>
        {showHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </div>
      
      {showHistory && (
        <div className="space-y-1">
          {recentChats.map((chat) => (
            <div
              key={chat.id}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg cursor-pointer text-sm"
            >
              <div className="font-medium truncate">{chat.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{chat.timestamp}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;