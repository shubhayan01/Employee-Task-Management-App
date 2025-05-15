import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const Header = ({ setUser }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [userName, setUserName] = useState('User');
  const { employees } = useContext(AuthContext);
  
  useEffect(() => {
    // Check if the current user is stored in localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser === 'admin') {
      setUserName('Admin');
    } else if (currentUser?.type === 'employee' && currentUser?.id) {
      // Find employee by id
      const employee = employees?.find(emp => emp.id === currentUser.id);
      if (employee) {
        setUserName(employee.name);
      }
    }
  }, [employees]);

  const logOutUser = () => {
    setShowConfirm(true);
  }

  const handleConfirmLogout = () => {
    setUser(null);
    setShowConfirm(false);
  }

  const handleCancelLogout = () => {
    setShowConfirm(false);
  }

  // Determine avatar color based on name
  const getAvatarColor = () => {
    const colors = [
      'bg-blue-600', 'bg-purple-600', 'bg-green-600', 
      'bg-red-600', 'bg-yellow-600', 'bg-pink-600'
    ];
    
    // Simple hash function to pick a consistent color
    const nameHash = userName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[nameHash % colors.length];
  };

  // Get initials for avatar
  const getInitials = () => {
    return userName.charAt(0).toUpperCase();
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    
    if (hours < 12) return 'Good Morning';
    if (hours < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className='flex items-center justify-between relative py-4 border-b border-gray-800 mb-4'>
      <div className='flex items-center'>
        <div className={`${getAvatarColor()} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
          {getInitials()}
        </div>
        <div className='ml-4'>
          <h3 className='text-gray-400 text-sm font-medium'>{getCurrentTime()}</h3>
          <h1 className='text-2xl font-bold text-white flex items-center'>
            {userName}
            {userName === 'Admin' && (
              <span className='ml-2 bg-purple-600 text-xs py-1 px-2 rounded-full font-normal'>
                Admin
              </span>
            )}
          </h1>
        </div>
      </div>
      
      <button 
        onClick={logOutUser} 
        className='bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center shadow-lg btn-glow'
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414a1 1 0 00-.293-.707L11.414 2.414A1 1 0 0010.707 2H4a1 1 0 00-1 1zm9 5a1 1 0 00-1-1H8a1 1 0 00-1 1v8a1 1 0 001 1h3a1 1 0 001-1V8z" clipRule="evenodd" />
          <path d="M7 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4.414a2 2 0 00-.293-.707l-4-4A2 2 0 0011.586 1H7zm5 5a1 1 0 001 1h4a1 1 0 001-1V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v1z" />
        </svg>
        Logout 
      </button>

      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in backdrop-blur-sm">
          <div className="glass-effect p-6 rounded-xl shadow-2xl max-w-md w-full transform transition-all duration-300">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Confirm Logout
            </h2>
            <p className="text-gray-300 mb-6">Are you sure you want to logout from your account?</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={handleCancelLogout}
                className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors duration-300"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmLogout}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition-colors duration-300 shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header