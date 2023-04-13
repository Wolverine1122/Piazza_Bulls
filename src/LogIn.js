import { Link } from "react-router-dom";
import React, {useState} from "react";
import './style.css';
export const LogIn = (props) => {
   const [username, setUsername] = useState('');
   const [pass, setPass] = useState('');

   //connect here <- currently just logging it 
   const handleSubmit = (e) => 
   {
      e.preventDefault();
      console.log(username);
      console.log(pass);
   }
    
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-indigo-100 to-white-100">
        <div className = "w-96 p-6 shadow-lg bg-white rounded-xl">
            <h2 className="text-2xl block text-center font-semibold">Login Here</h2>
        <form  className= "" onSubmit ={handleSubmit}>
            <label htmlFor="username" className="block text-base mb-2">Username</label>
            <input value={username} onChange={(e)=>setUsername(e.target.value)} type="username" placeholder="username" id="username" name="username" className="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"/>
            
            <label  htmlFor="password" className="block text-base mt-2 mb-2">Password</label>
            <input value={pass} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="password" id="password" name="password" className="bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"/>
            <button type="submit" className=" mt-5 border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-lg hover:bg-indigo-500 hover:text-white font-semibold ">Login</button>
       </form>
       <div className="p-5 text-center font-medium text-black hover:underline dark:text-primary-500">
       <Link to="/sign-up" >Don't have an account? Sign up here</Link>
       </div>
        </div>
        </div>
    );
}

export default LogIn;