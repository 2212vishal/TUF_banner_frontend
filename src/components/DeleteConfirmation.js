// components/DeleteConfirmation.js
import React from 'react';
import axios from 'axios';
import { ImCross } from 'react-icons/im';

function DeleteConfirmation({ bannerId, setShowDeleteConfirmation, setBannerData }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://tuf-banner-backend.onrender.com/api/banner/delete/${bannerId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Update banner data in the parent component
      setBannerData(null); // or however you want to handle the absence of a banner

      // Hide the delete confirmation
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  return (
    <div className="relative flex flex-col gap-2 bg-lightgray border rounded p-2 w-96">
      <button
        className="absolute top-2 right-2"
        onClick={() => setShowDeleteConfirmation(false)}
      >
        <ImCross className="w-[20px] h-[20px] text-gray-600" />
      </button>
      <div className="flex flex-col gap-2 p-2">
        <h2 className="font-bold text-2xl">Delete Banner</h2>
        <p>Are you sure you want to delete this banner?</p>
        <div className="flex space-x-4">
          <button
            className="bg-red-500 text-white p-2 border rounded"
            onClick={handleDelete}
          >
            Yes
          </button>
          <button
            className="bg-gray-500 text-white p-2 border rounded"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
