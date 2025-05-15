import React, { useState, useEffect, useContext } from 'react';
import { calculateTaskStats, getLocalStorage } from '../../utils/Localstorage';
import { AuthContext } from '../../context/AuthProvider';

const AllTask = () => {
    const [taskStats, setTaskStats] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' or 'statistics'
    const { updateUserData } = useContext(AuthContext);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        // Get all tasks and flatten them with employee info
        const { employees } = getLocalStorage();
        const allTasksWithEmployeeInfo = [];
        
        employees.forEach(employee => {
            employee.tasks.forEach(task => {
                allTasksWithEmployeeInfo.push({
                    ...task,
                    employeeName: employee.name,
                    employeeId: employee.id,
                    employeeEmail: employee.email
                });
            });
        });
        
        setTasks(allTasksWithEmployeeInfo);
        
        // Calculate statistics
        const stats = calculateTaskStats();
        setTaskStats(stats);
    };

    // Get status label and color
    const getStatusInfo = (task) => {
        if (task.completed) {
            return { label: 'Completed', color: 'from-green-500 to-emerald-700', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            ) };
        } else if (task.failed) {
            return { label: 'Failed', color: 'from-red-500 to-rose-700', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            ) };
        } else if (task.newTask) {
            return { label: 'New', color: 'from-yellow-500 to-amber-700', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                </svg>
            ) };
        } else {
            return { label: 'In Progress', color: 'from-blue-500 to-indigo-700', icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
            ) };
        }
    };

    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12'>
            <div className='glass-effect rounded-xl overflow-hidden'>
                <div className='border-b border-gray-800'>
                    <nav className='flex'>
                        <button 
                            className={`py-4 px-6 font-medium flex items-center ${activeTab === 'tasks' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => setActiveTab('tasks')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                            </svg>
                            All Tasks
                        </button>
                        <button 
                            className={`py-4 px-6 font-medium flex items-center ${activeTab === 'statistics' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
                            onClick={() => setActiveTab('statistics')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                            </svg>
                            Employee Statistics
                        </button>
                    </nav>
                </div>

                <div className="p-6">
                {activeTab === 'tasks' ? (
                    <div>
                        <h2 className='text-xl font-bold text-white mb-6 flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            All Assigned Tasks
                        </h2>
                        
                        <div className="space-y-4 max-h-[65vh] overflow-y-auto custom-scrollbar pr-2">
                            {tasks.length > 0 ? tasks.map((task, index) => {
                                const statusInfo = getStatusInfo(task);
                                
                                return (
                                    <div 
                                        key={index} 
                                        className={`bg-gradient-to-r ${statusInfo.color} py-4 px-6 rounded-lg flex items-center mb-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 card-hover`}
                                    >
                                        <div className="flex-1 flex items-center">
                                            <div className="mr-4 bg-black/30 h-10 w-10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                {statusInfo.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center">
                                                    <h2 className='font-semibold text-white text-lg'>{task.title}</h2>
                                                    <span className="ml-2 px-2 py-1 text-xs rounded-full bg-black/20 text-white/90">
                                                        {task.category}
                                                    </span>
                                                </div>
                                                <p className="text-white/70 text-sm">{formatDate(task.date)}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <div className="mr-6">
                                                <h3 className='text-white flex items-center font-medium'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                    </svg>
                                                    {task.employeeName}
                                                </h3>
                                                <p className="text-white/70 text-xs">{task.employeeEmail}</p>
                                            </div>
                                            <div className='text-white bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg text-sm'>
                                                {statusInfo.label}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }) : (
                                <div className="text-center py-12">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                    <h3 className="text-xl text-gray-400 font-medium">No tasks found</h3>
                                    <p className="text-gray-500 mt-2">Assign tasks to employees to see them here</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 className='text-xl font-bold text-white mb-6 flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Employee Performance Statistics
                        </h2>
                        
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
                            <div className='bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-5 text-white shadow-lg'>
                                <div className="flex justify-between items-start">
                                    <h3 className='text-blue-200 text-sm font-medium'>Total Tasks</h3>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300 opacity-50" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className='text-4xl font-bold mt-2'>{taskStats?.totalAssigned || 0}</p>
                            </div>
                            <div className='bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-5 text-white shadow-lg'>
                                <div className="flex justify-between items-start">
                                    <h3 className='text-green-200 text-sm font-medium'>Completed</h3>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-300 opacity-50" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className='text-4xl font-bold mt-2'>{taskStats?.completed || 0}</p>
                            </div>
                            <div className='bg-gradient-to-br from-red-600 to-red-800 rounded-lg p-5 text-white shadow-lg'>
                                <div className="flex justify-between items-start">
                                    <h3 className='text-red-200 text-sm font-medium'>Failed</h3>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-300 opacity-50" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className='text-4xl font-bold mt-2'>{taskStats?.failed || 0}</p>
                            </div>
                            <div className='bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg p-5 text-white shadow-lg'>
                                <div className="flex justify-between items-start">
                                    <h3 className='text-yellow-200 text-sm font-medium'>In Progress</h3>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-300 opacity-50" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className='text-4xl font-bold mt-2'>{taskStats?.active || 0}</p>
                            </div>
                        </div>
                        
                        <div className='bg-black/30 rounded-xl overflow-hidden border border-gray-800 shadow-lg backdrop-blur-sm'>
                            <div className='grid grid-cols-5 bg-gray-800/50 p-4'>
                                <div className='font-medium text-gray-300'>Employee</div>
                                <div className='font-medium text-gray-300 text-center'>Total Tasks</div>
                                <div className='font-medium text-gray-300 text-center'>Completed</div>
                                <div className='font-medium text-gray-300 text-center'>Failed</div>
                                <div className='font-medium text-gray-300 text-center'>Completion Rate</div>
                            </div>
                            
                            <div className="max-h-[45vh] overflow-y-auto custom-scrollbar">
                                {taskStats?.employeeStats.map((employee, index) => (
                                    <div key={index} className='grid grid-cols-5 p-4 border-b border-gray-800 hover:bg-white/5 transition-colors'>
                                        <div className='text-white font-medium'>{employee.name}</div>
                                        <div className='text-white text-center'>{employee.totalTasks}</div>
                                        <div className='text-green-400 text-center font-medium'>{employee.completed}</div>
                                        <div className='text-red-400 text-center font-medium'>{employee.failed}</div>
                                        <div className='text-center'>
                                            {employee.totalTasks > 0 ? (
                                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                                    <div 
                                                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2.5 rounded-full" 
                                                        style={{ width: `${Math.round((employee.completed / employee.totalTasks) * 100)}%` }}
                                                    ></div>
                                                </div>
                                            ) : (
                                                <span className="text-gray-500">No tasks</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
};

export default AllTask;