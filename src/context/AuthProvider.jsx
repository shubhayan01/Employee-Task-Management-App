import { createContext, useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/Localstorage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setuserData] = useState(null);

  useEffect(() => {
    // Wait a short time to ensure App.jsx has cleared localStorage if needed
    setTimeout(() => {
      // Initialize localStorage with default data if empty
      setLocalStorage(); 
      
      // Get the latest data from localStorage
      const { employees, admin } = getLocalStorage();
      setuserData({ employees, admin });
    }, 100);
  }, []);

  const updateUserData = (newData) => {
    setuserData(newData);
    localStorage.setItem('employees', JSON.stringify(newData.employees));
    localStorage.setItem('admin', JSON.stringify(newData.admin));
  };

  return (
    <AuthContext.Provider value={{ ...userData, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider