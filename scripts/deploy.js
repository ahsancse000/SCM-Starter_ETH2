const hre = require("hardhat");

async function main() {
  const initBalance = hre.ethers.utils.parseEther("1"); // Converting ETH to Wei
  const [deployer, recipient] = await hre.ethers.getSigners(); // Getting deployer and a recipient address

  // Deploy the Assessment contract
  const Assessment = await hre.ethers.getContractFactory("Assessment");
  const assessment = await Assessment.deploy(initBalance);
  await assessment.deployed();

  console.log(`Contract with balance of ${hre.ethers.utils.formatEther(initBalance)} ETH deployed to ${assessment.address}`);

  // Example of transferring tokens (assuming your contract has a transfer function)
  const transferAmount = hre.ethers.utils.parseEther("0.1"); // Amount to transfer
  console.log(`Transferring ${hre.ethers.utils.formatEther(transferAmount)} ETH to ${recipient.address}`);

  // Interact with the deployed contract
  const tx = await assessment.connect(deployer).transfer(recipient.address, transferAmount);
  await tx.wait(); // Wait for the transaction to be mined

  console.log(`Transferred ${hre.ethers.utils.formatEther(transferAmount)} ETH to ${recipient.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
