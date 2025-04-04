import React from 'react';

const Footer = () => {
  return (
    <footer className="p-4 border-t">
      <div className="flex justify-end gap-4 text-sm text-gray-600">
        <a href="#" className="hover:text-blue-500">Rate Us</a>
        <a href="#" className="hover:text-blue-500">Help Center</a>
        <a href="#" className="hover:text-blue-500">Privacy</a>
        <a href="#" className="hover:text-blue-500">Terms</a>
      </div>
    </footer>
  );
};

export default Footer;