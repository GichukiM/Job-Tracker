import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Dashboardcontent.css';

const Dashboardhome = () => {
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [totalSalary, setTotalSalary] = useState(0);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/dashboard');
            const { totalEmployees, totalSalary } = response.data; // Ensure your backend returns these fields correctly
            setTotalEmployees(totalEmployees);
            setTotalSalary(totalSalary);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    return (
        <>
            <h2 className='text-2xl mb-8'>Dashboard</h2>
            
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                <a href="#" class="h-auto block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Employees</h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">{totalEmployees}</p>
                </a>
            
                <a href="#" class="h-auto block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Salaries</h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">${totalSalary.toFixed(2)}</p>
                </a>
            </div>

        </>
    );
};

export default Dashboardhome;