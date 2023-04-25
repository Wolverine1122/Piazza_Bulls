import {Card, CardHeader, Heading, CardBody, CardFooter, Text, Grid, IconButton, Tag} from '@chakra-ui/react';
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
                            <IconButton colorScheme='blue' aria-label='view' icon={<ViewIcon/>} size='sm'/>
                            <IconButton colorScheme='blue' aria-label='comment' icon={<ChatIcon/>} size='sm'/>
                        </Grid>
                        <Grid gap={1} templateColumns={'1fr 1fr'} justifyContent={'right'}>
                            <IconButton colorScheme='blue' aria-label='upvote' icon={<ChevronUpIcon/>} size='sm' variant='outline'/>
                            <IconButton colorScheme='red' aria-label='downvote' icon={<ChevronDownIcon/>} size='sm' variant='outline'/>
                        </Grid>
                    </Grid>
                </Grid>
            </CardFooter>
        </Card>
    );
}

export default PostPreview;
