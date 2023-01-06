import React, { useEffect } from 'react';
import Web3 from 'web3';

let web3, accounts, balances;
let borrower, borrowIndex, payerIndex, payer;
let owner, contractAddress, debts;
let myNFT;
const DEFAULT_OPTION = -1;


async function init() {
    const WEB3_URL = new Web3("http://localhost:7545");
    let provider;

    if (WEB3_URL.toLowerCase().startsWith('ws')) {
        provider = new Web3.providers.WebsocketProvider(WEB3_URL);
    } else {
        provider = new Web3.providers.HttpProvider(WEB3_URL.substring(5));
    }
    web3 = new Web3(provider);
    accounts = await web3.eth.getAccounts();
    await deployContract();
}

async function deployContract() {
    $.getJSON('MyNFT.json', async abi => {
        const contract = TruffleContract(abi);
        contract.setProvider(web3.currentProvider);
        console.log({ abi, contract, web3 });

        try {
            myNFT = await contract.deployed();
            console.log(myNFT);
            // await setupEventListener(); //+++
            // await firstTimeDeposit();
            // await populateAccountTable(); //+++
            // await getLoanInfo();
            // await updateSelectOptions(); //+++
            // await setupBorrowButton(); //+++
            // await setupPaybackButton(); //+++
        } catch (err) {
            console.log(err);
        }
    });
}


const transaction = () => {
    useEffect(() => {
        init()
    }, [web3])

    return (
        <div>transaction</div>
    )
}

export default transaction