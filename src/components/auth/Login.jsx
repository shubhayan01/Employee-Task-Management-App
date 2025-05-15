import React, { useState } from 'react';

const Login = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showHelp, setShowHelp] = useState(true);

    const submitHandler = (e) => {
        e.preventDefault();
        handleLogin(email, password);
        setEmail('');
        setPassword('');
    };

    const sampleCredentials = [
        { role: 'Admin', email: 'admin@gmail.com', password: 'admin' },
        { role: 'Employee', email: 'khushi@eg.com', password: '123' },
        { role: 'Employee', email: 'shbhayan@eg.com', password: '456' },
        { role: 'Employee', email: 'pankaj@eg.com', password: '789' },
        { role: 'Employee', email: 'arjun@eg.com', password: '101' },
        { role: 'Employee', email: 'preeti@eg.com', password: '202' },
    ];

    const useCredential = (cred) => {
        setEmail(cred.email);
        setPassword(cred.password);
    };

    return (
        <div className='flex flex-col min-h-screen w-full items-center justify-center bg-gradient-to-b from-black to-gray-900'>
            {/* Background pattern */}
            <div className="absolute inset-0 bg-black opacity-60 z-0">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMjEyMTIiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoLTZWMGg2djMwem0tNiAwaC02VjBoNnYzMHpNMzAgNTRWMzZoNnYxOGgtNnptLTYgMFYzNmg2djE4aC02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
            </div>

            <div className="z-10 flex flex-col items-center max-w-5xl w-full px-4">
                <div className="text-center mb-12">
                    <h1 className='text-5xl font-bold text-white mb-3 tracking-tight'>
                        Employee Management System
                    </h1>
                    <p className="text-gray-400 text-lg">Manage tasks, track progress, and boost productivity</p>
                </div>

                <div className='w-full max-w-md relative overflow-hidden backdrop-blur-sm bg-black/30 rounded-2xl p-8 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)] border border-gray-800'>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600"></div>
                    
                    <h2 className="text-2xl font-semibold text-white mb-6 text-center">Login to Dashboard</h2>
                    
                    <form className='flex flex-col items-center justify-center space-y-6' onSubmit={submitHandler}>
                        <div className="w-full relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                            <input
                                required
                                className='w-full pl-10 focus:ring-2 focus:ring-blue-500 bg-gray-900/50 border border-gray-700 text-white rounded-lg py-3 px-4 transition-all duration-300 focus:border-blue-500 outline-none'
                                type="text"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        
                        <div className="w-full relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                required
                                className='w-full pl-10 focus:ring-2 focus:ring-blue-500 bg-gray-900/50 border border-gray-700 text-white rounded-lg py-3 px-4 transition-all duration-300 focus:border-blue-500 outline-none'
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        
                        <button 
                            type="submit"
                            className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg'
                        >
                            Sign In
                        </button>
                    </form>

                    <div className='mt-6 text-center'>
                        <button 
                            onClick={() => setShowHelp(!showHelp)}
                            className='text-blue-400 hover:text-blue-300 text-sm inline-flex items-center transition-colors duration-300'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            {showHelp ? 'Hide Credentials' : 'Need Help?'}
                        </button>
                        
                        {showHelp && (
                            <div className='mt-4 bg-gray-900/80 p-5 rounded-lg text-left border border-gray-800 shadow-lg backdrop-blur-sm'>
                                <h3 className='text-white font-medium mb-3 flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                    </svg>
                                    Sample Credentials
                                </h3>
                                <div className='space-y-2 overflow-y-auto max-h-60 custom-scrollbar'>
                                    {sampleCredentials.map((cred, index) => (
                                        <div 
                                            key={index} 
                                            className='text-gray-300 text-sm flex justify-between items-center p-2 rounded hover:bg-gray-800/50 transition-colors border border-gray-800/50'
                                        >
                                            <div>
                                                <span className={`${cred.role === 'Admin' ? 'bg-purple-600' : 'bg-blue-600'} px-2 py-1 rounded mr-2 text-xs font-medium`}>
                                                    {cred.role}
                                                </span>
                                                <span className='text-green-400 font-medium'>Email:</span> {cred.email} | 
                                                <span className='text-green-400 font-medium'> Password:</span> {cred.password}
                                            </div>
                                            <button 
                                                onClick={() => useCredential(cred)}
                                                className='text-xs bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-3 py-1 rounded-full transition-colors shadow'
                                            >
                                                Use
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
