import React from 'react';
import {  FaEnvelope, FaPhone,FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  return (
    <div className="bg-neutral-100 flex justify-center text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200 lg:text-left">
      <footer className="w-11/12 ">
        <div className="flex items-center justify-between border-b-2 border-neutral-200 p-6 dark:border-neutral-500 lg:justify-between">
          <div className="mr-12 flex flex-col">
            <span className="text-3xl">Takeyou forward</span>
            <span>credntials that matter</span>
          </div>
          {/* Social network icons container */}
          <div className="flex justify-center">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Schedule 1-on-1 Call Now
            </button>

          </div>
        </div>

        {/* Main container div */}
        <div className="mx-6 py-10 text-center md:text-left">
          <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            
            {/* Products section */}
            <div className="">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Programs
              </h6>
              <p className="mb-4">
                <a className="text-neutral-600 dark:text-neutral-200">Angular</a>
              </p>
              <p className="mb-4">
                <a className="text-neutral-600 dark:text-neutral-200">React</a>
              </p>
              <p className="mb-4">
                <a className="text-neutral-600 dark:text-neutral-200">Vue</a>
              </p>
              <p>
                <a className="text-neutral-600 dark:text-neutral-200">Laravel</a>
              </p>
            </div>
            {/* Useful links section */}
            <div className="">
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Useful links
              </h6>
              <p className="mb-4">
                <a className="text-neutral-600 dark:text-neutral-200">Pricing</a>
              </p>
              <p className="mb-4">
                <a className="text-neutral-600 dark:text-neutral-200">Settings</a>
              </p>
              <p className="mb-4">
                <a className="text-neutral-600 dark:text-neutral-200">Orders</a>
              </p>
              <p>
                <a className="text-neutral-600 dark:text-neutral-200">Help</a>
              </p>
            </div>
            {/* Contact section */}
            <div>
              <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
                Contact
              </h6>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <FaMapMarkerAlt className="mr-3 h-5 w-5" />
                New York, NY 10012, US
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <FaEnvelope className="mr-3 h-5 w-5" />
                info@example.com
              </p>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                <FaPhone className="mr-3 h-5 w-5" />
                + 01 234 567 88
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <FaPhone className="mr-3 h-5 w-5" />
                + 01 234 567 89
              </p>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="bg-neutral-200 p-6 text-center dark:bg-neutral-700">
          <span>© 2024 Copyright: Vishal</span>
          
        </div>
      </footer>
    </div>
  );
}

export default Footer;
