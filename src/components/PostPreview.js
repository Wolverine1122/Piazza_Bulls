import { Card, CardHeader, Heading, CardBody, CardFooter, Text, Grid, Tag, Button, GridItem } from '@chakra-ui/react';
import { ViewIcon, DownloadIcon, ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import TimeTag from './TimeTag';

const PostPreview = ({ data, onViewClick }) => {
    const { title, description, username, posttype, datecreated, totalvote } = data;

    let tagColor = '';
    switch (posttype) {
        case 'unanswered':
            tagColor = 'red';
            break;
        case 'discussion':
            tagColor = 'teal';
            break;
        case 'answered':
            tagColor = 'green';
            break;
        default:
            tagColor = 'blue';
    }

    return (
        <Card>
            <CardHeader>
                <Heading size='sm'>{title}</Heading>
            </CardHeader>
            <CardBody>
                <Text>{description}</Text>
            </CardBody>
            <CardFooter>
                <Grid minW={'100%'}>
                    <Grid gap={'1rem'} templateColumns={'repeat(3, max-content)'} mb={5} justifyContent={'space-between'}>
                        <Tag>{username}</Tag>
                        <Tag colorScheme={tagColor}>{posttype}</Tag>
                        <TimeTag data={datecreated} />
                    </Grid>
                    <Grid gap={'3'} templateColumns={'max-content 1fr'}>
                        <Grid templateColumns={'1.5em max-content 1.5em'} alignContent='center' justifyContent={'space-between'}>
                            <GridItem>
                                <ChevronUpIcon color='red' boxSize='1.5em' />
                            </GridItem>
                            <GridItem>
                                <p>{totalvote}</p>
                            </GridItem>
                            <GridItem>
                                <ChevronDownIcon color='blue' boxSize='1.5em' />
                            </GridItem>
                        </Grid>
                        <Grid gap={2} templateColumns={'1fr 1fr'}>
                            <Button flex='1' variant='ghost' iconSpacing='5px' leftIcon={<ViewIcon />} onClick={onViewClick}>View</Button>
                            <Button flex='1' variant='ghost' iconSpacing='5px' leftIcon={<DownloadIcon />}>Save</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </CardFooter>
        </Card>
    );
}

export default PostPreview;
