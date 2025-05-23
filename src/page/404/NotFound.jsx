import React from 'react';
import { Link } from 'react-router-dom';
import rakLogo from '../../../public/rak-logo.png';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 py-12">
      {/* Government logo */}
      <div className="mb-8">
        <img
          src={rakLogo} // replace with actual logo path
          alt="Ras Al Khaimah Government Logo"
          className="h-20 object-contain"
        />
      </div>

      {/* Error content */}
      <div className="max-w-xl text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-medium text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-6">
          The page you are looking for doesn’t exist or has been moved.  
          Please check the URL or return to the homepage.
        </p>

        <Link
          to="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-md shadow hover:bg-primary-dark transition duration-200"
        >
          Return to Homepage
        </Link>
      </div>

      {/* Optional footer or contact */}
      <footer className="mt-12 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Government of Ras Al Khaimah. All rights reserved.
      </footer>
    </div>
  );
};

export default NotFound;
