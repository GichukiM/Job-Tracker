import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

const EmployeeProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        contact_info: '',
        job_title: '',
        department: '',
        salary: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const employee = location.state?.employee;

    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name,
                contact_info: employee.contact_info,
                job_title: employee.job_title,
                department: employee.department,
                salary: employee.salary,
            });
        }
    }, [employee]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            if (employee) {
                await axios.put(`http://localhost:8080/employees/${employee.id}`, formData);
            } else {
                await axios.post('http://localhost:8080/employees', formData);
                setFormData({
                    name: '',
                    contact_info: '',
                    job_title: '',
                    department: '',
                    salary: '',
                });
            }
            setSuccessMessage('Employee saved successfully!');
            setTimeout(() => {
                setSuccessMessage('');
                navigate("/dashboard/manage-employees");
            }, 2000);
        } catch (error) {
            console.error('Error saving employee data:', error);
        }
    };

    return (
        <form className="max-w-md mx-auto">
            {successMessage && <p className="success-message">{successMessage}</p>}
            <div className="mb-5">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className='mb-5'>
            <label for="contact_info" class="block mb-2 text-sm font-medium text-gray-900">Contact Info</label>
                <input
                    type="text"
                    name="contact_info"
                    value={formData.contact_info}
                    onChange={handleInputChange}
                    placeholder="Contact Info"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                </div>
                <div className='mb-5'>
                <label for="job_title" class="block mb-2 text-sm font-medium text-gray-900">Job Title</label>
                <input
                    type="text"
                    name="job_title"
                    value={formData.job_title}
                    onChange={handleInputChange}
                    placeholder="Job Title"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                </div>
                <div className='mb-5'>
                <label for="deparment" class="block mb-2 text-sm font-medium text-gray-900">Department</label>
                <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="Department"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                </div>
                <div className='mb-5'>
                <label for="salary" class="block mb-2 text-sm font-medium text-gray-900">Salary</label>
                <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="Salary"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                </div>
                <div className="mb-5">
                    <button onClick={handleSave} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        {employee ? 'Save' : 'Add Employee'}
                    </button>
                    <button onClick={() => navigate("/dashboard/manage-employees")} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Cancel
                    </button>
            </div>
        </form>
    );
};

export default EmployeeProfile;