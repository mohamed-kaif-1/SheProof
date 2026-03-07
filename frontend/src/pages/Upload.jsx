import { useState } from "react";
import FileUploader from "../components/FileUploader.jsx";
import { hashFile } from "../utils/hashFile.js";
import { storeProofOnChain } from "../utils/blockchain.js";
import ScreenshotButton from "../components/ScreenshotButton";
import { getMetadata } from "../utils/getMetadata";

const styles = {
  page: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "60px 32px",
  },
  header: {
    marginBottom: "40px",
  },
  tag: {
    display: "inline-block",
    background: "#FF3B3B",
    color: "#fff",
    border: "4px solid black",
    padding: "6px 16px",
    fontWeight: "800",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: "16px",
    boxShadow: "4px 4px 0px black",
  },
  h1: {
    fontWeight: "800",
    fontSize: "clamp(36px, 6vw, 64px)",
    letterSpacing: "-0.03em",
    lineHeight: "1.05",
    marginBottom: "16px",
  },
  sub: {
    fontWeight: "500",
    fontSize: "16px",
    color: "#555",
    lineHeight: "1.6",
  },
  section: {
    background: "#fff",
    border: "4px solid black",
    boxShadow: "8px 8px 0px black",
    padding: "32px",
    marginBottom: "24px",
  },
  sectionTitle: {
    fontWeight: "800",
    fontSize: "18px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  stepBadge: {
    background: "#000",
    color: "#FFD600",
    border: "2px solid #FFD600",
    padding: "2px 10px",
    fontWeight: "700",
    fontSize: "13px",
  },
  hashBox: {
    background: "#000",
    color: "#00FF88",
    padding: "16px 20px",
    fontFamily: "monospace",
    fontSize: "13px",
    wordBreak: "break-all",
    border: "4px solid black",
    lineHeight: "1.6",
    marginTop: "16px",
  },
  hashLabel: {
    fontWeight: "700",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "8px",
    color: "#555",
  },
  btn: {
    width: "100%",
    padding: "20px",
    background: "#FFD600",
    border: "4px solid black",
    boxShadow: "6px 6px 0px black",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: "800",
    fontSize: "18px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    cursor: "pointer",
    transition: "transform 0.1s, box-shadow 0.1s",
    display: "block",
  },
  btnDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  btnLoading: {
    background: "#ccc",
    cursor: "wait",
  },
  success: {
    background: "#00FF88",
    border: "4px solid black",
    boxShadow: "8px 8px 0px black",
    padding: "32px",
    marginBottom: "24px",
  },
  successTitle: {
    fontWeight: "800",
    fontSize: "28px",
    marginBottom: "16px",
    textTransform: "uppercase",
  },
  txBox: {
    background: "#000",
    color: "#FFD600",
    padding: "14px 18px",
    fontFamily: "monospace",
    fontSize: "12px",
    wordBreak: "break-all",
    border: "3px solid black",
    marginTop: "12px",
  },
  txLabel: {
    fontWeight: "700",
    fontSize: "13px",
    textTransform: "uppercase",
    marginBottom: "6px",
  },
  error: {
    background: "#FF3B3B",
    color: "#fff",
    border: "4px solid black",
    boxShadow: "6px 6px 0px black",
    padding: "20px 24px",
    fontWeight: "700",
    fontSize: "15px",
    marginBottom: "24px",
    lineHeight: "1.5",
  },
  resetBtn: {
    marginTop: "20px",
    padding: "14px 24px",
    background: "#000",
    color: "#FFD600",
    border: "4px solid #FFD600",
    boxShadow: "4px 4px 0px #FFD600",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
    textTransform: "uppercase",
  },
};

export default function Upload() {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | hashing | ready | storing | success | error
  const [txHash, setTxHash] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    const meta = getMetadata(selectedFile, "upload");
    console.log("Metadata:", meta);

    setHash(null);
    setStatus("idle");
    setError(null);
    setTxHash(null);
    if (!selectedFile) return;
    setStatus("hashing");
    try {
      const h = await hashFile(selectedFile);
      setHash(h);
      setStatus("ready");
    } catch (e) {
      setError("Failed to hash file: " + e.message);
      setStatus("error");
    }
  };

  const handleStore = async () => {
    if (!hash) return;
    setStatus("storing");
    setError(null);
    try {
      const { txHash } = await storeProofOnChain(hash);
      localStorage.setItem(hash.toLowerCase(), txHash);
      setTxHash(txHash);
      setStatus("success");
    } catch (e) {
      let msg = e.message;
      if (e.code === 4001 || msg.includes("rejected") || msg.includes("denied")) {
        msg = "Transaction rejected by user in MetaMask.";
      } else if (msg.includes("Wrong network")) {
        msg = msg;
      } else if (msg.includes("not configured")) {
        msg = msg;
      }
      setError(msg);
      setStatus("error");
    }
  };

  const handleReset = () => {
    setFile(null);
    setHash(null);
    setStatus("idle");
    setError(null);
    setTxHash(null);
  };
  const downloadUploadedImage = () => {
  if (!file) return;

  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = file.name || "SheProof_Uploaded_Image.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  const btnStyle = () => {
    if (status === "storing") return { ...styles.btn, ...styles.btnLoading };
    if (!hash || status === "hashing") return { ...styles.btn, ...styles.btnDisabled };
    return styles.btn;
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.tag}>Step 1 of 2</div>
        <h1 style={styles.h1}>Store Document Proof</h1>
        <p style={styles.sub}>
          Select a file to generate its SHA-256 hash and store it permanently on the Sepolia blockchain.
          Your file never leaves your browser.
        </p>
      </div>

      {status === "success" && (
        <div style={styles.success}>
          <div style={styles.successTitle}>✅ Proof Stored Successfully!</div>
          <p style={{ fontWeight: "600", fontSize: "15px", marginBottom: "16px" }}>
            Your document proof is now permanently recorded on the Ethereum Sepolia blockchain.
          </p>
          <div>
            <div style={styles.txLabel}>Transaction Hash:</div>
            <div style={styles.txBox}>{txHash}</div>
          </div>
          <div style={{ marginTop: "16px" }}>
            <div style={styles.txLabel}>Document Hash (bytes32):</div>
            <div style={styles.txBox}>{hash}</div>
          </div>
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", marginTop: "20px", fontWeight: "700", color: "#000", textDecoration: "underline", fontSize: "15px" }}
          >
            View on Etherscan →
          </a>
          <button style={{ ...styles.resetBtn, marginLeft: "16px" }} onClick={handleReset}>
            Store Another
          </button>
        </div>
      )}

      {error && status === "error" && (
        <div style={styles.error}>
          ⚠ Error: {error}
          <br />
          <button style={{ ...styles.resetBtn, marginTop: "16px", boxShadow: "4px 4px 0 #fff" }} onClick={handleReset}>
            Try Again
          </button>
        </div>
      )}

      {status !== "success" && (
        <>
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <span style={styles.stepBadge}>01</span>
              Select Your File
            </div>
            <FileUploader onFileSelect={handleFileSelect} label="Select document to prove" />

          <div style={{marginTop:"16px"}}>
              <ScreenshotButton
            onCapture={handleFileSelect}/>
            </div>
          </div>
          {file && file.type.startsWith("image/") && (
            <div style={styles.section}>
              <div style={styles.sectionTitle}>
                <span style={styles.stepBadge}>PREVIEW</span>
                Captured Image Preview
              </div>

              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                style={{
                  width: "100%",
                  border: "4px solid black",
                  boxShadow: "6px 6px 0px black"
                }}
              />

              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = URL.createObjectURL(file);
                  link.download = file.name || "SheProof_Image.png";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                style={{
                  marginTop: "16px",
                  padding: "12px 18px",
                  background: "black",
                  color: "white",
                  border: "4px solid #FFD600",
                  boxShadow: "4px 4px 0px #FFD600",
                  cursor: "pointer",
                  fontWeight: "800",
                  textTransform: "uppercase",
                  display: "block"
                }}
              >
                Download Uploaded Image
              </button>

            </div>
          )}
          {hash && (
            <div style={styles.section}>
              <div style={styles.sectionTitle}>
                <span style={styles.stepBadge}>02</span>
                SHA-256 Hash Generated
              </div>
              <div style={styles.hashLabel}>Document Fingerprint (bytes32):</div>
              <div style={styles.hashBox}>{hash}</div>
              <p style={{ marginTop: "12px", fontSize: "13px", color: "#555", fontWeight: "500" }}>
                This hash uniquely identifies your document. Even a 1-character change produces a completely different hash.
              </p>
            </div>
          )}

          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <span style={styles.stepBadge}>03</span>
              Store on Blockchain
            </div>
            <p style={{ fontWeight: "500", fontSize: "15px", color: "#444", marginBottom: "20px", lineHeight: "1.6" }}>
              {!hash
                ? "Select a file above first to generate its hash."
                : status === "hashing"
                ? "Generating hash..."
                : "Click below to connect MetaMask and store your proof on Sepolia. You will need to approve a transaction and pay a small gas fee."}
            </p>
            <button
              style={btnStyle()}
              onClick={handleStore}
              disabled={!hash || status === "storing" || status === "hashing"}
              onMouseDown={(e) => {
                if (!hash || status !== "ready") return;
                e.currentTarget.style.transform = "translate(3px,3px)";
                e.currentTarget.style.boxShadow = "3px 3px 0px black";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "6px 6px 0px black";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "6px 6px 0px black";
              }}
            >
              {status === "storing" ? "⏳ Storing on Blockchain..." : status === "hashing" ? "⏳ Hashing..." : "→ Store Proof on Blockchain"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
