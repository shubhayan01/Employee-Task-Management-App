import React, { useState, useEffect, useContext } from 'react'
import { getEmployeesList, assignTaskToEmployee } from '../../utils/Localstorage'
import { AuthContext } from '../../context/AuthProvider'

const CreateTask = () => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        employeeId: '',
        category: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const { updateUserData } = useContext(AuthContext);

    useEffect(() => {
        // Get list of employees for dropdown
        const employeeList = getEmployeesList();
        setEmployees(employeeList);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate form
        if (!formData.title || !formData.description || !formData.date || !formData.employeeId || !formData.category) {
            alert('Please fill all fields');
            return;
        }

        // Create task object
        const taskData = {
            title: formData.title,
            description: formData.description,
            date: formData.date,
            category: formData.category
        };

        // Assign task to selected employee
        const success = assignTaskToEmployee(parseInt(formData.employeeId), taskData);
        
        if (success) {
            // Reset form
            setFormData({
                title: '',
                description: '',
                date: '',
                employeeId: '',
                category: ''
            });
            
            // Show success message
            setSuccessMessage('Task assigned successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
            
            // Update context data
            const employees = JSON.parse(localStorage.getItem('employees'));
            const admin = JSON.parse(localStorage.getItem('admin'));
            updateUserData({ employees, admin });
        } else {
            alert('Failed to assign task. Please try again.');
        }
    };

    const categoryOptions = [
        "Development", "Design", "Marketing", "Research", 
        "Meetings", "Reporting", "Finance", "SEO", 
        "CRM", "Customer Support"
    ];

    return (
        <div>
            {successMessage && (
                <div className='fixed top-4 right-4 bg-gradient-to-r from-green-600 to-green-800 text-white p-4 rounded-lg shadow-lg z-50 animate-fade-in flex justify-between items-center max-w-md'>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p>{successMessage}</p>
                    </div>
                    <button 
                        onClick={() => setSuccessMessage('')}
                        className='text-white hover:text-gray-200'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            )}
            
            <div className='glass-effect rounded-xl overflow-hidden shadow-xl border border-gray-800 backdrop-blur-sm'>
                <div className="border-b border-gray-800 py-4 px-6">
                    <h2 className='text-xl font-bold text-white flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Create New Task
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">Assign tasks to employees and set deadlines</p>
                </div>
                
                <form onSubmit={handleSubmit} className='p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-gray-300 flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                            Task Title
                        </label>
                        <input 
                            type="text" 
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder='Enter task title' 
                            className='w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-gray-300 flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Due Date
                        </label>
                        <input 
                            type="date" 
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className='w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-gray-300 flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Assign to
                        </label>
                        <select 
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                            className='w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors'
                        >
                            <option value="">Select an employee</option>
                            {employees.map(employee => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.name} ({employee.email})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-gray-300 flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            Category
                        </label>
                        <select 
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className='w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors'
                        >
                            <option value="">Select a category</option>
                            {categoryOptions.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='space-y-2 md:col-span-2'>
                        <label className='text-sm font-medium text-gray-300 flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                            Description
                        </label>
                        <textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder='Enter task description'
                            className='w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none'
                            rows="4"
                        ></textarea>
                    </div>

                    <div className='md:col-span-2 flex justify-end mt-2'>
                        <button 
                            type='submit'
                            className='px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center shadow-lg transform hover:scale-[1.02] active:scale-[0.98]'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Assign Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTask