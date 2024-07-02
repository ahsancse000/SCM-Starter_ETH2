import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";


export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
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

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };
  const send = async () => {
    if (atm) {
      //if (atm && recipient && amount) {
      let tx = await atm.send(recipient, amount);
      await tx.wait();
      getBalance();
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button onClick={connectAccount}>
          Please connect your Metamask wallet
        </button>
      );
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
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
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
        <div className="a">
          <h1>Metamask Wallet Integration</h1>
        </div>
      </header>
      <div>
        <div style={{ textAlign: "center", fontSize: "30px" }}>
         
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "35px",
            }}
          >
           
          </div>
        </div>
      </div>
      {initUser()}
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
          margin-right: 50px;
          border-radius: 50px;
          cursor: pointer;
          transition: transform 0.3s ease-in-out;
        }

        .custom-button:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </main>
  );
}
