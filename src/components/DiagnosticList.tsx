import React, { useEffect, useState } from 'react';
import { Done, Close } from '@mui/icons-material';

interface Diagnostic {
  name: string;
  description: string;
  status: string;
}

const DiagnosticList: React.FC = () => {
  const [diagnosticData, setDiagnosticData] = useState<Diagnostic[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const username = 'coalition';
        const password = 'skills-test';

      
        const credentials = btoa(`${username}:${password}`);

        // Fetch API request with Basic Auth
        const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const diagnostics = data[0]?.diagnostic_list || []; 
          setDiagnosticData(diagnostics);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const statusStyles = {
    'Under Observation': 'bg-orange-500 text-white',
    'Complete': 'bg-green-500 text-white',
    'In Progress': 'bg-blue-500 text-white',
    'Pending': 'bg-red-500 text-white',
  };

  return (
    <div className="relative mx-auto mt-8 max-w-4xl p-4 bg-white shadow-md rounded-lg overflow-auto">
      <h2 className="text-lg font-semibold mb-4">Diagnostic List</h2>
      <table className="min-w-full text-left border-collapse">
        <thead>
          <tr>
            <th
              colSpan={5}
              className="py-3 px-6 bg-gray-100 border-b text-lg font-semibold text-gray-700 top-4"
              style={{
                borderRadius: '24px',
              }}
            >
              <div className="flex justify-between items-center">
                <span className="flex-1 text-center">Problem/Diagnosis</span>
                <span className="flex-1 text-center">Description</span>
                <span className="flex-1 text-center">Status</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {diagnosticData.map((diagnostic, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{diagnostic.name}</td>
              <td className="py-2 px-4 border-b">{diagnostic.description}</td>
              <td className="py-2 px-4 border-b">{diagnostic.status}</td>
              <td className="py-2 px-4 border-b">
           
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiagnosticList;
