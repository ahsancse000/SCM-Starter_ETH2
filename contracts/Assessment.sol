[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "ZeroAddress",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "selectedAuditor",
        "type": "address"
      }
    ],
    "name": "AuditorSelected",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "allAuditors",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "category",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "_auditor",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "currentGigs",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isConfirmed",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "confirmationTime",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "address",
                "name": "contractInstance",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              }
            ],
            "internalType": "struct Audit.AuditorContracts[]",
            "name": "contractsAddress",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct Audit.Auditor[]",
        "name": "_auditors",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "auditor_",
    "outputs": [
      {
        "internalType": "string",
        "name": "category",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_auditor",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "currentGigs",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isConfirmed",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "confirmationTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "auditorsCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_category",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      }
    ],
    "name": "becomeAuditor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_category",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "ranNum",
        "type": "uint256"
      }
    ],
    "name": "getAuditorByCategory",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "returnSelectedAuditor",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
