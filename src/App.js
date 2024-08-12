import React, { useState, useEffect } from "react";
import "./App.css";
import Firstpage from "./components/Firstpage";
import Footer from "./components/Footer";
import Loginform from "./components/Loginfrom";
import Nobanner from "./components/Nobanner";
import Updateform from "./components/Updateform";
import DeleteConfirmation from "./components/DeleteConfirmation";
import CreateBanner from "./components/CreateBanner";
import axios from 'axios';

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showCreateBanner, setShowCreateBanner] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bannerData, setBannerData] = useState(null);
  const [bannerId, setBannerId] = useState(null);
  const [timerInterval, setTimerInterval] = useState(null); // To keep track of the interval ID

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/banner/get');
        setBannerData(response.data);
        setBannerId(response.data.id); // Replace with actual banner ID
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchBannerData();
  }, []);

  useEffect(() => {
    if (bannerId) {
      // Start decreasing timer every second
      const intervalId = setInterval(async () => {
        try {
          const response = await axios.put(`http://localhost:4000/api/banner/decrease-time/${bannerId}`);
          setBannerData(response.data.banner);
        } catch (error) {
          console.error('Error decreasing banner timer:', error);
          clearInterval(intervalId); // Stop the interval if there's an error
        }
      }, 1000);

      setTimerInterval(intervalId);

      // Cleanup the interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [bannerId]);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/api/auth/logout', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      localStorage.removeItem('token');
      localStorage.removeItem('username');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const showNobanner = !bannerData || bannerData.timer === "00:00:00" || bannerData.is_active === 0;

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="bg-primary w-full p-6 flex justify-between">
        <p className="text-2xl text-white">TUF ASSIGNMENT</p>
        {isLoggedIn ? (
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
              onClick={() => setShowUpdateForm(true)}
            >
              Update Banner
            </button>
            <button
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded"
              onClick={() => setShowDeleteConfirmation(true)}
            >
              Delete Banner
            </button>
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={() => setShowLoginForm(true)}
          >
            Admin
          </button>
        )}
      </div>

      {showLoginForm && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 flex justify-center items-center z-50">
          <Loginform setShowLoginForm={setShowLoginForm} setIsLoggedIn={setIsLoggedIn} />
        </div>
      )}

      {showUpdateForm && bannerId && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 flex justify-center items-center z-50">
          <Updateform bannerData={bannerData} setShowUpdateForm={setShowUpdateForm} setBannerData={setBannerData} />
        </div>
      )}

      {showDeleteConfirmation && bannerId && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 flex justify-center items-center z-50">
          <DeleteConfirmation bannerId={bannerId} setShowDeleteConfirmation={setShowDeleteConfirmation} setBannerData={setBannerData} />
        </div>
      )}

      {showCreateBanner && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 flex justify-center items-center z-50">
          <CreateBanner setShowCreateBanner={setShowCreateBanner} setBannerData={setBannerData} />
        </div>
      )}

      <div className="flex-grow flex items-center justify-center w-11/12">
        {showNobanner ? (
          <Nobanner isLoggedIn={isLoggedIn} setShowLoginForm={setShowLoginForm} setShowCreateBanner={setShowCreateBanner} />
        ) : (
          <Firstpage
            description={bannerData.description}
            timer={bannerData.timer}
            link={bannerData.link}
          />
        )}
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}

export default App;
