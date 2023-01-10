import { ThirdwebStorage } from "@thirdweb-dev/storage";
import fs from 'fs';
import { useContext } from "react";
import { Button, Text, VStack } from '@chakra-ui/react';
import { StudentContext } from "./_app";
import { useRouter } from "next/router";
const storage = new ThirdwebStorage();

export default function about({ data }) {
    const { students, setStudents } = useContext(StudentContext);
    const router = useRouter();

    if (students) {
        setStudents(
            students.map(student => {
                if (data[student.id]) {
                    student.url = data[student.id];
                }
                return student;
            }
            ))
    }



    return (
        <VStack mt={100}>
            <Text fontSize='4xl' color={'teal'} fontWeight="bold" mb={10}>Successfully uploaded certificate files to IPFS</Text>
            <Button colorScheme='teal' size='lg' onClick={() => {
                router.push('/')
            }} >Back to home</Button>
        </VStack>
    );
}

function createMetadata(name, imgUrl) {
    return {
        "name": name,
        "description": name,
        "image": imgUrl
    }
}

export async function getServerSideProps() {
    const imagesDir = './certificate/images';
    const files = fs.readdirSync(`${imagesDir}`);
    const data = {};

    for (let file of files) {
        // (1) upload image to IPFS
        const uploadImg = await storage.upload(fs.readFileSync(`${imagesDir}/${file}`));
        const imgUrl = storage.resolveScheme(uploadImg);

        // (2) create metadata and save as JSON file
        const jsonDir = './certificate/json';
        const fileName = file.split('.')[0]
        const metadata = createMetadata(fileName, imgUrl)
        fs.writeFileSync(`${jsonDir}/${fileName}.json`, JSON.stringify(metadata, null, 2));

        // (3) Upload metadata to IPFS
        const uploadMetadata = await storage.upload(fs.readFileSync(`${jsonDir}/${fileName}.json`));
        const metadataUrl = storage.resolveScheme(uploadMetadata)
        console.log(metadataUrl)

        data[fileName] = metadataUrl;
    }

    return {
        props: { data },
    };
} 