import React from 'react';
import { FaCheck } from 'react-icons/fa';
import paymentSuiteImg from '../assets/offer_image.png';

function Firstpage({ description, timer, link }) {
  return (
    <div className="w-full min-h-[520px] bg-white flex rounded-md relative p-10 py-12 border m-4">
      <div className="flex flex-col justify-between w-full">
        <h3 className="font-mullish text-[28px] leading-10 font-bold max-w-[500px]">
          Please use that {' '}
          <span className="text-lightBlue">Offer</span>
        </h3>
        
        <div className="font-mullish flex items-center ">
          <FaCheck className="text-greenLight" />
          <span>Description: {description}</span>
        </div>

        <div>
          <div className="text-2xl ">Offer Ended in just : {timer}</div>
        </div>

        <div className="flex flex-col-reverse md:flex-row items-center">
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600">
            {link}
          </a>
        </div>
      </div>
      <img
        src={paymentSuiteImg}
        alt="Payment Suite"
        className="max-w-[400px] absolute right-0 bottom-0 hidden md:block lg:block"
      />
    </div>
  );
}

export default Firstpage;
