import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Moon, Sun, Send, Upload, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import AuthButtons from './components/AuthButtons';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState('');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleUploadClick = () => {
    setShowUploadDialog(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles(files);
    }
  };

  const handleUploadSubmit = async () => {
    // Here you would typically upload the files to your backend
    console.log('Uploading files:', uploadedFiles);
    // For now, we'll just close the dialog
    setShowUploadDialog(false);
    setUploadedFiles([]);
  };

  const handleCloseUpload = () => {
    setShowUploadDialog(false);
    setUploadedFiles([]);
  };

  const ChatInterface = () => {
    const { user, logout } = useAuth();
    
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
                {user ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Welcome, {user.username}
                    </span>
                    <button
                      onClick={logout}
                      className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <AuthButtons />
                )}
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
                  <button 
                    onClick={handleUploadClick}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 w-10 h-10 flex items-center justify-center mt-1"
                  >
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

        {/* Upload Dialog */}
        {showUploadDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 w-96`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Upload Files
                </h2>
                <button
                  onClick={handleCloseUpload}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  // @ts-ignore - webkitdirectory is a valid attribute but not in TypeScript's types
                  webkitdirectory=""
                  // @ts-ignore - directory is a valid attribute but not in TypeScript's types
                  directory=""
                  multiple
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200"
                >
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Click to select a folder
                  </p>
                </button>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mb-4">
                  <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Selected Files:
                  </h3>
                  <div className="max-h-40 overflow-y-auto">
                    {uploadedFiles.map((file, index) => (
                      <div 
                        key={index}
                        className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}
                      >
                        {file.webkitRelativePath || file.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCloseUpload}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadSubmit}
                  disabled={uploadedFiles.length === 0}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <ChatInterface />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;