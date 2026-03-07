import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/contract.js";

export const SEPOLIA_CHAIN_ID = 11155111;

export async function getProvider() {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed. Please install MetaMask to continue.");
  }
  return new ethers.BrowserProvider(window.ethereum);
}

export async function connectWallet() {
  const provider = await getProvider();
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const network = await provider.getNetwork();
  return { provider, signer, address, chainId: Number(network.chainId) };
}

export async function getNetwork() {
  const provider = await getProvider();
  const network = await provider.getNetwork();
  return Number(network.chainId);
}

export function getContract(signerOrProvider) {
  if (!CONTRACT_ADDRESS) {
    throw new Error("Contract address not configured. Please edit src/config/contract.js");
  }
  if (!CONTRACT_ABI || CONTRACT_ABI.length === 0) {
    throw new Error("Contract ABI not configured. Please edit src/config/contract.js");
  }
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
}

export async function storeProofOnChain(hash) {
  const { signer, chainId } = await connectWallet();
  if (chainId !== SEPOLIA_CHAIN_ID) {
    throw new Error(
      `Wrong network. Please switch MetaMask to Sepolia testnet (Chain ID: ${SEPOLIA_CHAIN_ID}). Current chain ID: ${chainId}`
    );
  }
  const contract = getContract(signer);
  const tx = await contract.storeProof(hash);
  await tx.wait();
  return { txHash: tx.hash };
}

export async function verifyProofOnChain(hash) {
  const { signer, chainId } = await connectWallet();

  if (chainId !== SEPOLIA_CHAIN_ID) {
    throw new Error(
      `Wrong network. Please switch MetaMask to Sepolia testnet (Chain ID: ${SEPOLIA_CHAIN_ID}). Current chain ID: ${chainId}`
    );
  }

  const contract = getContract(signer);
  const result = await contract.verifyProof(hash);

  return {
    exists: result[0],
    owner: result[1],
    timestamp: Number(result[2]),
  };
}

export async function findTxHashForProof(hash) {
  const provider = await getProvider();

  const topic0 = ethers.id("ProofStored(string,address,uint256)");
  const logs = await provider.getLogs({
    address: CONTRACT_ADDRESS,
    fromBlock: 0,
    toBlock: "latest",
    topics: [topic0],
  });

  const iface = new ethers.Interface(CONTRACT_ABI);
  const target = hash.toLowerCase();

  for (let i = logs.length - 1; i >= 0; i--) {
    const log = logs[i];
    const decoded = iface.decodeEventLog("ProofStored", log.data, log.topics);
    const loggedHash = String(decoded.hash).toLowerCase();

    if (loggedHash === target) return log.transactionHash;
  }

  return null;
}