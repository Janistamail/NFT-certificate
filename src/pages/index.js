import { AlertDialog, AlertDialogContent, AlertDialogOverlay, Button, HStack, Text, VStack } from '@chakra-ui/react';
import detectEthereumProvider from '@metamask/detect-provider';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Web3 from "web3";
import MyNFT from '../abis/MyNFT.json';
import StudentTable from './component/StudentTable';
import { StudentContext } from './_app';


export default function Home() {
	const { students, setStudents } = useContext(StudentContext);
	const router = useRouter();
	const [accounts, setAccounts] = useState([]);
	const [nftContract, setNFTContract] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [owner, setOwner] = useState();
	const [ownerBalance, setOwnerBalance] = useState();

	const loadWeb3 = async () => {
		const provider = await detectEthereumProvider();
		// const provider = 'http://localhost:7545';

		if (provider) {
			console.log('ethereum wallet is connected')
			window.web3 = new Web3(provider)
		} else {
			// no ethereum provider
			console.log('no ethereum wallet detected')
		}
	}

	const loadBlockchainData = async () => {
		const web3 = window.web3;
		const accounts = await web3.eth.getAccounts();
		setAccounts(accounts);

		const networkId = await web3.eth.net.getId();
		const networkData = MyNFT.networks[networkId];

		if (networkData) {

			const abi = MyNFT.abi;
			//add of the transaction block
			const address = networkData.address;
			//use web3 to create contract and interact with smart contracts
			const contract = new web3.eth.Contract(abi, address);
			// await setNFTContract({ contract });
			const ownerData = await contract.methods.admin().call();
			console.log(ownerData);
			setOwner(ownerData);

		} else {
			window.alert('Smart contract not deployed')
		}
	}

	const mintFunc = async () => {
		const networkId = await web3.eth.net.getId()
		const networkData = MyNFT.networks[networkId]
		const abi = MyNFT.abi;
		const address = networkData.address;
		const contract = new web3.eth.Contract(abi, address);
		await contract.methods.mint(owner, 3, students[3].url).send({ from: owner, gas: '1000000' });

		// const balance = await contract.methods.balanceOf(owner, { from: owner }).call();
		// console.log("balance", balance);
		// setOwnerBalance(balance.toString());

	}

	useEffect(() => {
		const init = async () => {
			await loadWeb3();
			await loadBlockchainData();
		}
		init();

	}, []);
	console.log(students, owner);



	return (
		<div>
			<AlertDialog
				isOpen={isLoading}
				isCentered
			>
				<AlertDialogOverlay>
					console.log(students);
					<AlertDialogContent>
						<Image src={'/loading.gif'} width={600} height={600} alt='loadingGif'></Image>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
			<HStack w='100%' h={20} bgColor='teal.200' p={3} justifyContent='space-between'>
				<Text fontSize={'2xl'} fontWeight='bold' color={'teal'}>NFT certificates</Text>

				<Text fontSize={'sm'} fontWeight='bold' color={'teal'}>owner : {owner}</Text>
				{/* <Text fontSize={'md'} >Balance : {ownerBalance}</Text> */}

			</HStack>
			<StudentTable />
			<HStack gap={10} justifyContent='center'>
				<Button colorScheme='teal' size='lg' onClick={() => {
					setIsLoading(true)
					router.push('/about')
				}} >upload to IPFS</Button>
				<Button colorScheme='teal' size='lg' onClick={() => mintFunc()}>Mint NFTs</Button>
			</HStack>
		</div>


	);
}
