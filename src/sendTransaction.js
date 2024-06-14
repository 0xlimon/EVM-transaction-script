import Web3 from 'web3';
import readlineSync from 'readline-sync';
import { getGasPrice, account, privateKey } from './utils.js';
import chalk from 'chalk';

const web3 = new Web3(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);

export const sendTransaction = async () => {
    const toAddress = readlineSync.question('Enter the recipient address: ');
    const [minAmount, maxAmount] = readlineSync.question('Enter the token amount range (min,max): ').split(',').map(Number);
    const [minDelay, maxDelay] = readlineSync.question('Enter the delay range between transactions in seconds (min,max): ').split(',').map(Number);

    while (true) {
        const amount = (Math.random() * (maxAmount - minAmount) + minAmount).toFixed(4);
        const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

        const tx = {
            from: account.address,
            to: toAddress,
            value: web3.utils.toWei(amount, 'ether'),
            gas: 21000,
            gasPrice: await getGasPrice()
        };

        const createTransaction = await web3.eth.accounts.signTransaction(tx, privateKey);
        const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
        console.log(chalk.blue(`Transaction sent with hash: ${createReceipt.transactionHash} - Amount: ${amount} ETH - Delay: ${delay}s`));

        await new Promise(resolve => setTimeout(resolve, delay * 1000));
    }
};
