import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Landing from "./Landing";
import Courses from "./Courses";
import Saved from "./Saved";
import Posts from "./Posts";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import NotFound from "./NotFound";
import AddCourse from "./AddCourse";


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      setAuthenticated(true);
    }
  }, []);

  const handleLogIn = (userId) => {
    localStorage.setItem('userId', userId);
    setUserId(userId);
    setAuthenticated(true);
  };

  // const handleLogOut = () => {
  //   localStorage.removeItem('isLoggedIn');
  //   setAuthenticated(false);
  // };

  return (
    <Routes path="/">
      <Route index element={<Landing />} />
      {
        authenticated && (
          <>
            <Route path={`courses/${userId}`} element={<Courses userId={userId}/>} />
            <Route path={`courses/${userId}/addcourse`} element={<AddCourse userId={userId}/>} />
            <Route path={`courses/${userId}/course/:id/posts`} element={<Posts userId={userId}/>} />
            <Route path={`courses/${userId}/course/:id/saved`} element={<Saved userId={userId}/>} />
          </>
        )
      }

      <Route path="sign-up" element={<SignUp />} />
      <Route path="log-in" element={<LogIn onLogin={handleLogIn}/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}

export default App;
