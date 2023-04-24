 import {Link,  useParams, useNavigate} from "react-router-dom";
  import React, {useState, useEffect } from "react";
  import './style.css';

// TODO: add a text if there are no courses
const Courses = (props) => {
    const { username } = useParams();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/classes/${username}`);
            const data = await response.json();
            setClasses(data);
        }
        fetchData();
    }, [username]); 

   

    return ( 
        <div className="">
       <header aria-label="Page Header" className="bg-gray-50">
  <div className="mx-auto max-w-screen-xl px-4 py-8" style={{height:'80%'}}>
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="text-center sm:text-left">
      <h1 className=" mt-4 mb-4 text-4xl font-semibold	 text-gray-900"> Welcome<span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-600 from-sky-400 ">  {username}! </span> </h1>   
    

        <p className="mt-1.5 text-sm text-gray-500">
          Here are your current courses
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">

      <Link to={`/courses/${username}/addcourse`}>
        <button
          className="mr-5 block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
          type="button"
        >
          + New Course
        </button>
        </Link>
      </div>
    </div>
  </div>
</header>

 
            <hr></hr>
           

            <ul className="m-5">
            <h3 className="m-5 text-3xl font-semibold">Courses</h3>
            <div className="grid grid-cols-3 gap-5 mr-4">  
              
                {classes.map((course) => (
                    
                    <li key={course.classid}>
                            
                
                    <div className="w-full m-5 p-6 bg-white border border-gray-200 rounded-lg shadow ">
                    <Link to={`/classes/${course.classid}/posts`}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900"> {course.classtitle} </h5>
                            <h2 className="mb-2  font-regular tracking-tight text-gray-600">ClassID: {course.classid}</h2>
                            </Link>
                        <p className="mb-3 font-normal text-gray-700 ">{course.description}</p>
                        <Link to={`/courses/${course.classid}/posts`}  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600" >Posts                           
                        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    
                        </Link>
                        
                    </div>

    
                    </li>
                  
                ))}
                </div>
            </ul>

        </div>
    );
}

export default Courses;