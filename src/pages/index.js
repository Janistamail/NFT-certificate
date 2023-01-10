import { AlertDialog, AlertDialogContent, AlertDialogOverlay, Box, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import Web3 from "web3";
import { STUDENT } from '../../constants/students';
import detectEthereumProvider from "@metamask/detect-provider";
import MyNFT from '../abis/MyNFT.json';
import StudentTable from './component/StudentTable';
import Image from 'next/image';

export const StudentContext = createContext();
export default function Home() {
	const router = useRouter();
	const [accounts, setAccounts] = useState([]);
	const [contract, setContract] = useState();
	const [students, setStudents] = useState(STUDENT);
	const [isLoading, setIsLoading] = useState(false);
	const [owner, setOwner] = useState();
	const [ownerBalance, setOwnerBalance] = useState(2);

	// async function mintFunc() {
	// 	const balance = await contract.methods.balanceOf('0x1547BFD6f1f9e7CDA81306660fE6420845625Ef5').call();
	// 	setOwnerBalance(balance);

	// 	// students.map(async student => {
	// 	// 	await contract.methods.mint(student.account, student.tokenId, student.account);
	// 	// });
	// 	// const estGas = await contract.methods.balanceOf.estimateGas(owner, { from: owner });
	// 	// const sendingGas = Math.ceil(estGas * 1.5);
	// 	// console.log(sendingGas);
	// 	// console.log(await contract.methods.balanceOf(owner));
	// 	// setOwnerBalance(await contract.methods.balanceOf(owner, {}));

	// }

	const loadWeb3 = async () => {
		// const provider = await detectEthereumProvider();
		const provider = 'http://localhost:7545';

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

		//is set to blockchain network id 
		const networkId = await web3.eth.net.getId()
		const networkData = MyNFT.networks[networkId]

		if (networkData) {

			const abi = MyNFT.abi;
			//add of the transaction block
			const address = networkData.address;
			//use web3 to create contract and interact with smart contracts
			const contract = new web3.eth.Contract(abi, address);
			setContract(contract);
			const admin = await contract.methods.admin().call();
			setOwner(admin);
			// const balance =
			// 	await contract.methods.balanceOf(admin).call(function (err, res) {
			// 		if (err) {
			// 			console.log("An error occured", err)
			// 			return
			// 		}
			// 		console.log(`The balance is: ${res}`)
			// 	})
			// setOwnerBalance(balance)
			// await contract.methods.mint(student.account, student.tokenId, student.account);

			// const totalSupply = await contract.methods.mint(student.account, student.tokenId, student.account).call();
			// console.log(totalSupply);

			// this.setState({ totalSupply })
			// // set up an array to keep track of tokens 
			// // load KryptoBirdz
			// for (let i = 1; i <= totalSupply; i++) {
			// 	const KryptoBird = await contract.methods.kryptoBirdz(i - 1).call()
			// 	// how should we handle the state on the front end? 
			// 	this.setState({
			// 		kryptoBirdz: [...this.state.kryptoBirdz, KryptoBird]
			// 	})
			// }
		} else {
			window.alert('Smart contract not deployed')
		}
	}

	useEffect(() => {
		const init = async () => {
			await loadWeb3();
			await loadBlockchainData();
		}
		init();

	}, []);


	return (
		<StudentContext.Provider value={{ students, setStudents }} >
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
			<VStack w='100%' h={20} bgColor='teal.200' p={3} alignItems='end'>
				<Text fontSize={'lg'} fontWeight='bold'>Admin : {owner}</Text>
				<Text fontSize={'md'} >Balance : {ownerBalance}</Text>

			</VStack>
			<StudentTable />
			<Text>The number of admin's NFT :  </Text>
			<HStack gap={10} justifyContent='center'>
				<Button colorScheme='teal' size='lg' onClick={() => {
					setIsLoading(true)
					router.push('/about')
				}} >upload to IPFS</Button>
				<Button colorScheme='teal' size='lg' onClick={() => mintFunc()}>Mint NFTs</Button>
			</HStack>
		</StudentContext.Provider>

	);
}
