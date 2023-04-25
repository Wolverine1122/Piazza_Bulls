import { Grid, GridItem, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Avatar } from "@chakra-ui/react";
// This navbar appears after user logs in

const NavBar = ({userId, courseID}) => {
    return (
        <Grid maxW={1000} templateColumns={'1fr 2fr 1fr'} gap={250} py={5} alignItems="center" justifyItems="center">
            <GridItem>
                <Image src="/logo.png" width="40%" alt="angry-unicorn-logo" />
            </GridItem>
            <Grid templateColumns={'1fr 1fr'} gap={100} alignItems="center" justifyItems="center">
                <GridItem>
                    <Link to={`/courses/${userId}`}>My classes</Link>
                </GridItem>
                <GridItem>
                    <Link to={`/courses/${userId}/course/:${courseID}/saved`}>Saved</Link>
                </GridItem>
            </Grid>
            <GridItem>
                <Avatar size='sm' name={userId} bg='teal.500'/>
            </GridItem>
        </Grid>
    );
}

export default NavBar;
