import { Grid, Image, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <Grid templateColumns="1fr 1fr" p={[100, 50]} gap={20} justifyContent="center" alignContent="center">
            <Grid alignItems="center" justifyItems="center" justifyContent="end" gap={3}>
                <Image src="logo.png" width="100px" alt="bull-logo" />
                <Heading as="h1" size="md">Piazza</Heading>
            </Grid>
            <Grid templateRows="repeat(4, max-content)" alignContent="center" justifyContent="begin" gap={2}>
                <Link href="https://instagram.com">Instagram</Link>
                <Link href="https://facebook.com">Facebook</Link>
                <Link href="https://twitter.com">Twitter</Link>
                <Link href="https://linkedin.com">LinkedIn</Link>
            </Grid>
        </Grid>
    );
}

export default Footer;
