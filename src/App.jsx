import React, { useContext, useState, useEffect } from 'react';
import Login from './components/auth/Login';
import Employeedash from './components/dashboards/Employeedash';
import Admindash from './components/dashboards/Admindash';
import AllTask from './components/other/AllTask';
import { AuthContext } from './context/AuthProvider';
import { setLocalStorage } from './utils/Localstorage';

const App = () => {
  const [user, setUser] = useState(null);
  const { employees, admin, updateUserData } = useContext(AuthContext);

  // Reset localStorage on first load
  useEffect(() => {
    // Clear any existing data
    localStorage.removeItem('employees');
    localStorage.removeItem('admin');
    localStorage.removeItem('currentUser');
    
    // Set localStorage with default data
    setLocalStorage();
  }, []);

  // Check if user was logged in before
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  const handleLogin = (email, password) => {
    if (email === 'admin@gmail.com' && password === 'admin') {
      setUser('admin');
    } else if (employees && employees.find((e) => email === e.email && password === e.password)) {
      const currentEmployee = employees.find((e) => email === e.email);
      setUser({ type: 'employee', id: currentEmployee.id });
    } else {
      alert('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      {!user ? <Login handleLogin={handleLogin} /> : null}
      {user?.type === 'employee' && <Employeedash employeeId={user.id} setUser={handleLogout} />}
      {user === 'admin' && (
        <>
          <Admindash setUser={handleLogout} />
          <AllTask />
        </>
      )}
    </div>
  );
};

export default App;
