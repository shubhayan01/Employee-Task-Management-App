# Employee Management System

A sleek, modern task management solution built with React and TailwindCSS that streamlines employee task assignment and performance tracking.

## STAR Analysis

### Situation
Traditional employee task management systems often suffer from complex interfaces, poor user experience, and limited visibility into task progress and employee performance.

### Task
Create an intuitive, visually appealing task management system that allows administrators to assign tasks to employees and track their completion rates, while enabling employees to manage their workload effectively.

### Action
- Developed a responsive React application with role-based access control
- Implemented an elegant dark-themed UI with glassmorphism effects and gradients
- Created separate dashboard experiences for administrators and employees
- Built a real-time statistics system to visualize task completion rates
- Utilized React Context API for state management across components
- Employed localStorage for data persistence without backend dependencies

### Result
- Streamlined task assignment process for administrators
- Improved task visibility and management for employees
- Enhanced performance tracking through intuitive visual statistics
- Created a modern, responsive interface that works across all devices
- Delivered a completely functional system with zero backend requirements

## Features

- **Role-Based Access**: Separate dashboards for admins and employees
- **Task Assignment**: Admins can create and assign tasks to specific employees
- **Task Management**: Employees can mark tasks as completed or failed
- **Performance Analytics**: Visual statistics tracking employee productivity
- **Modern UI**: Dark-themed interface with elegant visual effects

## Installation

```bash
# Clone the repository
git clone https://github.com/shubhayan01/employee-management-system.git

# Navigate to project directory
cd employee-management-system

# Install dependencies
npm install

# Start development server
npm run dev
```

## Usage

### Admin Access
- Email: admin@gmail.com
- Password: admin

### Employee Access
- Sample credentials:
  - Email: khushi@eg.com / Password: 123
  - Email: shbhayan@eg.com / Password: 456

## Technologies

- React + Vite
- TailwindCSS
- React Context API
- LocalStorage

## Project Structure

```
src/
├── components/
│   ├── auth/         # Authentication components
│   ├── dashboards/   # Admin and employee dashboards
│   ├── other/        # Shared components
│   └── tasklist/     # Task management components
├── context/          # Context providers
├── utils/            # Utility functions
└── App.jsx           # Main application component
```



## License

[MIT](LICENSE)
