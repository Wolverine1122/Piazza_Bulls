import { useParams, useNavigate } from "react-router-dom";

const Posts = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // if id is null or doesn't exist, navigate to 404 page
    if (!id) {   
        navigate('/404', {message: 'Course ID is not found'});
        return null;
    }

    // TODO: fetch posts from backend http://localhost:5000/classes/${id}/posts`
    



    return (
        <div>
            <h1>Posts here</h1>
        </div>
    );
}

export default Posts;
