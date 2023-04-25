import {Input, InputGroup, InputRightElement, Grid, Tabs, TabList, Tab} from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons'
const SearchBar = () => {
    return (
        <Grid justifyItems={'center'} pt={50} pb={50}>
            <InputGroup maxW={800} mb={2}>
                <Input placeholder='Type to get good grades' />
                <InputRightElement children={<SearchIcon color='green.500' />} />
            </InputGroup>

            <Tabs variant='soft-rounded' colorScheme='blue' size='md'>
                <TabList>
                    <Tab>All</Tab>
                    <Tab>LinkedLists</Tab>
                    <Tab>Arrays</Tab>
                    <Tab>LinkedLists</Tab>
                    <Tab>Arrays</Tab>
                    <Tab>LinkedLists</Tab>
                    <Tab>Arrays</Tab>
                    <Tab>LinkedLists</Tab>
                    <Tab>Arrays</Tab>
                    <Tab>LinkedLists</Tab>
                </TabList>
            </Tabs>

        </Grid>
    );
}

export default SearchBar;
