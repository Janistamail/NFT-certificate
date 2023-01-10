import { EditIcon } from '@chakra-ui/icons';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { StudentContext } from '../_app';


const StudentTable = () => {
    const router = useRouter();
    const { students, setStudents } = useContext(StudentContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editStudentAccount, setEditStudentAccount] = useState('');
    const onSaveAccount = () => {
        onClose();
        const newData = students.map((s) => {
            if (s.id === editStudentAccount.id) {
                s.account = editStudentAccount.account
            }
            return s;
        })
        setStudents(newData)
    }

    const onDiscard = () => {
        onClose();
        setEditStudentAccount('');
    }

    const handleOnInputChange = (e) => {
        const newData = { ...editStudentAccount };
        newData.account = e.target.value;
        setEditStudentAccount(newData);
    }

    return (
        <VStack mt={100} gap={5}>
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Student's Account Number</ModalHeader>
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Account Number</FormLabel>
                            <Input value={editStudentAccount?.account} onChange={handleOnInputChange}></Input>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onDiscard}>Discard</Button>
                        <Button colorScheme='red' onClick={onSaveAccount}>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Text fontSize='2xl' color={'teal.400'} fontWeight="bold" >
                Students who graduated and will receive graduation certificate in 2000
            </Text>
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>
                        All students in majored of computer engineering
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>No.</Th>
                            <Th>ID</Th>
                            <Th>ETH account</Th>
                            <Th>Firstname</Th>
                            <Th>Lastname</Th>
                            <Th>Certificate</Th>
                            <Th>Verified</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {students.map(student => (
                            <Tr key={student.id}>
                                <Td>{student.tokenId}</Td>
                                <Td
                                    _hover={{ color: 'teal.500' }}
                                    cursor='pointer'
                                    onClick={() => {
                                        router.push({
                                            pathname: `/student/${student.tokenId}`,
                                        });
                                    }}
                                >
                                    {student.id}
                                </Td>
                                <Td>
                                    <EditIcon mr={5} cursor={'pointer'} onClick={() => {
                                        setEditStudentAccount({ ...student });
                                        onOpen();
                                    }} />
                                    {student.account ?? '-'}
                                </Td>
                                <Td>{student.name}</Td>
                                <Td>{student.lastname}</Td>
                                <Td>
                                    {(student?.url) ?? '-'}
                                </Td>
                                <Td>
                                    {/* <Button onClick={ }>
                                        check
                                    </Button> */}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

        </VStack>
    )
}

export default StudentTable