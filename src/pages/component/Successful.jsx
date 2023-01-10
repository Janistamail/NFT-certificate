import React, { useContext } from 'react'
import { StudentContext } from '../index';
import { Button, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';



const Successful = () => {
    const { students, setStudents } = useContext(StudentContext);
    const router = useRouter();


    return (
        <VStack mt={100}>
            <Text fontSize='4xl' color={'teal'} fontWeight="bold" mb={10}>Successfully uploaded certificate files to IPFS</Text>
            <Button colorScheme='teal' size='lg' onClick={() => {
                router.push('/')
            }} >Back to home</Button>
        </VStack>
    )
}

export default Successful