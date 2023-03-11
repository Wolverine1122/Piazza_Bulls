import { GridItem, Heading, Text, Icon, Card, CardBody, Grid } from '@chakra-ui/react';

const Feature = (props) => {

    const normalStyle = {
        transition: 'all 0.2s ease'
    }

    const hoverStyle = {
        boxShadow: '0 0 0 2px #3182ce',
        cursor: 'pointer'
    }

    return (
        <GridItem minW="300px" maxW="350px" >
            <Card style={normalStyle} _hover={hoverStyle}>
                <CardBody>
                    <Grid gap={3} alignItems="center" justifyItems="center">
                        <Icon as={props.icon} w={10} h={10} color="blue.500" />
                        <Heading as="h2" size="md">{props.title}</Heading>
                        <Text w="250px">{props.description}</Text>
                    </Grid>
                </CardBody>
            </Card>
        </GridItem >
    )
}

export default Feature;