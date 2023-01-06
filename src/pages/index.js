import { AlertDialog, AlertDialogContent, AlertDialogOverlay, Button, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { STUDENT } from '../../constants/students';
import ShowTable from './component/ShowTable';

export default function Home() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [students, setStudents] = useState(STUDENT);

	return (
		<VStack mt={100} gap={5}>
			<AlertDialog
				isOpen={isLoading}
				isCentered
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<Image src={'/loading.gif'} width={600} height={600}></Image>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>

			<Text fontSize='4xl' color={'teal'} fontWeight="bold" >
				Students who graduated and will receive graduation certificate in 2000
			</Text>
			<ShowTable students={students} />

			<Button colorScheme='teal' size='lg' onClick={() => {
				setIsLoading(true)
				router.push('/about')
			}} >upload to IPFS</Button>
			<Button colorScheme='teal' size='lg'
			>Mint NFTs</Button>
		</VStack >
	);
}
