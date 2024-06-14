import fs from 'fs';
import path from 'path';
import Web3 from 'web3';
import dotenv from 'dotenv';
dotenv.config();
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const web3 = new Web3(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);
export const privateKey = process.env.PRIVATE_KEY;

if (!privateKey || typeof privateKey !== 'string' || privateKey.length !== 66) {
    throw new Error('Invalid Private Key. Please check your .env file.');
}

export const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

export const getGasPrice = async () => {
    const gasPrice = await web3.eth.getGasPrice();
    return gasPrice;
};

export const findImports = (importPath) => {
    try {
        const fullPath = path.resolve(__dirname, '..', importPath);
        const source = fs.readFileSync(fullPath, 'utf8');
        return { contents: source };
    } catch (e) {
        return { error: 'File not found' };
    }
};

export const loadContractInfo = () => {
    const filename = path.join(__dirname, '../contracts.json');
    if (fs.existsSync(filename)) {
        return JSON.parse(fs.readFileSync(filename));
    }
    return {};
};

export const saveContractInfo = (contractAddress, abi) => {
    const filename = path.join(__dirname, '../contracts.json');
    let contracts = {};

    if (fs.existsSync(filename)) {
        contracts = JSON.parse(fs.readFileSync(filename));
    }

    contracts[contractAddress] = { abi };
    fs.writeFileSync(filename, JSON.stringify(contracts, null, 4));
};

export const loadAbiFromFile = (contractName) => {
    const abiPath = path.join(__dirname, `../build/${contractName}.abi.json`);
    if (fs.existsSync(abiPath)) {
        return JSON.parse(fs.readFileSync(abiPath, 'utf8'));
    }
    throw new Error(`ABI file for contract ${contractName} not found.`);
};
