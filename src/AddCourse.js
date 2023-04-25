import {useNavigate} from "react-router-dom";
import React, {useState, useEffect } from "react";
import './style.css';

const AddCourse = ({userId}) => {
    //const response = fetch(`http://localhost:5000/classes/${userId}/addcourse`)
   
    const [classid, setID] = useState('');
    const [classtitle, setTitle] = useState('');
    const[description,setDescription] = useState('');
    const [role, setRole] = useState('');
    const [count, setCount] = useState(0);

    let navigate = useNavigate(); 
 
    useEffect (()=>
    {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/getrole/${userId}`);
            const data = await response.json();
            setRole(data.role);
        }
        fetchData();
    },[userId])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            classid: classid,
            classtitle: classtitle,
            description: description,}
    

        const response = await fetch(`http://localhost:5000/classes/${userId}/addcourse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            
        const data = await response.json(); 
        setCount(Object.keys(data).length);
        console.log(classid);
        console.log(classtitle);
        console.log(description);
        console.log(count);
        navigate(`/courses/${userId}`);
    }
  

    if(role == 'Professor')
    {
        return (
        <div>
            <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-indigo-100 to-white-100">
                <div className="w-96 p-6 shadow-lg bg-white rounded-xl">
                <h1 className="text-1xl block text-center font-regular">Hi {role} {userId}!</h1>
                    <h2 className="text-2xl block text-center font-semibold">Add a new course</h2> 
                        
                        <form className="" onSubmit={handleSubmit}>
                            <label htmlFor="classid" className="block text-base mb-2">Class ID</label>
                            <input value={classid} onChange={(e) => setID(e.target.value)} type="classid" placeholder="12345" id="classid" name="classid" className="mb-2 bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />

                            <label htmlFor="classtitle" className="block text-base mb-2">Class Title</label>
                            <input value={classtitle} onChange={(e) => setTitle(e.target.value)} type="classtitle" placeholder="PiazzaBulls 101" id="classtitle" name="classtitle" className=" mb-2 bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />

                            
                            <label htmlFor="description" className="block text-base mb-2">Description</label>
                            <input value={description} onChange={(e) => setDescription(e.target.value)} type="description" placeholder="This course covers..." id="description" name="description" className=" mb-2 bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                            <button type="submit"  className="mt-4 border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-lg hover:bg-indigo-500 hover:text-white font-semibold">Add Course</button>
                        </form>
                    </div>
                   </div> 

        </div>
    );
    }
    else //if(role==='Student' || role ==='TA')
    {
        return(
            <div>
                 <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-indigo-100 to-white-100">
                    <div className="w-96 p-6 shadow-lg bg-white rounded-xl">
                    <h1 className="text-1xl block text-center font-regular">{role}</h1>
                    <h2 className="text-2xl block text-center font-semibold">Join A Class</h2>
                    
                    <form className="" onSubmit={handleSubmit}>
                        <label htmlFor="classid" className="block text-base mb-2">Class ID</label>
                        <input value={classid} onChange={(e) => setID(e.target.value)} type="classid" placeholder="12345" id="classid" name="classid" className="mb-2 bg-white-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                        
                        <button type="submit"  className="mt-4 border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-lg hover:bg-indigo-500 hover:text-white font-semibold">Add Course</button>
                        
                    </form>
                   </div> 
                   </div>

            </div>
        )
    }
    /*else
    {   
        return(
            <div>
                <p>
                    Not a valid role; 
                </p>
            </div>
        )
    }*/
    
   
          
        

}
export default AddCourse;