'use client'
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    department: string;
    gender: string;
    age: number;
    hair: {
        color: string
    };
    address: {
        address: string;
    }
    company: {
        department: string;

    };
}



interface DepartmentData {
    [department: string]: {
        male: number;
        female: number;
        ageRange: string;
        hair: Record<string, number>;
        addressUser: Record<string, string>;
    };
}

const Solution2Page = () => {
    const [users, setUsers] = useState<User[]>([]);
    //const [allDepartment, setAllDepartment] = useState<string[]>([]);
    const [departmentData, setDepartmentData] = useState<DepartmentData>({});
    const [count, setCount] = useState<number>(0);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://dummyjson.com/users');
            const fetchedUsers = response.data.users;
            setUsers(fetchedUsers);
        } catch (error) {
            console.error('Error fetching users data:', error);
        }
    };

    /*  const groupAllDepartment = () => {
         users.map((user) => {
             const department = user.company.department;
             if (!allDepartment.includes(department)) {
                 setAllDepartment(prevDepartments => [...prevDepartments, department]);
             }
         });
     } */
    const groupDepartmentData = useCallback(() => {
        const departmentData: DepartmentData = {};
        const allDepartment: string[] = [];
        users.forEach((user) => {
            const department = user.company.department;
            if (!allDepartment.includes(department)) {
                allDepartment.push(department);
            }
        });
        allDepartment.forEach((department) => {
            const data: {
                male: number;
                female: number;
                ageRange: string;
                hair: Record<string, number>;
                addressUser: Record<string, string>;
            } = {
                male: 0,
                female: 0,
                ageRange: "",
                hair: {},
                addressUser: {}
            };
            let lowAge: number = 100;
            let highAge: number = 0;
            let totalUsers: number = 0;
            const hair: string[] = [];
            users.forEach((user) => {
                if (user.company.department === department) {
                    //check gender
                    if (user.gender === 'male') {
                        data.male++;
                    } else if (user.gender === 'female') {
                        data.female++;
                    }
                    //check ahe
                    if (user.age < lowAge) {
                        lowAge = user.age;
                    }
                    if (user.age > highAge) {
                        highAge = user.age;
                    }
                    //address
                    data.addressUser[`${user.firstName}${user.lastName}`] = user.address.address;
                    //hair
                    if (!hair.includes(user.hair.color)) {
                        hair.push(user.hair.color)
                        data.hair[`${user.hair.color}`] = 1;
                    } else {
                        data.hair[`${user.hair.color}`] += 1;
                    }
                    totalUsers++;
                }

            });
            if (totalUsers > 1) {
                data.ageRange = lowAge + "-" + highAge;
            } else {
                data.ageRange = lowAge.toString()
            }

            departmentData[department] = data;
        });
        setDepartmentData(departmentData);
    }, [users]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        groupDepartmentData();
    }, [users]);

    return (
        <div>
            {Object.entries(departmentData).map(([department, data]) => (
                <div key={department}>
                    <pre>{JSON.stringify({ [department]: data }, null, 2)}</pre>
                </div>
            ))}
        </div>
    );
};

export default Solution2Page;
