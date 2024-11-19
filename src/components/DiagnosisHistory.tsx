import React, { useEffect, useState } from "react";
import {
  Line
} from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ChartOptions } from "chart.js";
import  DiagnosticList from "../components/DiagnosticList";
import temperatureIcon from '../assets/temp.png'; 
import heartRateIcon from '../assets/hert.png';
import respiratoryRateIcon from '../assets/leb.png'; 


ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

// Define types for the response structure
interface BloodPressure {
  systolic: { value: number; levels: string };
  diastolic: { value: number; levels: string };
}

interface HealthMetrics {
  respiratory_rate: { value: number; levels: string };
  temperature: { value: number; levels: string };
  heart_rate: { value: number; levels: string };
}

interface DiagnosisHistoryItem {
  month: string;
  year: number;
  blood_pressure: BloodPressure;
  heart_rate: HealthMetrics["heart_rate"];
  respiratory_rate: HealthMetrics["respiratory_rate"];
  temperature: HealthMetrics["temperature"];
}

interface Diagnostic {
  diagnosis_history: DiagnosisHistoryItem[];
  diagnostic_list: {
    name: string;
    description: string;
    status: string;
  }[];
}

const DiagnosisHistory = () => {
  const [diagnosticData, setDiagnosticData] = useState<Diagnostic | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = 'coalition';
        const password = 'skills-test';
        const credentials = btoa(`${username}:${password}`);

        const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDiagnosticData(data[0]);
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  if (!diagnosticData) {
    return <div>Loading...</div>;
  }

  const { diagnosis_history } = diagnosticData;

  const data = {
    labels: diagnosis_history.map(item => `${item.month}, ${item.year}`),
    datasets: [
      {
        label: "Systolic",
        data: diagnosis_history.map(item => item.blood_pressure.systolic.value),
        borderColor: "#E57373",
        backgroundColor: "#FCE4EC",
        pointBackgroundColor: "#E57373",
        pointBorderColor: "#E57373",
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: "Diastolic",
        data: diagnosis_history.map(item => item.blood_pressure.diastolic.value),
        borderColor: "#7986CB",
        backgroundColor: "#E8EAF6",
        pointBackgroundColor: "#7986CB",
        pointBorderColor: "#7986CB",
        borderWidth: 2,
        tension: 0.3,
      }
    ]
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 200,
      },
    },
  };

  return (
    <div className="mt-20">
    <div className="bg-white p-6 border rounded-lg box-border">
      <h2 className="text-xl font-bold mb-4">Diagnosis History</h2>

      {/* Blood Pressure Chart Section */}
      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Blood Pressure</h3>
          <button className="flex items-center text-gray-600">
            Last 6 months <MdKeyboardArrowDown />
          </button>
        </div>

        {/* Flex Container for Chart and Values */}
        <div className="flex justify-between items-start mt-4 space-x-8">
          {/* Chart Section */}
          <div className="flex-1">
            <Line data={data} options={options} />
          </div>

          {/* Systolic and Diastolic Values */}
          <div className="flex flex-col justify-between">
            <div className="mb-4">
              <p className="text-pink-600 font-semibold">Systolic</p>
              <h4 className="text-2xl font-bold">{diagnosis_history[0].blood_pressure.systolic.value}</h4>
              <p className="text-gray-500">{diagnosis_history[0].blood_pressure.systolic.levels}</p>
            </div>
            <div>
              <p className="text-indigo-600 font-semibold">Diastolic</p>
              <h4 className="text-2xl font-bold">{diagnosis_history[0].blood_pressure.diastolic.value}</h4>
              <p className="text-gray-500">{diagnosis_history[0].blood_pressure.diastolic.levels}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Column Diagnosis Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center">
          <div className="text-2xl">
          <img src={respiratoryRateIcon} alt="Respiratory Rate" />
          </div>
          <h4 className="text-lg font-semibold mt-2">Respiratory Rate</h4>
          <p className="text-2xl font-bold">{diagnosis_history[0].respiratory_rate.value} bpm</p>
          <p className="text-gray-500">{diagnosis_history[0].respiratory_rate.levels}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg flex flex-col items-center">
          <div className="text-2xl">
          <img src={temperatureIcon} alt="Temperature" />
          </div>
          <h4 className="text-lg font-semibold mt-2">Temperature</h4>
          <p className="text-2xl font-bold">{diagnosis_history[0].temperature.value}°F</p>
          <p className="text-gray-500">{diagnosis_history[0].temperature.levels}</p>
        </div>
        <div className="bg-pink-50 p-4 rounded-lg flex flex-col items-center">
          <div className="text-2xl">
          <img src={heartRateIcon} alt="Heart Rate" />
          </div>
          <h4 className="text-lg font-semibold mt-2">Heart Rate</h4>
          <p className="text-2xl font-bold">{diagnosis_history[0].heart_rate.value} bpm</p>
          <p className="text-gray-500">{diagnosis_history[0].heart_rate.levels}</p>
        </div>
      </div>
    </div>
    <div>
   < DiagnosticList />
    </div>
    </div>
  );
};

export default DiagnosisHistory;
