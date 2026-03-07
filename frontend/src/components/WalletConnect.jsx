import { useState, useEffect } from "react";
import { connectWallet, getNetwork, SEPOLIA_CHAIN_ID } from "../utils/blockchain.js";

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  btn: {
    padding: "10px 20px",
    background: "#FFD600",
    border: "4px solid black",
    boxShadow: "6px 6px 0px black",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    transition: "transform 0.1s, box-shadow 0.1s",
    whiteSpace: "nowrap",
  },
  address: {
    padding: "10px 16px",
    background: "#000",
    color: "#FFD600",
    border: "4px solid black",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: "700",
    fontSize: "13px",
    letterSpacing: "0.03em",
  },
  warning: {
    padding: "8px 14px",
    background: "#FF3B3B",
    color: "#fff",
    border: "4px solid black",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: "700",
    fontSize: "13px",
  },
  dot: {
    display: "inline-block",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#00FF88",
    marginRight: "8px",
    border: "2px solid black",
  },
};

export default function WalletConnect({ onWalletUpdate }) {
  const [address, setAddress] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const truncate = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const handleConnect = async () => {
    setLoading(true);
    setError(null);
    try {
      const { address: addr, chainId: cid } = await connectWallet();
      setAddress(addr);
      setChainId(cid);
      if (onWalletUpdate) onWalletUpdate({ address: addr, chainId: cid });
    } catch (e) {
      setError(e.message.includes("rejected") ? "Connection rejected." : e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!window.ethereum) return;
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setAddress(null);
        setChainId(null);
        if (onWalletUpdate) onWalletUpdate(null);
      } else {
        setAddress(accounts[0]);
        if (onWalletUpdate) onWalletUpdate({ address: accounts[0], chainId });
      }
    };
    const handleChainChanged = (cid) => {
      const numCid = parseInt(cid, 16);
      setChainId(numCid);
      if (address && onWalletUpdate) onWalletUpdate({ address, chainId: numCid });
    };
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, [address, chainId, onWalletUpdate]);

  return (
    <div style={styles.wrapper}>
      {address ? (
        <>
          <div style={styles.address}>
            <span style={styles.dot} />
            {truncate(address)}
          </div>
          {chainId !== SEPOLIA_CHAIN_ID && (
            <div style={styles.warning}>⚠ Switch to Sepolia!</div>
          )}
        </>
      ) : (
        <button
          style={{
            ...styles.btn,
            opacity: loading ? 0.7 : 1,
          }}
          onClick={handleConnect}
          disabled={loading}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translate(3px,3px)";
            e.currentTarget.style.boxShadow = "3px 3px 0px black";
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "translate(0,0)";
            e.currentTarget.style.boxShadow = "6px 6px 0px black";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translate(0,0)";
            e.currentTarget.style.boxShadow = "6px 6px 0px black";
          }}
        >
          {loading ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
      {error && <div style={styles.warning}>⚠ {error}</div>}
    </div>
  );
}
