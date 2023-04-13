import { Grid, GridItem } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

// Header is only used in landing page

const Header = () => {
    return (
        <div>
            <Grid maxW={1000} templateColumns="1fr 2fr 1fr" gap={5}>
                <GridItem colSpan={1}>
                    <Image src="logo.png" width="25%" alt="angry-unicorn-logo" />
                </GridItem>
                <Grid templateColumns="repeat(3, 1fr)" gap={10} alignItems="center" justifyItems="center">
                    <GridItem>
                        <Link>About</Link>
                    </GridItem>
                    <GridItem>
                        <Link>FAQ</Link>
                    </GridItem>
                    <GridItem>
                        <Link>Contact</Link>
                    </GridItem>
                </Grid>
                <GridItem colSpan={1}>
                    <Flex justifyContent="flex-end">
                        <Button as={Link} to="/log-in" colorScheme='blue' justifySelf="end">Log In</Button>
                    </Flex>
                </GridItem>
            </Grid>
        </div>
    );
}

export default Header;