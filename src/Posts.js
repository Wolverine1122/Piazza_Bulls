import { useParams, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Grid, SimpleGrid, Heading } from "@chakra-ui/react";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from "react";
import PostPreview from "./components/PostPreview";

const Posts = ({userId}) => {
    // don't change the name, id, because it's used in the router
    const { id } = useParams();
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/classes/${id}/posts`);
            const data = await response.json();
            setPosts(data);
        } fetchData();
    }, [id]);

    return (
        <Grid justifyContent={'center'} mb={100}>
            {/*Pass course ID because the saved button 
            in Navbar returns saved posts of the specific course*/}
            <NavBar userId={userId} courseID={id}/>
            <SearchBar/>
            <Heading size='lg' mb={50} textAlign={'center'}>Posts in Course {id}</Heading>
            <SimpleGrid spacing={5} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
                {posts.map((dataItem, index) => (
                    <PostPreview key={index} data={dataItem} />
                ))}
            </SimpleGrid>
        </Grid>
    );
}

export default Posts;
