import { useState, useEffect } from "react";
import { ethers } from "ethers";
import SolidFundrABI from "../artifacts/contracts/SolidFundr.sol/SolidFundr.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [funds, setFunds] = useState([]);
  const [fundIdInput, setFundIdInput] = useState("");
  const [donationAmountInput, setDonationAmountInput] = useState("");
  const [contributors, setContributors] = useState([]);
  const [targetAmountInput, setTargetAmountInput] = useState("");
  const [targetAddressInput, setTargetAddressInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contractABI = SolidFundrABI.abi;

  const initWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }
    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
    setContract(contractInstance);

    updateBalance();
  };

  const updateBalance = async () => {
    if (contract && account) {
      const userBalance = await contract.getContributions(account);
      setBalance(userBalance);
    }
  };

  const donateToFund = async () => {
    const fundId = parseInt(fundIdInput);
    const amount = ethers.utils.parseEther(donationAmountInput);

    try {
      const donationTx = await contract.donate(fundId, { value: amount });
      await donationTx.wait();
      updateBalance();
      alert("Donation successful!");
    } catch (error) {
      console.error("Error donating to fund:", error);
      alert("Failed to donate to fund. Please try again.");
    }
  };

  const createFund = async () => {
    const targetAmount = ethers.utils.parseEther(targetAmountInput);
    const targetAddress = targetAddressInput;
    const title = titleInput;
    const description = descriptionInput;

    try {
      const createFundTx = await contract.createFund(targetAmount, targetAddress, title, description);
      await createFundTx.wait();
      alert("Campaign created successfully!");
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Failed to create campaign. Please try again.");
    }
  };

  const fetchFunds = async () => {
    try {
      const funds = await contract.getFunds();
      setFunds(funds);
    } catch (error) {
      console.error("Error fetching funds:", error);
      alert("Failed to fetch funds. Please try again.");
    }
  };

  const fetchContributors = async () => {
    try {
      const fundId = parseInt(fundIdInput);
      const fundContributors = await contract.getDonations(fundId);
      setContributors(fundContributors);
    } catch (error) {
      console.error("Error fetching contributors:", error);
      alert("Failed to fetch contributors. Please try again.");
    }
  };

  useEffect(() => {
    initWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the SolidFundr Platform!</h1>
      </header>
      <section>
        <h2>User Information</h2>
        <p>Account: {account}</p>
        <p>Balance: {balance}</p>
      </section>
      <section>
        <h2>Actions</h2>
        <button onClick={connectAccount}>Connect Wallet</button>
      </section>
      <section>
        <h2>Donate to Fund</h2>
        <div>
          <label htmlFor="fundIdInput">Fund ID:</label>
          <input
            type="text"
            id="fundIdInput"
            value={fundIdInput}
            onChange={(e) => setFundIdInput(e.target.value)}
          />
          <label htmlFor="donationAmountInput">Donation Amount (ETH):</label>
          <input
            type="text"
            id="donationAmountInput"
            value={donationAmountInput}
            onChange={(e) => setDonationAmountInput(e.target.value)}
          />
          <button onClick={donateToFund}>Donate</button>
        </div>
      </section>
      <section>
        <h2>Create Fund</h2>
        <div>
          <label htmlFor="targetAmountInput">Target Amount (ETH):</label>
          <input
            type="text"
            id="targetAmountInput"
            value={targetAmountInput}
            onChange={(e) => setTargetAmountInput(e.target.value)}
          />
          <label htmlFor="targetAddressInput">Target Address:</label>
          <input
            type="text"
            id="targetAddressInput"
            value={targetAddressInput}
            onChange={(e) => setTargetAddressInput(e.target.value)}
          />
          <label htmlFor="titleInput">Title:</label>
          <input
            type="text"
            id="titleInput"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <label htmlFor="descriptionInput">Description:</label>
          <input
            type="text"
            id="descriptionInput"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
          <button onClick={createFund}>Create Fund</button>
        </div>
      </section>
      <section>
        <h2>Funds</h2>
        <button onClick={fetchFunds}>Fetch Funds</button>
        <ul>
          {funds.map((fund, index) => (
            <li key={index}>
              <p>Title: {fund.title}</p>
              <p>Description: {fund.description}</p>
              <p>Amount: {ethers.utils.formatEther(fund.amount)} ETH</p>
              <p>Target Amount: {ethers.utils.formatEther(fund.targetAmount)} ETH</p>
              <p>Completed: {fund.completed.toString()}</p>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Contributors</h2>
        <button onClick={fetchContributors}>Fetch Contributors</button>
        <ul>
          {contributors.map((contributor, index) => (
            <li key={index}>
              <p>Address: {contributor.author}</p>
              <p>Amount: {ethers.utils.formatEther(contributor.amount)} ETH</p>
            </li>
          ))}
        </ul>
      </section>
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}
      </style>
    </main>
  );
}
