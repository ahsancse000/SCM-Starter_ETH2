// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address public owner;
    mapping(address => uint256) public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event Sent(address recipient, uint256 amount);

    constructor(uint256 initBalance) payable {
        owner = msg.sender;
        balance[owner] = initBalance;
    }

    function getBalance() public view returns (uint256) {
        return balance[owner];
    }

    function deposit(uint256 _amount) public payable {
        // Ensure the sent value matches the amount to deposit
        require(msg.value == _amount, "Incorrect ETH amount sent");

        uint256 _previousBalance = balance[owner];

        // Ensure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // Perform transaction
        balance[owner] += _amount;

        // Assert transaction completed successfully
        assert(balance[owner] == _previousBalance + _amount);

        // Emit the event
        emit Deposit(_amount);
    }

    // Custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint256 _previousBalance = balance[owner];
        if (balance[owner] < _withdrawAmount) {
            revert InsufficientBalance({ balance: balance[owner], withdrawAmount: _withdrawAmount });
        }

        // Withdraw the given amount
        balance[owner] -= _withdrawAmount;

        // Transfer the amount to the owner
        payable(owner).transfer(_withdrawAmount);

        // Assert the balance is correct
        assert(balance[owner] == (_previousBalance - _withdrawAmount));

        // Emit the event
        emit Withdraw(_withdrawAmount);
    }

    function send(address payable _recipient, uint256 _amount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(_amount <= balance[owner], "Insufficient balance");

        // Transfer the specified amount to the recipient
        balance[owner] -= _amount;
        balance[_recipient] += _amount;

        // Transfer the amount in Ether
        _recipient.transfer(_amount);

        // Emit the event
        emit Sent(_recipient, _amount);
    }

    // Function to receive ETH directly
    receive() external payable {
        deposit(msg.value);
    }
}
