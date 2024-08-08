
# SolidFundr: Decentralized Fundraising Platform

SolidFundr is a decentralized application (DApp) built on the Ethereum blockchain, designed to help raise funds for students and children in need. This platform enables users to create, manage, and contribute to fundraising campaigns directly on the blockchain, ensuring transparency and trust.

## Features

- **Create Campaigns:** Users can create fundraising campaigns with specific targets and goals.
- **Donate:** Contributors can donate Ethereum directly to campaigns using MetaMask.
- **Track Contributions:** Both campaign creators and contributors can track the progress of their campaigns and donations in real-time.

## Technologies Used

- **Solidity:** For writing the smart contracts.
- **Ethereum:** Blockchain platform to deploy and interact with the contracts.
- **Next.js:** For building the front-end interface.
- **Ethers.js:** Library for interacting with Ethereum blockchain in the front-end.

## Project Structure

- **`contracts/`**: Contains the Solidity smart contract files.
- **`artifacts/`**: Compiled contract artifacts.
- **`scripts/`**: Deployment scripts for the smart contracts.
- **`frontend/`**: Next.js and React code for the DApp's front-end.
- **`hardhat.config.js`**: Configuration file for Hardhat.
- **`next.config.js`**: Configuration file for Next.js.
- **`package.json`**: Lists project dependencies and configurations.
- **`README.md`**: Project documentation.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js and npm:** Required for managing dependencies and running scripts.
- **MetaMask Extension:** Required for Ethereum wallet integration in your browser.

## Setup Instructions

To set up the SolidFundr project on your local machine, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/solidfundr.git
```

### 2. Enter Project Directory

```bash
cd solidfundr
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Launch a Local Ethereum Node

Open a new terminal window and run:

```bash
npx hardhat node
```

### 5. Deploy Smart Contracts

In another terminal, deploy the smart contracts to the local network:

```bash
npx hardhat run --network localhost scripts/deploy.js
```

### 6. Start the Front-End Application

In the original terminal, start the Next.js application:

```bash
npm run dev
```

### 7. Access the Application

Open your browser and navigate to [http://localhost:3000/](http://localhost:3000/) to interact with the DApp.

## Smart Contract Overview

### SolidFundr.sol

The `SolidFundr` contract allows users to:

- **Create a Fund:** Define a target amount, target address, title, and description.
- **Donate to a Fund:** Contribute to an existing fund.
- **Fetch Funds:** Retrieve the list of all active funds.
- **Get Contributions:** Track the contributions made by any address.

### Key Functions

- **`createFund(uint256 targetAmount, address targetAddress, string calldata title, string calldata description)`**
- **`donate(uint256 fundId)`**
- **`getFunds()`**
- **`getDonations(uint256 fundId)`**
- **`getContributions(address author)`**

## Additional Information

- Ensure you are connected to MetaMask when interacting with the application.
- Test the application thoroughly in a local environment before deploying to a live network.

---

CODE WITH AHSAN
