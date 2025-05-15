import React from 'react'
import Header from '../other/Header'
import TasklistNumber from '../other/TasklistNumber'
import TaskList from '../tasklist/TaskList'

const Employeedash = ({ setUser, employeeId }) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-black'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <Header setUser={setUser} />
        
        <div className="mt-4">
          <TasklistNumber employeeId={employeeId} />
        </div>
        
        <div className="mt-10">
          <TaskList employeeId={employeeId} />
        </div>
      </div>
    </div>
  )
}

export default Employeedash