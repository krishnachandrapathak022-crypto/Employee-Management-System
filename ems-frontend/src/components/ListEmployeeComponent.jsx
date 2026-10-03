import React,{useEffect, useState} from 'react'

import { useNavigate } from 'react-router-dom'
import { listEmployee, deleteEmployee } from '../services/EmployeeServices'


const ListEmployeeComponent = () => {
  
  const[employees,setEmployees] = useState([])
  const navigator = useNavigate();

  useEffect(()=>{
        getAllEmployees();

  }, [])

  function getAllEmployees(){
       listEmployee().then((Response) =>{
        setEmployees(Response.data);
    } ).catch(error => {
        console.error(error);
    })

  }

  function addNewEmployee(){
    navigator('/add-employee')
  }
  
  function updateEmployee(id){
   navigator(`/edit-employee/${id}`);
  }

  function removeEmployee(id){
    console.log(id);

    deleteEmployee(id).then((Response) => {
         getAllEmployees();
    }).catch(error => {
        console.error(error);
    })
  }



  return (
    <div className='container'>

       <h2 className='text-center'>List of employee</h2>
       <div className='text-start'>
       <button className='btn btn-primary text-start mb-2 ' onClick={addNewEmployee}>Add Employee</button>
       </div>
       <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                    <th>Actisons</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee =>
                        <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>
                            <button className='btn btn-info' onClick = { () => updateEmployee(employee.id)}>Update</button>
                            <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                                 style={{marginLeft : '10px'}}
                            >Delete</button>
                        </td>
                    </tr>)
                }
            </tbody>

        </table>

    </div>
  )
}

export default ListEmployeeComponent
