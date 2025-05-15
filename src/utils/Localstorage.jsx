const employees = [
    {
        id: 1,
        name: "Khushi",
        email: "khushi@eg.com",
        password: "123",
        tasks: [
            {
                title: "Complete Project Report",
                description: "Prepare the monthly project status report.",
                date: "2025-05-15",
                category: "Reporting",
                active: true,
                newTask: false,
                completed: false,
                failed: false
            },
            {
                title: "Update Client Data",
                description: "Update the client information in the CRM system.",
                date: "2025-05-20",
                category: "CRM",
                active: true,
                newTask: true,
                completed: false,
                failed: false
            }
        ]
    },
    {
        id: 2,
        name: "Shbhayan",
        email: "shbhayan@eg.com",
        password: "456",
        tasks: [
            {
                title: "Design Landing Page",
                description: "Create a responsive design for the new landing page.",
                date: "2025-05-17",
                category: "Design",
                active: true,
                newTask: true,
                completed: false,
                failed: false
            },
            {
                title: "Fix CSS Bugs",
                description: "Resolve styling issues on the product pages.",
                date: "2025-05-18",
                category: "Development",
                active: false,
                newTask: false,
                completed: true,
                failed: false
            },
            {
                title: "Team Meeting",
                description: "Discuss project progress with the design team.",
                date: "2025-05-19",
                category: "Meetings",
                active: true,
                newTask: false,
                completed: false,
                failed: false
            }
        ]
    },
    {
        id: 3,
        name: "Pankaj",
        email: "pankaj@eg.com",
        password: "789",
        tasks: [
            {
                title: "Code Review",
                description: "Review code submitted by junior developers.",
                date: "2025-05-16",
                category: "Development",
                active: true,
                newTask: true,
                completed: false,
                failed: false
            },
            {
                title: "Client Presentation",
                description: "Present the project update to the client.",
                date: "2025-05-21",
                category: "Meetings",
                active: false,
                newTask: false,
                completed: false,
                failed: true
            },
            {
                title: "Database Optimization",
                description: "Improve the performance of the database queries.",
                date: "2025-05-22",
                category: "Development",
                active: true,
                newTask: true,
                completed: false,
                failed: false
            }
        ]
    },
    {
        id: 4,
        name: "Arjun",
        email: "arjun@eg.com",
        password: "101",
        tasks: [
            {
                title: "Prepare Financial Report",
                description: "Compile the monthly financial report for management.",
                date: "2025-05-23",
                category: "Finance",
                active: true,
                newTask: false,
                completed: false,
                failed: false
            },
            {
                title: "Market Research",
                description: "Conduct research on potential new markets.",
                date: "2025-05-25",
                category: "Research",
                active: true,
                newTask: true,
                completed: false,
                failed: false
            }
        ]
    },
    {
        id: 5,
        name: "Preeti",
        email: "preeti@eg.com",
        password: "202",
        tasks: [
            {
                title: "Content Creation",
                description: "Develop content for the upcoming product launch.",
                date: "2025-05-26",
                category: "Marketing",
                active: true,
                newTask: true,
                completed: false,
                failed: false
            },
            {
                title: "Website Audit",
                description: "Perform a complete audit of the website for SEO improvements.",
                date: "2025-05-27",
                category: "SEO",
                active: false,
                newTask: false,
                completed: true,
                failed: false
            },
            {
                title: "Client Onboarding",
                description: "Assist with the onboarding process for a new client.",
                date: "2025-05-28",
                category: "Customer Support",
                active: true,
                newTask: true,
                completed: false,
                failed: false
            }
        ]
    }
];

const admin = [
    {
        id: 101,
        email: "admin@gmail.com",
        password: "admin"
    }
];

export const calculateTaskStats = () => {
    const { employees } = getLocalStorage();
    const stats = {
        totalAssigned: 0,
        completed: 0,
        failed: 0,
        active: 0,
        employeeStats: []
    };
    
    employees.forEach(employee => {
        const employeeStat = {
            id: employee.id,
            name: employee.name,
            totalTasks: employee.tasks.length,
            completed: employee.tasks.filter(task => task.completed).length,
            failed: employee.tasks.filter(task => task.failed).length,
            active: employee.tasks.filter(task => task.active).length
        };
        
        stats.totalAssigned += employeeStat.totalTasks;
        stats.completed += employeeStat.completed;
        stats.failed += employeeStat.failed;
        stats.active += employeeStat.active;
        stats.employeeStats.push(employeeStat);
    });
    
    return stats;
};

export const setLocalStorage = () => {
    // Always reset the localStorage with the current data
    localStorage.setItem('employees', JSON.stringify(employees));
    localStorage.setItem('admin', JSON.stringify(admin));
};

export const getLocalStorage = () => {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const admin = JSON.parse(localStorage.getItem('admin')) || [];
    return { employees, admin }
}

export const assignTaskToEmployee = (employeeId, taskData) => {
    const { employees } = getLocalStorage();
    const updatedEmployees = [...employees];
    
    const employeeIndex = updatedEmployees.findIndex(emp => emp.id === employeeId);
    if (employeeIndex !== -1) {
        const newTask = {
            ...taskData,
            active: true,
            newTask: true,
            completed: false,
            failed: false
        };
        
        updatedEmployees[employeeIndex].tasks.push(newTask);
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        return true;
    }
    return false;
};

export const updateTaskStatus = (employeeId, taskTitle, status) => {
    const { employees } = getLocalStorage();
    const updatedEmployees = [...employees];
    
    const employeeIndex = updatedEmployees.findIndex(emp => emp.id === employeeId);
    if (employeeIndex !== -1) {
        const taskIndex = updatedEmployees[employeeIndex].tasks.findIndex(
            task => task.title === taskTitle
        );
        
        if (taskIndex !== -1) {
            updatedEmployees[employeeIndex].tasks[taskIndex] = {
                ...updatedEmployees[employeeIndex].tasks[taskIndex],
                active: false,
                completed: status === 'completed',
                failed: status === 'failed',
                completedDate: new Date().toISOString().split('T')[0]
            };
            
            localStorage.setItem('employees', JSON.stringify(updatedEmployees));
            return true;
        }
    }
    return false;
};

export const getEmployeeTasks = (employeeId) => {
    const { employees } = getLocalStorage();
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.tasks : [];
};

export const getEmployeesList = () => {
    const { employees } = getLocalStorage();
    return employees.map(({ id, name, email }) => ({ id, name, email }));
};
