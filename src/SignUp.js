import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './style.css';

const SignUp = () => {
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const[role,setSelects ] = useState();
    const [errors, setErrors] = useState({});
    const [userExists, setUserExists] = useState(null);

    let navigate = useNavigate(); 
    
 //check if user exists  
const fetchUserExists = async () => {
      const response = await fetch(`http://localhost:5000/checkUserExists/${email}`);
      const data = await response.json();
      setUserExists(data);
    return data;
};
 

    //validation function 
    const validateForm = async () =>  {
        let errors = {};
        let isValid = true;
        
        fetchUserExists();
      
        if (!username.trim()) {
            errors.username = 'Username is required';
            isValid = false;
        }
    
        await fetchUserExists();
        console.log("user exists: " + userExists);
        
        if(userExists || userExists === null){
            errors.userExists = 'User already exists';
            isValid = false;
         }

        if (!email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
            isValid = false;
        }
        
    
        if (!pass.trim()) {
            errors.pass = 'Password is required';
            isValid = false;
        } else if (pass.trim().length < 6) {
            errors.pass = 'Password must be at least 6 characters long';
            isValid = false;
        }
        // if role is not selected
        if (!role) {
            errors.role = 'Role is required';
            isValid = false;
        }


        setErrors(errors);
    
        return isValid;
    };
    

    
    //connect here 
    const handleSubmit = async (e) => {
        e.preventDefault();
            
       
        // TODO:  check if user exists already, hash password before sending to server
        //async (req, res) =>
        const body = {
            role: role,
            username: username,
            email: email,
            password: pass
        }
        
        
        if(validateForm()){
        
        const response = fetch('http://localhost:5000/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => console.log(response));
        console.log(role);
        console.log(username);
        console.log(email);
        console.log(pass);
        console.log(response);
        navigate(`/log-in`);

        
    }
    }

    

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-indigo-100 to-white-100">
            <div className="w-96 p-6 shadow-lg bg-white rounded-xl">
                <h2 className="text-2xl block text-center font-semibold">SignUp Here</h2>
                <form className="" onSubmit={handleSubmit}>
                    <label htmlFor="role" className="block text-base mb-2">Role</label>
                    <select value={role} onChange={(e) => setSelects(e.target.value)} type="role" placeholder="role" id="role" name="role" className="mb-2 bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">  
                        <option>Select Role</option>
                        <option>Student</option>
                        <option>Professor</option>
                        <option>TA</option>
                    </select>
                    {errors.role && <span className="text-red-500">{errors.role}</span>}
                   

                    <label htmlFor="username" className="block text-base mb-2">Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="username" id="username" name="username" className="mb-2 bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                    {errors.username && <span className="text-red-500">{errors.username}</span>}
                    
                    <label htmlFor="email" className="block text-base mb-2">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" id="email" name="email" className=" mb-2 bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                    {errors.userExists && <span className="text-red-500">{errors.userExists} </span>}

                    <label htmlFor="password" className="block text-base mb-2">Password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="password" id="password" name="password" className=" mb-2 bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                    {errors.pass && <span className="text-red-500">{errors.pass}</span>}

                    <button type="submit" className="mt-4 border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-lg hover:bg-indigo-500 hover:text-white font-semibold">SignUp</button>
                </form>
                <div className="p-5 font-medium text-center text-black hover:underline dark:text-primary-500">
                    <Link to="/log-in" >Already have an account? Login here</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;