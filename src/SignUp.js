import React, {useState} from "react";
import {Link} from "react-router-dom";
import './style.css';
const SignUp = (props) => {
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');


     //connect here <- currently just logging it 
   const handleSubmit = (e) => 
   {
      e.preventDefault();
      console.log(role);
      console.log(username);
      console.log(email);
      console.log(pass);
   }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-indigo-100 to-white-100">
        <div className = "w-96 p-6 shadow-lg bg-white rounded-xl">
            <h2 className="text-2xl block text-center font-semibold">SignUp Here</h2>
        <form  className= "" onSubmit ={handleSubmit}>
            <label htmlFor="role" className="block text-base mb-2">Role</label>
            <input value={role} onChange={(e)=>setRole(e.target.value)} type="role" placeholder="role" id="role" name="role" className="mb-2 bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"/>

            <label htmlFor="username" className="block text-base mb-2">Username</label>
            <input value={username} onChange={(e)=>setUsername(e.target.value)} type="username" placeholder="username" id="username" name="username" className="mb-2 bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"/>
            
            <label htmlFor="email" className="block text-base mb-2">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="email" id="email" name="email" className=" mb-2 bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"/>

            <label  htmlFor="password" className="block text-base mb-2">Password</label>
            <input value={pass} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="password" id="password" name="password" className=" mb-2 bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"/>
            
            <button type="submit" className="mt-4 border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-lg hover:bg-indigo-500 hover:text-white font-semibold">SignUp</button>
       </form>
       <div className="p-5 text-center font-medium text-center text-black hover:underline dark:text-primary-500">
       <Link to="/log-in" >Already have an account? Login here</Link>
       </div>
        </div>
        </div>
    );
}

export default SignUp;