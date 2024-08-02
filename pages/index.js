import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [history, setHistory] = useState([]);
  const [amount, setAmount] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }
    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    try {
      const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
      handleAccount(accounts);
      getATMContract();
    } catch (error) {
      console.error("Failed to connect account:", error);
    }
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      try {
        const balance = await atm.getBalance();
        setBalance(ethers.utils.formatEther(balance)); // Format balance from wei to ether
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    }
  };

  const deposit = async () => {
    if (atm) {
      setIsProcessing(true);
      try {
        const tx = await atm.deposit(ethers.utils.parseEther(amount.toString()));
        await tx.wait();
        getBalance();
        updateHistory('deposit', amount);
      } catch (error) {
        console.error("Failed to deposit:", error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const withdraw = async () => {
    if (atm) {
      setIsProcessing(true);
      try {
        const tx = await atm.withdraw(ethers.utils.parseEther(amount.toString()));
        await tx.wait();
        getBalance();
        updateHistory('withdraw', amount);
      } catch (error) {
        console.error("Failed to withdraw:", error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const updateHistory = (type, amount) => {
    setHistory(prevHistory => [
      ...prevHistory,
      { type, amount, date: new Date().toLocaleString() }
    ]);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Please connect your MetaMask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance} ETH</p>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          min="0"
          step="0.01"
        />
        <button onClick={deposit} disabled={isProcessing}>Deposit</button>
        <button onClick={withdraw} disabled={isProcessing}>Withdraw</button>
        <h3>Transaction History</h3>
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              {entry.date}: {entry.type} {entry.amount} ETH
            </li>
          ))}
        </ul>
      </div>
    );
  };

  useEffect(() => { getWallet(); }, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Metacrafters ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
        }
        input {
          margin: 10px;
          padding: 5px;
        }
        button {
          margin: 5px;
          padding: 10px;
        }
      `}
      </style>
    </main>
  );
}
