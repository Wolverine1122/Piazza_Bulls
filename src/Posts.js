import { useParams, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Grid } from "@chakra-ui/react";

const Posts = ({userId}) => {
    // don't change the name, id, because it's used in the router
    const { id } = useParams();
    const navigate = useNavigate();
    // if id is null or doesn't exist, navigate to 404 page
    // TODO: actually check the database to see if the course id exists
    if (!id) {   
        navigate('/404', {message: 'Course ID is not found'});
        return null;
    }

    // TODO: fetch posts from backend http://localhost:5000/classes/${id}/posts`
    



    return (
        <Grid justifyContent={'center'}>
            {/*Pass course ID because the saved button 
            in Navbar returns saved posts of the specific course*/}
            <NavBar userId={userId} courseID={id}/>
            <h1>Posts here for course {id}</h1>
        </Grid>
    );
}

export default Posts;
