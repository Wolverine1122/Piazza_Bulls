import { createBrowserRouter as Router, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";

import Landing from "./Landing";
import Courses from "./Courses";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

const router = Router(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Landing />} />
      <Route path="courses" element={<Courses />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="log-in" element={<LogIn />} />
    </Route>
  ));

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
