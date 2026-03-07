// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SheProof {
    struct Proof {
        address owner;
        uint256 timestamp;
        bool exists;
    }

    mapping(string => Proof) private proofs;

    event ProofStored(string hash, address owner, uint256 timestamp);

    // Store a proof (hash) on-chain. Reverts if already stored.
    function storeProof(string memory hash) public {
        require(!proofs[hash].exists, "Proof already exists");
        proofs[hash] = Proof(msg.sender, block.timestamp, true);
        emit ProofStored(hash, msg.sender, block.timestamp);
    }

    // Verify: returns (exists, owner, timestamp)
    function verifyProof(string memory hash)
        public
        view
        returns (bool exists, address owner, uint256 timestamp)
    {
        Proof memory p = proofs[hash];
        return (p.exists, p.owner, p.timestamp);
    }
}