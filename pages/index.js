import { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from "../artifacts/contracts/YourContract.sol/YourContract.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const contractAddress = "0xYourContractAddress"; // Replace with your contract address
  const contractABI = contractABI.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    } else {
      alert("Please install MetaMask to use this app.");
    }
  };

  const handleAccount = async (accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      getContract();
      getBalance();
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    try {
      const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
      handleAccount(accounts);
    } catch (error) {
      console.error("Error connecting account:", error);
    }
  };

  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
    setContract(contractInstance);
  };

  const getBalance = async () => {
    if (contract && account) {
      try {
        const balance = await contract.getBalance();
        setBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  };

  const deposit = async () => {
    if (contract) {
      try {
        const tx = await contract.deposit(ethers.utils.parseEther(amount));
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error during deposit:", error);
      }
    }
  };

  const withdraw = async () => {
    if (contract) {
      try {
        const tx = await contract.withdraw(ethers.utils.parseEther(amount));
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error during withdraw:", error);
      }
    }
  };

  const send = async () => {
    if (contract) {
      try {
        const tx = await contract.send(recipient, ethers.utils.parseEther(amount));
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error during send:", error);
      }
    }
  };

  const renderContent = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask in order to use this application.</p>;
    }

    if (!account) {
      return (
        <button onClick={connectAccount} className="custom-button">
          Connect MetaMask Wallet
        </button>
      );
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance} ETH</p>
        <div className="button-group">
          <button onClick={deposit} className="custom-button">Deposit</button>
          <button onClick={withdraw} className="custom-button">Withdraw</button>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="custom-input"
          />
          <input
            type="text"
            placeholder="Amount (ETH)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="custom-input"
          />
          <button onClick={send} className="custom-button">
            Send
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <div className="header-content">
          <h1>MetaMask Wallet Integration</h1>
        </div>
      </header>
      {renderContent()}
      <style jsx>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          text-align: center;
        }
        .header-content {
          padding: 20px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 10px;
          margin-bottom: 20px;
        }
        .button-group {
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }
        .custom-button {
          background-color: #4a90e2;
          color: white;
          border: none;
          padding: 10px 20px;
          margin: 0 10px;
          border-radius: 5px;
          cursor: pointer;
          transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
        }
        .custom-button:hover {
          transform: translateY(-5px);
          background-color: #357ab8;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .custom-input {
          margin: 10px 0;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          width: 250px;
        }
      `}</style>
    </main>
  );
}
