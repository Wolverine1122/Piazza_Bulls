import { createBrowserRouter as Router, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

import Landing from "./Landing";
import Courses from "./Courses";
import Posts from "./Posts";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import NotFound from "./NotFound";

const router = Router(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Landing />} />
      <Route path="courses/:username" element={<Courses />}/>
      
      <Route path="classes/:id/posts" element={<Posts />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="log-in" element={<LogIn />} />
      <Route path="*" element={<NotFound/>} />
    </Route>
  ));

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
