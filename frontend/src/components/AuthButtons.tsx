import React from 'react';

const AuthButtons = () => {
  return (
    <div className="flex gap-2">
      <button className="px-4 py-2 text-blue-500 hover:bg-blue-50 rounded-lg">
        Login
      </button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Sign Up
      </button>
    </div>
  );
};

export default AuthButtons;