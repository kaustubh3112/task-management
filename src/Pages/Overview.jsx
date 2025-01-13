import React, { useEffect, useState } from "react";
import { config, getData } from "../Api/Services";
import {
  FiCheckCircle,
  FiClock,
  FiList,
  FiTrendingDown,
  FiTrendingUp,
} from "react-icons/fi";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Overview = () => {
  const [overview, setOverview] = useState([]);

  const getOverview = async () => {
    try {
      const data = await getData(`${config.apiBaseUrl}/tasks`);
      setOverview(data);
    } catch (error) {
      console.log(error);
    }
  };

  const data = {
    labels: [
      "To-Do Tasks",
      "In Progress Tasks",
      "Completed Tasks",
      "In Review Tasks",
      "Backlog Tasks",
    ],
    datasets: [
      {
        label: "Total Tasks",
        data: [
          overview.filter((task) => task.status === "Pending").length,
          overview.filter((task) => task.status === "In Progress").length,
          overview.filter((task) => task.status === "In Review").length,
          overview.filter((task) => task.status === "Completed").length,
          overview.filter((task) => task.status === "Backlog").length,
        ],
        backgroundColor: [
          "#3b82f6",
          "#eab308",
          "#f97316",
          "#22c55e",
          "#ef4444",
        ],
        borderColor: ["#3b82f6", "#eab308", "#f97316", "#22c55e", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: false,
      tooltip: {
        enabled: true,
      },
    },
    hover: {
      mode: null,
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  useEffect(() => {
    getOverview();
  }, []);

  return (
    <>
      <h1 className="mb-4 font-semibold text-slate-700 text-lg">
        Tasks Overview
      </h1>
      <div className="grid grid-cols-5 gap-5 mb-5">
        <div className=" bg-white  p-5 rounded-lg border border-slate-100 shadow-sm flex items-center  gap-5">
          <div className="bg-blue-100/80 w-16 min-w-16 h-16 inline-flex items-center justify-center rounded-full">
            <FiList className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-500">To Do Tasks</h4>
            <h2 className="text-2xl font-bold text-slate-800 ">
              {overview.filter((task) => task.status === "Pending").length || 0}
            </h2>
          </div>
        </div>

        <div className=" bg-white  p-5 rounded-lg border border-slate-100 shadow-sm flex items-center  gap-5">
          <div className="bg-yellow-100/80 w-16 min-w-16 h-16 inline-flex items-center justify-center rounded-full">
            <FiTrendingUp className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-500">
              In Progress Tasks
            </h4>
            <h2 className="text-2xl font-bold text-slate-800 ">
              {overview.filter((task) => task.status === "In Progress")
                .length || 0}
            </h2>
          </div>
        </div>

        <div className=" bg-white  p-5 rounded-lg border border-slate-100 shadow-sm flex items-center  gap-5">
          <div className="bg-orange-100/80 w-16 min-w-16 h-16 inline-flex items-center justify-center rounded-full">
            <FiClock className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-500">
              In Review Tasks
            </h4>
            <h2 className="text-2xl font-bold text-slate-800 ">
              {overview.filter((task) => task.status === "In Review").length ||
                0}
            </h2>
          </div>
        </div>
        <div className=" bg-white  p-5 rounded-lg border border-slate-100 shadow-sm flex items-center  gap-5">
          <div className="bg-green-100/80 w-16 min-w-16 h-16 inline-flex items-center justify-center rounded-full">
            <FiCheckCircle className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-500">
              Completed Tasks
            </h4>
            <h2 className="text-2xl font-bold text-slate-800 ">
              {overview.filter((task) => task.status === "Completed").length ||
                0}
            </h2>
          </div>
        </div>
        <div className=" bg-white  p-5 rounded-lg border border-slate-100 shadow-sm flex items-center  gap-5">
          <div className="bg-red-100/80 w-16 min-w-16 h-16 inline-flex items-center justify-center rounded-full">
            <FiTrendingDown className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-500">
              Backlog Tasks
            </h4>
            <h2 className="text-2xl font-bold text-slate-800 ">
              {overview.filter((task) => task.status === "Backlog").length || 0}
            </h2>
          </div>
        </div>
      </div>
      <div className="bg-white p-10 rounded-lg h-[calc(100%-180px)]">
        {overview.length > 0 ? (
          <div className="max-h-[500px]">
            <Bar data={data} options={options} />
          </div>
        ) : (
          <h4 className="text-slate-400 font-medium text-sm">
            No task is currently in progress{" "}
          </h4>
        )}
      </div>
    </>
  );
};

export default Overview;
