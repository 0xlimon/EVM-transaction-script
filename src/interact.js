import Web3 from 'web3';
import readlineSync from 'readline-sync';
import { getGasPrice, account, privateKey, loadContractInfo } from './utils.js';
import chalk from 'chalk';

const web3 = new Web3(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);

export const interactWithContract = async () => {
    const contracts = loadContractInfo();
    const contractAddresses = Object.keys(contracts);

    if (contractAddresses.length === 0) {
        console.log(chalk.red('No contracts found. Please deploy a contract first.'));
        return;
    }

    console.log(chalk.yellow('Available contracts:'));
    contractAddresses.forEach((address, index) => {
        console.log(chalk.yellow(`${index + 1}. ${address}`));
    });

    const contractIndex = readlineSync.questionInt('Select a contract: ') - 1;
    const contractAddress = contractAddresses[contractIndex];
    const contractAbi = contracts[contractAddress].abi;
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    const interactions = readlineSync.questionInt('How many interactions? ');
    const [minDelay, maxDelay] = readlineSync.question('Enter the delay range between interactions in seconds (min,max): ').split(',').map(Number);

    for (let i = 0; i < interactions; i++) {
        const tx = contract.methods.getRandomMessage();
        const gasPrice = await getGasPrice();

        const createTransaction = await web3.eth.accounts.signTransaction(
            {
                from: account.address,
                to: contractAddress,
                data: tx.encodeABI(),
                gas: 3000000,
                gasPrice: gasPrice
            },
            privateKey
        );

        const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
        
        const message = await contract.methods.getRandomMessage().call();
        console.log(chalk.green(`Transaction Hash: ${createReceipt.transactionHash} | Message: ${message}`));

        const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
        console.log(chalk.blue(`Waiting for ${delay} seconds before next interaction...`));
        await new Promise(resolve => setTimeout(resolve, delay * 1000));
    }
};
