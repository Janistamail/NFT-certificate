import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'


const ShowTable = ({ students }) => {
    const router = useRouter();

    return (
        <div>
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>
                        All students in majored of computer engineering
                    </TableCaption>
                    <Thead>
                        <Tr>
                            <Th>No.</Th>
                            <Th>ID</Th>
                            <Th>Firstname</Th>
                            <Th>Lastname</Th>
                            <Th>Certificate</Th>
                            <Th>CID</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {students.map(student => (
                            <Tr key={student.id}>
                                <Td>{student.number}</Td>
                                <Td
                                    _hover={{ color: 'teal.500' }}
                                    cursor='pointer'
                                    onClick={() => {
                                        router.push({
                                            pathname: `/student/${student.id}`,
                                        });
                                    }}
                                >
                                    {student.id}
                                </Td>
                                <Td>{student.name}</Td>
                                <Td>{student.lastname}</Td>
                                <Td>
                                    {student.nft === '1'
                                        ? 'NFT certificate'
                                        : 'Paper certificate'}
                                </Td>

                                <Td>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default ShowTable