import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(null);
  const [account, setAccount] = useState(null);
  const [atm, setATM] = useState(null);
  const [balance, setBalance] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    } else {
      alert("MetaMask not found. Please install MetaMask.");
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
      setAccount(null);
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
      getATMContract();
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
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
        setBalance(ethers.utils.formatEther(balance)); // Format balance to ETH
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  };

  const deposit = async () => {
    if (atm) {
      try {
        let tx = await atm.deposit(ethers.utils.parseEther("1"));
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error depositing:", error);
      }
    }
  };

  const withdraw = async () => {
    if (atm) {
      try {
        let tx = await atm.withdraw(ethers.utils.parseEther("1"));
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error withdrawing:", error);
      }
    }
  };

  const send = async () => {
    if (atm && recipient && amount) {
      try {
        const parsedAmount = ethers.utils.parseEther(amount);
        let tx = await atm.send(recipient, parsedAmount);
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error sending:", error);
      }
    } else {
      alert("Please provide recipient and amount");
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <div className="a">
          <h1>Metamask Wallet Integration</h1>
        </div>
      </header>
      <div style={{ textAlign: "center", fontSize: "30px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "35px" }}></div>
      </div>
      {ethWallet && (
        !account ? (
          <button onClick={connectAccount}>Please connect your Metamask wallet</button>
        ) : (
          <div>
            <p>Your Account: {account}</p>
            <p>Your Balance: {balance}</p>
            <div className="cus">
              <button onClick={deposit}>Deposit 1 ETH</button>
              <button onClick={withdraw}>Withdraw 1 ETH</button>
            </div>
            <div>
              <input
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <input
                type="text"
                placeholder="Amount (in ETH)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button onClick={send} className="custom-button">Send</button>
            </div>
          </div>
        )
      )}
      <style jsx>{`
        body {
          background-color: black;
        }
        .container {
          text-align: center;
          background-color: black;
          color: white;
        }
        .a {
          background-color: black;
          padding: 10px;
          margin: 20px;
        }
        .cus {
          background-color: #b48241;
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: transform 0.3s ease-in-out;
          padding: 10px;
        }
        .custom-button:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </main>
  );
}
