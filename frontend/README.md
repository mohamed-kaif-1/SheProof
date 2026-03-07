# 🛡️ SheProof

SheProof is a decentralized document verification platform built on Ethereum.

It enables users to generate tamper-proof, timestamped proof of ownership for any digital document or screenshot — without uploading the file to any server.

Only the SHA-256 cryptographic hash of the file is stored on-chain.

---

# 🌍 Problem Statement

Digital documents can be:

- Edited
- Manipulated
- Backdated
- Claimed by others

Traditional verification methods rely on centralized authorities.

SheProof eliminates this by using blockchain immutability.

---

# 💡 Solution

SheProof creates:

- Cryptographic fingerprint (SHA-256)
- Immutable blockchain timestamp
- Wallet-based ownership proof
- Public verification system
- Downloadable proof certificate
- Chrome extension for instant screenshot hashing

No file ever leaves the user's device.

---

# 🏗️ System Architecture
            ┌──────────────────────┐
            │      User Device     │
            │  (Browser / Extension)│
            └──────────┬───────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │ React + Vite Frontend│
            │ - File Upload        │
            │ - Screenshot Capture │
            │ - SHA-256 Hashing    │
            └──────────┬───────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │    Ethers.js Layer   │
            │ - Wallet Connect     │
            │ - Transaction Send   │
            └──────────┬───────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │ Solidity Smart Contract│
            │  Ethereum Sepolia    │
            │ - Store hash         │
            │ - Store owner        │
            │ - Store timestamp    │
            └──────────────────────┘


---

# 🔐 How It Works

## 1️⃣ Upload / Screenshot

User:
- Uploads file
- OR captures screenshot (via extension or UI)

## 2️⃣ Hash Generation (Client-side)

Browser computes:
SHA-256(file)


Example:
0x3a6f...9d21


This ensures:

- Even 1-byte change = completely different hash
- Zero file storage on server

## 3️⃣ Store On Blockchain

Smart contract stores:

```solidity
mapping(bytes32 => Proof)

struct Proof {
    address owner;
    uint256 timestamp;
}

4️⃣ Verification

User uploads file again:

      Hash recalculated
      Compared with blockchain mapping
      Displays:
            Owner wallet
            Timestamp
            Verification status

🧩 Project Structure
SheProof/
│
├── frontend/        # React + Vite Application
│   ├── pages/
│   ├── components/
│   ├── utils/
│
├── blockchain/      # Solidity Smart Contract
│   ├── contracts/
│   ├── scripts/
│
├── extension/       # Chrome Extension (Manifest V3)
│   ├── popup.js
│   ├── manifest.json
│
└── README.md

Security Properties

Immutable timestamp

Wallet-based identity

Cannot overwrite existing proof

Fully transparent on Etherscan

🌐 Chrome Extension Flow

Capture visible tab

Convert image to ArrayBuffer

Generate SHA-256 hash

Open SheProof upload page

Auto-fill screenshot for proof storage

📜 Certificate System

After successful verification:

User can download PDF certificate

Includes:

Document hash

Owner wallet

Blockchain timestamp

Network name

Screenshot preview

🛡️ Security Design

No backend server

No file uploads

No centralized database

Pure client-side hashing

On-chain immutable record

Wallet-based cryptographic identity

⚡ Tech Stack
Frontend

React

Vite

Ethers.js

jsPDF

Neo-Brutalism UI

Blockchain

Solidity

Hardhat

Ethereum Sepolia

Extension

Chrome Manifest V3

Web Crypto API

📊 Key Features

✔ Tamper-proof document verification
✔ Blockchain timestamping
✔ Wallet-based ownership
✔ Public verification link
✔ Certificate download
✔ Chrome extension integration
✔ Screenshot hashing
✔ Neo-Brutalism UI

🚀 Future Enhancements

IPFS optional storage

Multi-chain support

NFT-based proof minting

QR-based verification sharing

Institutional verification dashboard

AI-powered document integrity checks

🧪 Network

Ethereum Sepolia Testnet

🏆 Why SheProof Is Unique

Unlike traditional verification systems:

No centralized authority

No file storage

No server dependency

Fully decentralized integrity proof

Extension-powered instant web proof

👨‍💻 Developed By

Mohamed Kaif & Team