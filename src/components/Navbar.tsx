
import React from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/image.png';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Home as HomeIcon, People as PeopleIcon, Schedule as ScheduleIcon, AccountCircle as AccountCircleIcon, Settings as SettingsIcon } from '@mui/icons-material';

const Navbar: React.FC = () => {
  
  const userName = 'John Doe';  
  const userProfileImage = "https://randomuser.me/api/portraits/men/3.jpg";

  return (
    <div className="absolute top-4 left-4 w-full max-w-screen-xl h-18 bg-white rounded-full shadow-lg flex items-center justify-between px-12 py-4 opacity-100 overflow-hidden">
     
      <a href="#"><img 
        src={image}
        alt="Logo"
      />

      </a>

      {/* Navigation Links */}
      <div className="flex space-x-8">
        <Link
          to="/overview"
          className="flex items-center text-gray-800 hover:bg-[#01F0D0] hover:text-white hover:scale-105 transition duration-200 py-2 px-4 rounded-full"
        >
          <HomeIcon className="mr-2" />
          Overview
        </Link>

        <Link
          to="/patients"
          className="flex items-center text-gray-800 hover:bg-[#01F0D0] hover:text-white hover:scale-105 transition duration-200 py-2 px-4 rounded-full"
        >
          <PeopleIcon className="mr-2" />
          Patients
        </Link>

        <Link
          to="/schedule"
          className="flex items-center text-gray-800 hover:bg-[#01F0D0] hover:text-white hover:scale-105 transition duration-200 py-2 px-4 rounded-full"
        >
          <ScheduleIcon className="mr-2" />
          Schedule
        </Link>

        <Link
          to="/transactions"
          className="flex items-center text-gray-800 hover:bg-[#01F0D0] hover:text-white hover:scale-105 transition duration-200 py-2 px-4 rounded-full"
        >
          <ScheduleIcon className="mr-2" />
          Transactions
        </Link>

        {/* Profile Settings Link with Image and Name */}
        <div className="flex items-center space-x-4">
        <img
          src="https://fedskillstest.ct.digital/2.png"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="" style={{font: "", fontWeight: "bold"}}>Dr. Jose Simmons</p>
          <p className="text-sm text-gray-500">General Practitioner</p>
        </div>
        <SettingsIcon fontSize="small" className="text-gray-500 cursor-pointer" />
        <MoreVertIcon fontSize="small" className="text-gray-500 cursor-pointer" />
      </div>
      </div>
    </div>
  );
};

export default Navbar;
