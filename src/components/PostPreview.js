import {Card, CardHeader, Heading, CardBody, CardFooter, Text, Grid, Tag, Button, GridItem} from '@chakra-ui/react';
import {ViewIcon, ChatIcon, ChevronUpIcon, ChevronDownIcon} from '@chakra-ui/icons';
import TimeTag from './TimeTag';

const PostPreview = (props) => {    

    let tagColor = '';
    switch(props.data.activitytag) {
        case 'question':
            tagColor = 'red';
            break;
        case 'discussion':
            tagColor = 'teal';
            break;
        case 'suggestion':
            tagColor = 'orange';
            break;
        default:
            tagColor = 'blue';
    }

    return (
        <Card>
            <CardHeader>
                <Heading size='sm'>{props.data.title}</Heading>
            </CardHeader>
            <CardBody>
                <Text>{props.data.description}</Text>
            </CardBody>
            <CardFooter>
                <Grid minW={'100%'}>
                    <Grid gap={'1rem'} templateColumns={'repeat(3, max-content)'} mb={5} justifyContent={'space-between'}>
                        <Tag>{props.data.username}</Tag>
                        <Tag colorScheme={tagColor}>{props.data.activitytag}</Tag>
                        <TimeTag data={props.data.datecreated}/>
                    </Grid>
                    <Grid gap={'3'} templateColumns={'1fr max-content'}>
                        <Grid gap={2} templateColumns={'1fr 1fr'}>
                            <Button flex='1' variant='ghost' iconSpacing='5px' leftIcon={<ViewIcon />}>View</Button>
                            <Button flex='1' variant='ghost' iconSpacing='5px' leftIcon={<ChatIcon />}>Comment</Button>
                            
                        </Grid>
                        <Grid templateColumns={'1.5em max-content 1.5em'} alignContent='center' justifyContent={'space-between'}>
                            <GridItem>
                                <ChevronUpIcon color='red' boxSize='1.5em'/>
                            </GridItem>
                            <GridItem>
                                <p>{props.data.totalvote}</p>
                            </GridItem>
                            <GridItem>
                                <ChevronDownIcon color='blue' boxSize='1.5em'/>
                            </GridItem>
                        </Grid>
                    </Grid>
                </Grid>
            </CardFooter>
        </Card>
    );
}

export default PostPreview;
