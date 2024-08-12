import React, { useState } from 'react';
import axios from 'axios';
import { ImCross } from "react-icons/im";

function CreateBanner({ setShowCreateBanner, setBannerData }) {
  const [newBannerData, setNewBannerData] = useState({
    is_active: false,
    description: "",
    timer: "",
    link: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewBannerData(prevState => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async () => {
    // Validate timer format (hh:mm:ss)
    const timerFormat = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!timerFormat.test(newBannerData.timer)) {
      alert('Timer must be in hh:mm:ss format.');
      return;
    }

    try {
      const response = await axios.post(`https://tuf-banner-backend.onrender.com/api/banner/create`, newBannerData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Extract the banner from the response
      const { banner } = response.data;

      // Update the banner data in the parent component
      setBannerData(banner);

      // Hide the create banner form
      setShowCreateBanner(false);
    } catch (error) {
      console.error('Error creating banner:', error);
    }
  };

  return (
    <div className="relative flex flex-col gap-2 bg-lightgray border rounded p-2 w-96">
      <button
        className="absolute top-2 right-2"
        onClick={() => setShowCreateBanner(false)}
      >
        <ImCross className="w-[20px] h-[20px] text-gray-600" />
      </button>
      <div className="flex flex-col gap-2 p-2">
        <h2 className="font-bold text-2xl">Create Banner</h2>
        <div className="flex justify-between">
          <label htmlFor="is_active">Active:</label>
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            checked={newBannerData.is_active}
            onChange={handleChange}
            className="border rounded p-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={newBannerData.description}
            onChange={handleChange}
            required
            className="border rounded p-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="timer">Timer (hh:mm:ss):</label>
          <input
            type="text"
            id="timer"
            name="timer"
            value={newBannerData.timer}
            onChange={handleChange}
            required
            className="border rounded p-1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="link">Link:</label>
          <input
            type="text"
            id="link"
            name="link"
            value={newBannerData.link}
            onChange={handleChange}
            required
            className="border rounded p-1"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Create Banner
        </button>
      </div>
    </div>
  );
}

export default CreateBanner;
