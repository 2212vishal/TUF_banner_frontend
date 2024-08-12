import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import CreateBanner from './CreateBanner';

function Nobanner({ isLoggedIn, setShowLoginForm, setShowCreateBanner }) {
  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-white shadow-lg rounded-lg text-center">
      <FaExclamationTriangle className="text-red-500 text-6xl" />
      <p className="text-red-600 text-3xl font-bold">No Banner Currently Exists</p>
      <p className="text-gray-700 text-lg">
        To create a banner, click the <span className="font-semibold text-blue-600">Admin</span> button, enter the required details, and create your banner.
      </p>
      {isLoggedIn ? (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowCreateBanner(true)}
        >
          Create Banner
        </button>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowLoginForm(true)}
        >
          Go to Admin
        </button>
      )}
    </div>
  );
}

export default Nobanner;
