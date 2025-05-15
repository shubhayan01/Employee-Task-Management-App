import React, { useState, useEffect, useContext } from 'react';
import { getEmployeeTasks, updateTaskStatus } from '../../utils/Localstorage';
import { AuthContext } from '../../context/AuthProvider';

const TaskList = ({ employeeId }) => {
    const [tasks, setTasks] = useState([]);
    const [statusChangeMessage, setStatusChangeMessage] = useState('');
    const { updateUserData } = useContext(AuthContext);

    useEffect(() => {
        if (employeeId) {
            // Load employee's tasks
            const employeeTasks = getEmployeeTasks(employeeId);
            setTasks(employeeTasks);
        }
    }, [employeeId]);

    const handleStatusChange = (taskTitle, status) => {
        const success = updateTaskStatus(employeeId, taskTitle, status);
        
        if (success) {
            // Update local state
            const updatedTasks = getEmployeeTasks(employeeId);
            setTasks(updatedTasks);
            
            // Show status change message
            setStatusChangeMessage(`Task marked as ${status}!`);
            setTimeout(() => setStatusChangeMessage(''), 3000);
            
            // Update context
            const employees = JSON.parse(localStorage.getItem('employees'));
            const admin = JSON.parse(localStorage.getItem('admin'));
            updateUserData({ employees, admin });
        }
    };

    // Function to format date in a more readable format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Get priority color based on category
    const getPriorityColor = (category) => {
        const categoryMap = {
            'Development': 'from-blue-600 to-blue-800',
            'Design': 'from-purple-600 to-purple-800',
            'Meetings': 'from-yellow-600 to-yellow-800',
            'Reporting': 'from-red-600 to-red-800',
            'Research': 'from-green-600 to-green-800',
            'Marketing': 'from-pink-600 to-pink-800',
            'Finance': 'from-orange-600 to-orange-800',
            'SEO': 'from-indigo-600 to-indigo-800',
            'CRM': 'from-cyan-600 to-cyan-800',
            'Customer Support': 'from-amber-600 to-amber-800'
        };
        
        return categoryMap[category] || 'from-gray-600 to-gray-800';
    };

    // Shorten description if too long
    const shortenDescription = (desc) => {
        return desc.length > 100 ? desc.substring(0, 100) + '...' : desc;
    };

    // Filter active tasks
    const activeTasks = tasks.filter(task => task.active);

    return (
        <div>
            {statusChangeMessage && (
                <div className='fixed top-4 right-4 bg-gradient-to-r from-green-600 to-green-800 text-white p-4 rounded-lg shadow-lg z-50 animate-fade-in flex justify-between items-center max-w-md'>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p>{statusChangeMessage}</p>
                    </div>
                    <button 
                        onClick={() => setStatusChangeMessage('')}
                        className='text-white hover:text-gray-200'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            )}
            
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">My Tasks</h2>
                <p className="text-gray-400">Manage and track your assigned tasks</p>
            </div>
            
            <div id='tasklist' className='h-[55%] w-full py-5 flex items-center overflow-x-auto justify-start gap-6 flex-nowrap mt-4'>
                {activeTasks.length > 0 ? (
                    activeTasks.map((task, index) => (
                        <div 
                            key={index} 
                            className={`p-5 flex-shrink-0 h-full w-[320px] rounded-xl bg-gradient-to-br ${getPriorityColor(task.category)} flex flex-col justify-between card-hover shadow-xl`}
                        >
                            <div>
                                <div className='flex justify-between items-center mb-4'>
                                    <span className='bg-black/30 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-medium text-white'>
                                        {task.category}
                                    </span>
                                    <span className='text-white/80 text-sm flex items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                        </svg>
                                        {formatDate(task.date)}
                                    </span>
                                </div>

                                <h2 className='mt-4 text-2xl font-bold text-white'>{task.title}</h2>
                                <p className='text-white/70 mt-3 leading-relaxed'>{shortenDescription(task.description)}</p>
                            </div>
                            
                            <div className='mt-6 flex justify-between gap-2'>
                                <button 
                                    onClick={() => handleStatusChange(task.title, 'completed')}
                                    className='flex-1 bg-black/30 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center backdrop-blur-sm'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Complete
                                </button>
                                <button 
                                    onClick={() => handleStatusChange(task.title, 'failed')}
                                    className='flex-1 bg-black/30 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center backdrop-blur-sm'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    Failed
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='w-full text-center py-20 bg-gray-900/30 rounded-xl backdrop-blur-sm'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <h3 className='text-xl text-gray-400 font-medium'>No active tasks assigned to you</h3>
                        <p className='text-gray-500 mt-2'>All tasks have been completed or you have no new assignments</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TaskList