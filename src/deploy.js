import Web3 from 'web3';
import { compileContract } from './compile.js';
import { getGasPrice, account, privateKey } from './utils.js';
import ora from 'ora';

const web3 = new Web3(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);

export const deployContract = async (contractPath, contractName, args = []) => {
    const spinner = ora(`Deploying contract ${contractName}...`).start();
    try {
        const { abi, bytecode } = compileContract(contractPath, contractName);

        const contract = new web3.eth.Contract(abi);
        const deployTx = contract.deploy({ data: '0x' + bytecode, arguments: args });
        const gasPrice = await getGasPrice();

        const createTransaction = await web3.eth.accounts.signTransaction(
            {
                from: account.address,
                data: deployTx.encodeABI(),
                gas: 3000000,
                gasPrice: gasPrice
            },
            privateKey
        );

        const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);

        spinner.succeed(`Contract deployed at address: ${createReceipt.contractAddress}`);
        return createReceipt.contractAddress;
    } catch (error) {
        spinner.fail(`Failed to deploy contract: ${error.message}`);
        throw error;
    }
};
