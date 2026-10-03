import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {
    createEmployee,
    getEmployee,
    updateEmployee
} from '../services/EmployeeServices'


const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const { id } = useParams();

      

    const[errors,setErrors] = useState({
        firstName :'',
        lastName :'',
        email :''
    })
    

    const navigate = useNavigate();

    useEffect (() => {
        
        if(id){
            getEmployee(id).then((Response) => {

                setFirstName(Response.data.firstName);
                setLastName(Response.data.lastName);
                setEmail(Response.data.email); 

            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])

    function saveOrUpdateEmployee(e) {

        e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const employee = {
        firstName,
        lastName,
        email
    };

    console.log(employee);

    if (id) {

        updateEmployee(id, employee)
            .then((Response) => {

                console.log(Response.data);

                navigate('/employees');

            })
            .catch(error => {
                console.error(error);
            });

    } else {

        createEmployee(employee)
            .then((Response) => {

                console.log(Response.data);

                navigate('/employees');

            })
            .catch(error => {
                console.error(error);
            });
    }
}

    function validateForm(){
        let valid = true;

        const errorCopy = {...errors}
        
        if(firstName.trim()){
            errorCopy.firstName = '';
        }else{
            errorCopy.firstName = 'First name is required';
            valid = false;
        }

        if(lastName.trim()){
            errorCopy.lastName ='';
           
        }else{
            errorCopy.lastName  = 'last name is required';
             valid =false;
        }


        if(email.trim()){
            errorCopy.email = '';
        }else{
            errorCopy.email = 'Email is required';
            valid = false;
       }
        setErrors(errorCopy);

        return valid;
    
    }
    
    function pageTitle() {
            if (id) {
            return <h2 className="text-center">Update Employee</h2>;
    } else {
           return <h2 className="text-center">Add Employee</h2>;
       }
   }




    return (
        <div className="container">
        <br/> <br/>
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                {
                    pageTitle()
                }


                    <div className="card-body">

                        <form onSubmit={saveOrUpdateEmployee}>

                            {/* First Name */}
                            <div className="form-group mb-2">
                                <label className="form-label text-start d-block">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Employee First Name"
                                    name="firstName"
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' :''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                { errors.firstName && <div className='invalid-feedback text-start'> {errors.firstName} </div> }
                            </div>

                            {/* Last Name */}
                            <div className="form-group mb-2">
                                <label className="form-label text-start d-block">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Employee Last Name"
                                    name="lastName"
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' :''}`}
                                    onChange={(e) =>  setLastName(e.target.value)}
                                />
                                { errors.lastName && <div className='invalid-feedback text-start'> {errors.lastName} </div> }
                            </div>

                            {/* Email */}
                            <div className="form-group mb-2">
                                <label className="form-label text-start d-block">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter Employee Email Id"
                                    name="email"
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' :''}`}
                                    onChange={(e) =>  setEmail(e.target.value)}
                                />
                                { errors.email && <div className='invalid-feedback text-start'> {errors.email} </div> }
                            </div>

                            <button
                                type="submit"
                                className="btn btn-success text-start d-block" 
                            >
                                Submit
                            </button>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;
