import React from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'

const Admindash = ({ setUser }) => {
    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 to-black'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
                <Header setUser={setUser} />
                
                <div className="mt-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h2>
                        <p className="text-gray-400">Assign tasks and manage employees</p>
                    </div>
                    
                    <CreateTask />
                </div>
            </div>
        </div>
    )
}

export default Admindash