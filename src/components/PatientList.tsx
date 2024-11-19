
import React, { useEffect, useState } from 'react';
import { MdSearch, MdMoreVert } from 'react-icons/md';

interface Patient {
  name: string;
  gender: string;
  age: number;
  profile_picture: string;
  highlight?: boolean;
}

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const username = 'coalition';
  const password = 'skills-test';

  // Base64 encode the credentials
  const base64Credentials = btoa(`${username}:${password}`);

  // Fetch patients data from the backend API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
          method: 'GET',
          headers: {
            Authorization: `Basic ${base64Credentials}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error_message);
        }

        setPatients(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError('Failed to fetch patients: ' + err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [base64Credentials]);

  // Filter patients based on the search query
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="w-full text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="w-full text-center py-4 text-red-600">{error}</div>;
  }

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-4 mt-20">
  {/* Header with Title and Search Icon */}
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-semibold">Patients</h2>

    {/* Search Icon */}
    <MdSearch
      onClick={() => setIsSearchVisible(!isSearchVisible)}
      className="cursor-pointer text-gray-500"
      size={24}
    />

    {/* Search Input, shown only when isSearchVisible is true */}
    {isSearchVisible && (
      <div className="relative ml-2">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-5 pr-2 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
    )}
  </div>

  {/* Patient List */}
  <div
    className="overflow-y-auto pr-2"
    style={{
      height: '930px', 
      scrollbarWidth: 'none', 
      msOverflowStyle: 'none', 
    }}
  >
    <div
      className="max-h-full hover:overflow-y-auto"
      style={{
        overflowY: 'auto', 
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none', 
      }}
    >
      {filteredPatients.length > 0 ? (
        filteredPatients.map((patient, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg ${
              patient.highlight ? 'bg-teal-100' : 'hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-4">
              {/* Patient Image */}
              <img
                src={patient.profile_picture}
                alt={patient.name}
                className="w-12 h-12 rounded-full"
              />
              {/* Patient Details */}
              <div>
                <p className="font-semibold">{patient.name}</p>
                <p className="text-sm text-gray-500">
                  {patient.gender}, {patient.age}
                </p>
              </div>
            </div>
            {/* More Options Icon */}
            <MdMoreVert className="text-gray-500" size={24} />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No patients found</p>
      )}
    </div>
  </div>
</div>

  );
};

export default Patients;
