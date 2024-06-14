
# EVM SmartContract Interactions

This project contains web3 scripts for deploying contracts and interacting with them on the EVM-compatible blockchains. It includes functionalities for deploying a contract, sending transactions, and interacting with deployed contracts.

**Note:** This script has been tested only on the Sepolia network. Use it on mainnets at your own risk. Make sure to thoroughly test and understand the script before deploying it on any mainnet network.


## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/0xlimon/EVM-interaction-scripts.git
    cd EVM-interaction-scripts
    mkdir build
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your Alchemy API key and private key:

    ```env
    ALCHEMY_API_KEY=your_alchemy_api_key
    PRIVATE_KEY=your_private_key
    ```

## Project Structure

```
EVM-SmartContract-Interactions/
├── contracts/
│   └── PositiveMessages.sol
├── src/
│   ├── compile.js
│   ├── deploy.js
│   ├── interact.js
│   ├── sendTransaction.js
│   ├── utils.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

- **contracts/**: Contains the Solidity smart contract files.
- **src/**: Contains the JavaScript files for compiling, deploying, and interacting with smart contracts.
- **.env**: Contains environment variables (not included in the repository, needs to be created manually).
- **package.json**: Contains the project configuration and dependencies.
- **README.md**: Project documentation.

## Usage

1. Deploy Contract

    ```bash
    npm start
    ```

    - Select option `1. Deploy Contract` from the menu.
    - This will compile and deploy the `PositiveMessages` contract to the EVM-compatible blockchain.

2. Send Transaction

    ```bash
    npm start
    ```

    - Select option `2. Send Transaction` from the menu.
    - Enter the recipient address, token amount range, and delay range between transactions.
    - The script will send transactions based on the provided inputs.

3. Interact with Contract

    ```bash
    npm start
    ```

    - Select option `3. Interact with Contract` from the menu.
    - Select the contract, specify the number of interactions, and provide the delay range between interactions.
    - The script will interact with the selected contract and display the results.

## License

This project is licensed under the MIT License.
