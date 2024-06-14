import readlineSync from 'readline-sync';
import { deployContract } from './deploy.js';
import { sendTransaction } from './sendTransaction.js';
import { interactWithContract } from './interact.js';
import { saveContractInfo, loadAbiFromFile } from './utils.js';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const main = async () => {
    while (true) {
        console.log(chalk.cyan('\nMenu:'));
        console.log(chalk.cyan('1. Deploy Contract'));
        console.log(chalk.cyan('2. Send Transaction'));
        console.log(chalk.cyan('3. Interact with Contract'));
        console.log(chalk.cyan('4. Exit'));

        const choice = readlineSync.questionInt('Enter your choice: ');

        switch (choice) {
            case 1:
                const contractSource = path.join(__dirname, '../contracts/PositiveMessages.sol');
                const contractName = 'PositiveMessages';
                const contractAddress = await deployContract(contractSource, contractName);
                const abi = loadAbiFromFile(contractName);
                saveContractInfo(contractAddress, abi);
                break;
            case 2:
                await sendTransaction();
                break;
            case 3:
                await interactWithContract();
                break;
            case 4:
                console.log(chalk.cyan('Exiting...'));
                return;
            default:
                console.log(chalk.red('Invalid choice. Please try again.'));
        }
    }
};

main().catch(console.error);
