import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import Employee from './Employee';

export const EmployeeList = () => {

    const navigate = useNavigate();

    //employees state is used to get all employees from database and to set it into this React state so we can loop throught and display all records
    //This loading is just to define or to change the values until we have gotten the data
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        //when we are displaying the data we'll wait until this loading is changed 
        setLoading(true);
        //once the data is loaded we'll display the data
        try {
          const response = await EmployeeService.getEmployees();
          //update the state and pass the data that we get from the response
          setEmployees(response.data);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      };
      fetchData();
    }, []);
  
    const deleteEmployee = (e, id) => {
      e.preventDefault();
      EmployeeService.deleteEmployee(id).then((res) => {
        if (employees) {
          setEmployees((prevElement) => {
            return prevElement.filter((employee) => employee.id !== id);
          });
        }
      });
    };
  
    return (
      <div className="container mx-auto my-8">
        <div className="h-12">
          <button
            onClick={() => navigate("/addEmployee")}
            className="rounded bg-slate-600 text-white px-6 py-2 font-semibold">
            Add Employee
          </button>
        </div>
        <div className="flex shadow border-b">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                  First Name
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                  Last Name
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                  Email ID
                </th>
                <th className="text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            {!loading && (
                //once Loading is completed, display
                //use props to pas data in the child component Employee
              <tbody className="bg-white">
                {employees.map((employee) => (
                  <Employee
                    employee={employee}
                    key={employee.id}></Employee>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    );



    
}

export default EmployeeList;
