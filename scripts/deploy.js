// Import Hardhat Runtime Environment
const hre = require("hardhat");

// Main function to deploy the contract
async function main() {
  // Set the initial balance for the contract in ETH
  const initBalance = ethers.utils.parseEther("5.0"); // 5 ETH
  
  // Get the contract factory for the Assessment contract
  const Assessment = await hre.ethers.getContractFactory("Assessment");
  
  // Deploy the contract with the initial balance
  const assessment = await Assessment.deploy(initBalance);
  
  // Wait for the contract to be deployed
  await assessment.deployed();
  
  // Log the contract address and initial balance
  console.log(`A contract with balance of 5 ETH deployed to ${assessment.address}`);
}

// Execute the main function and handle errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
