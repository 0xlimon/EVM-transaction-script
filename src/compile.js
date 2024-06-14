import fs from 'fs';
import path from 'path';
import solc from 'solc';
import { findImports } from './utils.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const compileContract = (contractPath, contractName) => {
    const source = fs.readFileSync(contractPath, 'utf8');
    const input = {
        language: 'Solidity',
        sources: {
            'contract.sol': {
                content: source,
            },
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['abi', 'evm.bytecode'],
                },
            },
        },
    };

    const compiledContract = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

    if (compiledContract.errors) {
        compiledContract.errors.forEach((err) => {
            console.error(err.formattedMessage);
        });
    }

    if (!compiledContract.contracts || !compiledContract.contracts['contract.sol'] || !compiledContract.contracts['contract.sol'][contractName]) {
        throw new Error('Contract compilation failed. Check your contract name and source code.');
    }

    const contractAbi = compiledContract.contracts['contract.sol'][contractName].abi;
    const contractBytecode = compiledContract.contracts['contract.sol'][contractName].evm.bytecode.object;

    fs.writeFileSync(path.join(__dirname, `../build/${contractName}.abi.json`), JSON.stringify(contractAbi, null, 4));
    fs.writeFileSync(path.join(__dirname, `../build/${contractName}.bytecode.json`), JSON.stringify(contractBytecode, null, 4));

    return { abi: contractAbi, bytecode: contractBytecode };
};
