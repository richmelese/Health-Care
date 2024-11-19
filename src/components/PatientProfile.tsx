import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaPhoneAlt, FaUserFriends, FaVenus } from "react-icons/fa";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import LabResultsWithDownload from "../components/LabResults";

interface PatientProfile {
  name: string;
  gender: string;
  age: number;
  profile_picture: string;
  date_of_birth: string;
  phone_number: string;
  emergency_contact: string;
}

const PatientProfile: React.FC = () => {
  const [patientData, setPatientData] = useState<PatientProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = "coalition";
        const password = "skills-test";
        const base64Credentials = btoa(`${username}:${password}`);

        const response = await fetch(
          "https://fedskillstest.coalitiontechnologies.workers.dev",
          {
            method: "GET",
            headers: {
              Authorization: `Basic ${base64Credentials}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const patientData = data[3];

          setPatientData({
            name: patientData.name,
            gender: patientData.gender,
            age: patientData.age,
            profile_picture: patientData.profile_picture,
            date_of_birth: patientData.date_of_birth,
            phone_number: patientData.phone_number,
            emergency_contact: patientData.emergency_contact,
          });
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  if (!patientData) return <div>Loading...</div>;

  return (
    <div className="mt-20"> {/* Add top margin to the container */}
      {/* Patient Profile Card */}
      <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md border mt-5"  style={{
        top: '10px'
     
      }}>
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <img
            src={patientData.profile_picture}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          {/* Name */}
          <h2 className="text-xl font-bold text-gray-800">{patientData.name}</h2>

          {/* Information */}
          <div className="mt-6 space-y-6 w-full text-gray-700">
            <div className="flex items-start gap-3">
              <FaCalendarAlt className="text-teal-500 mt-1" />
              <div>
                <p className="font-medium">Date Of Birth</p>
                <p>{patientData.date_of_birth}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaVenus className="text-teal-500 mt-1" />
              <div>
                <p className="font-medium">Gender</p>
                <p>{patientData.gender}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-teal-500 mt-1" />
              <div>
                <p className="font-medium">Contact Info</p>
                <p>{patientData.phone_number}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaUserFriends className="text-teal-500 mt-1" />
              <div>
                <p className="font-medium">Emergency Contacts</p>
                <p>{patientData.emergency_contact}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MdOutlineHealthAndSafety className="text-teal-500 mt-1" />
              <div>
                <p className="font-medium">Age:</p>
                <p>{patientData.age} years</p>
              </div>
            </div>
          </div>

          {/* Button */}
          <button className="mt-6 px-6 py-2 bg-teal-500 text-white font-medium rounded-full hover:bg-teal-600">
            Show All Information
          </button>
        </div>
      </div>

      {/* Lab Results */}
      <div className="mt-10">
        <LabResultsWithDownload />
      </div>
    </div>
  );
};

export default PatientProfile;
