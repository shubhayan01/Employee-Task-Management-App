import React, { useState, useEffect } from 'react';
import { getEmployeeTasks } from '../../utils/Localstorage';

const TasklistNumber = ({ employeeId }) => {
    const [stats, setStats] = useState({
        active: 0,
        completed: 0,
        failed: 0,
        newTasks: 0
    });

    useEffect(() => {
        if (employeeId) {
            const tasks = getEmployeeTasks(employeeId);
            const statsData = {
                active: tasks.filter(task => task.active).length,
                completed: tasks.filter(task => task.completed).length,
                failed: tasks.filter(task => task.failed).length,
                newTasks: tasks.filter(task => task.newTask).length
            };
            setStats(statsData);
        }
    }, [employeeId]);

    const statCards = [
        {
            title: 'Completed Tasks',
            value: stats.completed,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-400 opacity-80" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            ),
            bgColor: 'from-green-500 to-emerald-700',
            textColor: 'text-green-100'
        },
        {
            title: 'Active Tasks',
            value: stats.active,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400 opacity-80" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
            ),
            bgColor: 'from-blue-500 to-indigo-700',
            textColor: 'text-blue-100'
        },
        {
            title: 'New Assignments',
            value: stats.newTasks,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-400 opacity-80" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                </svg>
            ),
            bgColor: 'from-yellow-500 to-amber-700',
            textColor: 'text-yellow-100'
        },
        {
            title: 'Failed Tasks',
            value: stats.failed,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400 opacity-80" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            ),
            bgColor: 'from-red-500 to-rose-700',
            textColor: 'text-red-100'
        }
    ];

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8'>
            {statCards.map((card, index) => (
                <div 
                    key={index} 
                    className={`rounded-xl bg-gradient-to-br ${card.bgColor} p-6 shadow-xl card-hover relative overflow-hidden`}
                >
                    <div className="absolute top-0 right-0 opacity-20 transform translate-x-4 -translate-y-1">
                        {card.icon}
                    </div>
                    <div className='flex flex-col justify-center h-full'>
                        <h2 className='text-4xl font-bold text-white'>{card.value}</h2>
                        <h3 className={`${card.textColor} text-lg font-medium mt-1`}>{card.title}</h3>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TasklistNumber