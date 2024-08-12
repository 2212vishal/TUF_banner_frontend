import React, { useState } from 'react';
import axios from 'axios';
import { ImCross } from "react-icons/im";

function Updateform({ bannerData, setShowUpdateForm, setBannerData }) {
  const [updateData, setUpdateData] = useState({
    is_active: bannerData.is_active,
    description: bannerData.description,
    timer: bannerData.timer,
    link: bannerData.link,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdateData(prevState => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async () => {
    // Validate timer format (hh:mm:ss)
    const timerFormat = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!timerFormat.test(updateData.timer)) {
      alert('Timer must be in hh:mm:ss format.');
      return;
    }

    try {
      const response = await axios.put(`https://tuf-banner-backend.onrender.com/api/banner/update/${bannerData.id}`, updateData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Update the banner data in the parent component
      setBannerData(response.data.banner); // Update with the new banner data

      // Hide the update form
      setShowUpdateForm(false);
    } catch (error) {
      console.error('Error updating banner:', error);
    }
  };

  return (
    <div className="relative flex flex-col gap-2 bg-lightgray border rounded p-2 w-96">
      <button
        className="absolute top-2 right-2"
        onClick={() => setShowUpdateForm(false)}
      >
        <ImCross className="w-[20px] h-[20px] text-gray-600" />
      </button>
      <div className="flex flex-col gap-2 p-2">
        <h2 className="font-bold text-2xl">Update Banner</h2>
        <div className="flex justify-between">
          <label htmlFor="is_active">Active:</label>
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            checked={updateData.is_active}
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
            value={updateData.description}
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
            value={updateData.timer}
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
            value={updateData.link}
            onChange={handleChange}
            required
            className="border rounded p-1"
          />
        </div>
        <button className="bg-blue-500 p-2 border rounded" onClick={handleSubmit}>Update</button>
      </div>
    </div>
  );
}

export default Updateform;
