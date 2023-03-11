import Header from './components/Header';
import Feature from './components/Feature';
import Footer from './components/Footer';
import { Box, Button, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ArrowForwardIcon, ChatIcon, SpinnerIcon, ViewIcon } from '@chakra-ui/icons';

const Landing = () => {
    return (
        <Grid>
            <Grid className="hero-section" h="100vh" templateRows="min-content 1fr">
                <Box px={20} py={5}>
                    <Header />
                </Box>

                <Grid justifyContent="center" alignContent="center" textAlign="center" gap='5'>
                    <Heading as="h1" size="3xl">We are Piazza on
                        <mark style={{ backgroundColor: 'transparent', color: 'red' }}> Red Bull</mark>
                    </Heading>
                    <Text fontSize="lg">Do you get ghosted on GroupMe and Discord chats? You are in the right place</Text>
                    <GridItem>
                        <Button rightIcon={<ArrowForwardIcon />} as={Link} to="/sign-up" colorScheme='blue' width="130px">Get started</Button>
                    </GridItem>

                </Grid>
            </Grid>

            <Grid className="features-section" h="100vh" justifyContent="center" pl={20} pr={20} alignContent="center">
                <Heading textAlign="center" mb={10}>Features old Piazza could never</Heading>
                <Grid templateColumns='repeat(3, 1fr)' gap='10'>
                    <Feature title="Ditch emails" description="Email is for business people, not engineers. Instant message for life" icon={ChatIcon} />
                    <Feature title="Pick brains" description="Tryhards in class ask good questions. Better check them out" icon={ViewIcon} />
                    <Feature title="Gen Z" description="No more boomer-style Piazza. We took design seriously" icon={SpinnerIcon} />
                    <Feature title="Ditch emails" description="Email is for business people, not engineers. Instant message for life" icon={ChatIcon} />
                    <Feature title="Pick brains" description="Tryhards in class ask good questions. Better check them out" icon={ViewIcon} />
                    <Feature title="Gen Z" description="No more boomer-style Piazza. We took design seriously" icon={SpinnerIcon} />
                </Grid>
            </Grid>

            <Grid className="trust-section" justifyContent="center" alignContent="center" p={50}>
                <Heading textAlign="center" mb={5}>Trusted by</Heading>
                <Text>Everyone and their mom</Text>
            </Grid>

            <Footer />
        </Grid >
    );
}

export default Landing;
