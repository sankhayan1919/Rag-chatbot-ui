import React, { useState, useRef, useEffect } from 'react';
import { Moon, Sun, Send, Upload, MessageSquarePlus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import AuthButtons from './components/AuthButtons';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [message]);

  // Handle textarea auto-resize
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Add new line without extra spacing
      const cursorPosition = e.currentTarget.selectionStart;
      const textBeforeCursor = message.substring(0, cursorPosition);
      const textAfterCursor = message.substring(cursorPosition);
      setMessage(textBeforeCursor + '\n' + textAfterCursor);
      
      // Set cursor position after the new line
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = cursorPosition + 1;
          inputRef.current.selectionEnd = cursorPosition + 1;
        }
      }, 0);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-[#faf6f0]'}`}>
      <div className="flex h-screen">
        <Sidebar />
        
        <main className="flex-1 flex flex-col">
          <header className="flex justify-between items-center p-4 border-b">
            <div className="flex-1" />
            <h1 
              className="text-5xl font-bold text-center flex-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                letterSpacing: '0.05em',
                textShadow: darkMode ? '0 0 10px rgba(147, 51, 234, 0.3)' : '0 0 10px rgba(59, 130, 246, 0.3)',
                marginLeft: '-220px'
              }}
            >
              IntelliBot
            </h1>
            <div className="flex items-center gap-4 flex-1 justify-end">
              <AuthButtons />
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
            </div>
          </header>

          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-auto p-4 space-y-4"
          >
            {/* Chat messages will go here */}
          </div>

          <div className="p-4 border-t">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-2 items-start">
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 w-10 h-10 flex items-center justify-center mt-1">
                  <Upload className="w-5 h-5" />
                </button>
                <textarea
                  ref={inputRef}
                  value={message}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none min-h-[40px] max-h-[200px] overflow-y-auto leading-normal"
                  rows={1}
                  style={{ lineHeight: '1.5' }}
                />
                <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 w-10 h-10 flex items-center justify-center mt-1">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;