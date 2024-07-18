import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import "./LeaveManagement.css";

function LeaveManagement() {
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('pending');
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaves();
    fetchEmployees();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await fetch('http://localhost:8080/leaves');
      if (!response.ok) {
        throw new Error('Failed to fetch leaves');
      }
      const data = await response.json();
      setLeaves(data);
    } catch (error) {
      console.error('Error fetching leaves:', error.message);
      // Handle error gracefully (e.g., show a message to the user)
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:8080/employees');
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error.message);
      // Handle error gracefully (e.g., show a message to the user)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/leaves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ employee_id: selectedEmployee.id, leave_type: leaveType, start_date: startDate, end_date: endDate, reason: reason, status: status })
      });
      if (!response.ok) {
        throw new Error('Failed to submit leave');
      }
      const result = await response.json();
      alert(result.message);
      fetchLeaves();
      // Clear form fields after submission
      setLeaveType('');
      setStartDate('');
      setEndDate('');
      setReason('');
      setStatus('pending');
    } catch (error) {
      console.error('Error submitting leave:', error.message);
      // Handle error gracefully (e.g., show a message to the user)
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/leaves/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ leave_type: leaveType, start_date: startDate, end_date: endDate, reason: reason, status: status })
      });
      if (!response.ok) {
        throw new Error('Failed to update leave');
      }
      const result = await response.json();
      alert(result.message);
      fetchLeaves();
    } catch (error) {
      console.error('Error updating leave:', error.message);
      // Handle error gracefully (e.g., show a message to the user)
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/leaves/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete leave');
      }
      const result = await response.json();
      alert(result.message);
      fetchLeaves();
    } catch (error) {
      console.error('Error deleting leave:', error.message);
      // Handle error gracefully (e.g., show a message to the user)
    }
  };

  const handleEmployeeChange = (e) => {
    const employeeId = parseInt(e.target.value); // Assuming your select returns an ID
    const selectedEmp = employees.find(emp => emp.id === employeeId);
    setSelectedEmployee(selectedEmp);
  };

  return (
    <>
        <div className='flex justify-between mb-4'>
            <h2 className='text-2xl font-bold'>Leave Management</h2>
        </div>

      {/* 

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.id}</td>
              <td>{leave.employee_name}</td>
              <td>{leave.leave_type}</td>
              <td>{leave.start_date}</td>
              <td>{leave.end_date}</td>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
              <td>
                <button className="update" onClick={() => handleUpdate(leave.id)}>Update</button>
                <button className="delete" onClick={() => handleDelete(leave.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      
        <form>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Select Employee:</label>
                    <select className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer' value={selectedEmployee ? selectedEmployee.id : ''} onChange={handleEmployeeChange} required>
                        <option selected>Select Employee</option>
                        {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">Leave Type:</label>
                    <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="eg: Sick leave" value={leaveType} onChange={(e) => setLeaveType(e.target.value)} required />
                </div>
                <div>
                    <label for="start-date" class="block mb-2 text-sm font-medium text-gray-900">Start Date:</label>
                    <input type="date" id="start-date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={startDate} onChange={(e) => setStartDate(e.target.value)} required/>
                </div>  
                <div>
                    <label for="end-date" class="block mb-2 text-sm font-medium text-gray-900">End Date</label>
                    <input type="date" id="end-date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                </div>
                <div>
                    <label for="website" class="block mb-2 text-sm font-medium text-gray-900">Reason:</label>
                    <input type="url" id="reason" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Serious cough" value={reason} onChange={(e) => setReason(e.target.value)} required />
                </div>
                <div>
                    <label className='block mb-2 text-sm font-medium text-gray-900'>Status:</label>
                    <select className='block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer' value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value='selected'>Select status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center block dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>

        <div className='flex justify-between mb-4 mt-6'>
            <h2 className='text-2xl font-bold'>Leave Requests</h2>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className='text-xs text-gray-700 uppercase dark:text-gray-400'>
                <tr>
                    <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">ID</th>
                    <th scope="col" class="px-6 py-3">Employee Name</th>
                    <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">Leave Type</th>
                    <th scope="col" class="px-6 py-3">Start Date</th>
                    <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">End Date</th>
                    <th scope="col" class="px-6 py-3">Reason</th>
                    <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">Status</th>
                    <th scope="col" class="px-6 py-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {leaves.map((leave) => (
                    <tr key={leave.id} className="border-b border-gray-200 dark:border-gray-700">
                        <td className='px-6 py-4'>{leave.id}</td>
                        <td className='px-6 py-4 bg-gray-50 dark:bg-gray-800'>{leave.employee_name}</td>
                        <td className='px-6 py-4'>{leave.leave_type}</td>
                        <td className='px-6 py-4 bg-gray-50 dark:bg-gray-800'>{leave.start_date}</td>
                        <td className='px-6 py-4'>{leave.end_date}</td>
                        <td className='px-6 py-4 bg-gray-50 dark:bg-gray-800'>{leave.reason}</td>
                        <td className='px-6 py-4'>{leave.status}</td>
                        <td className="px-6 py-4">
                            <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => handleUpdate(leave.id)}>Edit</button>
                            <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => handleDelete(leave.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    </>
  );
}

export default LeaveManagement;