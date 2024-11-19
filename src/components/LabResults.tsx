
import React, { useEffect, useState } from 'react';
import { ArrowDownward } from '@mui/icons-material';


interface LabResult {
  id: number;
  name: string;
}


interface ResponseItem {
  lab_results?: LabResult[];
}

const LabResultsList = () => {
  
  const [labResults, setLabResults] = useState<LabResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

 
  useEffect(() => {
    const fetchLabResults = async () => {
      try {
        const username = 'coalition';
        const password = 'skills-test';
        const base64Credentials = btoa(`${username}:${password}`);

        const response = await fetch(
          'https://fedskillstest.coalitiontechnologies.workers.dev',
          {
            method: 'GET',
            headers: {
              Authorization: `Basic ${base64Credentials}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data: ResponseItem[] = await response.json();

        
          console.log('Fetched Data:', data);

         
          const allLabResults: LabResult[] = data
            .filter((item: ResponseItem) => item.lab_results && Array.isArray(item.lab_results))
            .flatMap((item: ResponseItem) => item.lab_results ?? []);

          setLabResults(allLabResults);
        } else {
          setError(`Error fetching data: ${response.statusText}`);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(`Error: ${error.message}`);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLabResults();
  }, []);


  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-96 mx-auto p-7 border box-border bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Lab Results</h2>
      <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
        {labResults.map((result) => (
          <li
            key={result.id}
            className="flex justify-between items-center py-2 px-4 hover:bg-gray-100 cursor-pointer"
          >
            <span>{result}</span> 
            <ArrowDownward className="text-gray-500" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LabResultsList;
