import {useParams} from "react-router-dom";

const Saved = () => {
    // don't change the name, id, because it's used in the router
    const { id } = useParams();

    return (
        <div>
            <h1>Saved posts and comments are here</h1>
            <h1>Course ID: {id}</h1>
        </div>
    );
}

export default Saved;