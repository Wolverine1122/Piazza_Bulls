import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  // Access the props passed from the previous page
  const { message } = location.state || {};

  return (
    <div>
      <h1>404 Not Found</h1>
      <p>{message}</p>
    </div>
  );
};

export default NotFound;
