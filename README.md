# SheProof

Tamper-Proof Digital Evidence Verification using Blockchain.

SheProof enables users to generate immutable proof of existence for any digital file or screenshot without uploading the file itself.

Only the SHA-256 cryptographic hash of the document is stored on the blockchain.

---

## 3-Line Pitch

SheProof makes digital evidence tamper-proof.

The system generates a cryptographic fingerprint of files and records it on blockchain to create immutable proof of authenticity.

Upload a file and instantly verify whether it has been altered.

---

## Problem Frame

User  
People facing online harassment, fraud, or digital disputes who rely on screenshots, images, or videos as evidence.

Problem  
Digital files can easily be edited or manipulated, making it difficult to prove whether the evidence is authentic.

Constraints  
The system must protect user privacy, avoid storing large files directly on the blockchain, and remain simple for non-technical users.

Success Test  
A user can upload a file, store its cryptographic proof on blockchain, and later verify whether the file has been altered.

---

## Problem Statement

Digital documents can be:

- Edited  
- Manipulated  
- Backdated  
- Claimed by others  

Traditional verification methods rely on centralized authorities.

SheProof removes this dependency by using blockchain immutability and cryptographic hashing.

---

## Solution

SheProof creates:

- Cryptographic fingerprint (SHA-256)
- Immutable blockchain timestamp
- Wallet-based ownership proof
- Public verification system
- Downloadable proof certificate
- Chrome extension for instant screenshot hashing

No file ever leaves the user's device.

---

## System Architecture

User Device (Browser / Extension)

↓

React + Vite Frontend  
File Upload  
Screenshot Capture  
SHA-256 Hashing  

↓

Ethers.js Integration  
Wallet Connection  
Transaction Handling  

↓

Solidity Smart Contract  
Ethereum Sepolia Network  
Store Hash  
Store Owner  
Store Timestamp

---

## How It Works

### 1. Upload / Screenshot

User uploads a file or captures a screenshot.

### 2. Hash Generation

The browser computes:

```
SHA-256(file)
```

Example hash:

```
0x3a6f...9d21
```

Even a one-byte change produces a completely different hash.

### 3. Store on Blockchain

The smart contract stores:

```solidity
mapping(bytes32 => Proof)

struct Proof {
    address owner;
    uint256 timestamp;
}
```

### 4. Verification

User uploads the file again.

The system:

- Recalculates the hash
- Compares it with the blockchain record
- Displays owner wallet and timestamp

---

## Key Features

- Tamper-proof document verification
- Blockchain timestamping
- Wallet-based ownership proof
- Public verification system
- Certificate download
- Screenshot hashing
- Chrome extension support
- Privacy-preserving design

---

## Tech Stack

Frontend

- React
- Vite
- Ethers.js
- jsPDF

Blockchain

- Solidity
- Hardhat
- Ethereum Sepolia Testnet

Extension

- Chrome Extension (Manifest V3)
- Web Crypto API

---

## Network

Ethereum Sepolia Testnet

---

## Project Structure

```
SheProof
│
├── frontend
│   ├── pages
│   ├── components
│   └── utils
│
├── blockchain
│   ├── contracts
│   └── scripts
│
├── extension
│   ├── popup.js
│   └── manifest.json
│
├── docs
│   ├── decision-log.md
│   ├── evidence-log.md
│   └── risk-log.md
│
├── README.md
├── LICENSE
└── .env.example
```

---

## Quickstart

Clone the repository

```
git clone https://github.com/mohamed-kaif-1/SheProof.git
```

Install dependencies

```
npm install
```

Run development server

```
npm run dev
```

Open in browser

```
http://localhost:5173
```

---

## Decision Log

Decision  
Store only the cryptographic hash of files on blockchain instead of storing entire files.

Reason  
Blockchain storage is expensive and inefficient for large files.

Result  
Improves scalability while preserving privacy.

---

## Evidence Log

- SHA-256 hashing used for file fingerprinting
- Ethereum blockchain used for immutable timestamping
- Open-source libraries used according to their licenses

Example blockchain transaction

https://sepolia.etherscan.io/tx/0xdfe4d3d05ab099d78b21a2776908d7c78bfedb7e3c94bb5b1f8ef37c750a9fe0

---

## Risk Log

Risk  
Users may upload modified versions of the same file.

Fix  
SHA-256 hashing ensures even the smallest modification generates a completely different hash.

---

## Security Design

- No backend server
- No file uploads
- No centralized database
- Client-side hashing
- On-chain immutable record
- Wallet-based identity

---

## Live Demo

https://sheproof.netlify.app/

---

## Repository

https://github.com/mohamed-kaif-1/SheProof

---

## License

MIT License

---

## Team

| Name | Role |
|-----|-----|
| Mohamed Kaif | Blockchain Development and Deployment |
| Aasim | Frontend Development |
| Mabel Mercita | Testing and Documentation |