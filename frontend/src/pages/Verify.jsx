import { useState } from "react";
import FileUploader from "../components/FileUploader.jsx";
import { hashFile } from "../utils/hashFile.js";
import { verifyProofOnChain, findTxHashForProof } from "../utils/blockchain.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ProofCertificate from "../components/ProofCertificate";const styles = {
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
    background: "#000",
    color: "#FFD600",
    border: "4px solid black",
    padding: "6px 16px",
    fontWeight: "800",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: "16px",
    boxShadow: "4px 4px 0px #FFD600",
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
    background: "#000",
    color: "#FFD600",
    border: "4px solid black",
    boxShadow: "6px 6px 0px #FFD600",
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
    opacity: 0.4,
    cursor: "not-allowed",
  },
  resultVerified: {
    background: "#00FF88",
    border: "4px solid black",
    boxShadow: "8px 8px 0px black",
    padding: "40px 32px",
    marginBottom: "24px",
    textAlign: "center",
  },
  resultNotFound: {
    background: "#FF3B3B",
    border: "4px solid black",
    boxShadow: "8px 8px 0px black",
    padding: "40px 32px",
    marginBottom: "24px",
    textAlign: "center",
  },
  resultIcon: {
    fontSize: "72px",
    display: "block",
    marginBottom: "16px",
  },
  resultTitle: {
    fontWeight: "800",
    fontSize: "36px",
    textTransform: "uppercase",
    letterSpacing: "-0.02em",
    marginBottom: "12px",
  },
  resultSub: {
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "1.5",
  },
  hashSmall: {
    fontFamily: "monospace",
    fontSize: "12px",
    wordBreak: "break-all",
    marginTop: "16px",
    background: "rgba(0,0,0,0.1)",
    padding: "10px 14px",
    border: "2px solid black",
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
    display: "inline-block",
  },
};

export default function Verify() {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState(null);
  const [status, setStatus] = useState("idle");
  const [verified, setVerified] = useState(null);
  const [error, setError] = useState(null);
  const [txHash, setTxHash] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [fileHash, setFileHash] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
    setHash(null);
    setStatus("idle");
    setError(null);
    setVerified(null);
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
  const downloadPDF = async () => {
  const element = document.getElementById("proof-container");

  if (!element) {
    alert("Certificate not ready yet!");
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth - 20; // 10mm margin each side
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  const yPosition = (pageHeight - imgHeight) / 2; // center vertically

  pdf.addImage(imgData, "PNG", 10, yPosition, imgWidth, imgHeight);

  pdf.save("SheProof_Certificate.pdf");
};
  const handleVerify = async () => {
    if (!hash) return;
    setStatus("verifying");
    setError(null);
    try {
      const { exists, owner, timestamp } = await verifyProofOnChain(hash);

        setVerified(exists);

        if (exists) {
          setFileHash(hash);
          setWalletAddress(owner);

          const storedTx =
            localStorage.getItem(hash.toLowerCase()) ||
            localStorage.getItem(hash);

          if (storedTx) {
            setTxHash(storedTx);
          } else {
            const txFromChain = await findTxHashForProof(hash);
            setTxHash(txFromChain || "Not Available");
          }
        }
        
setStatus("done");
    } catch (e) {
      let msg = e.message;
      if (e.code === 4001 || msg.includes("rejected") || msg.includes("denied")) {
        msg = "Transaction rejected by user in MetaMask.";
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
    setVerified(null);
  };

  const canVerify = hash && status === "ready";

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.tag}>✓ Verification Tool</div>
        <h1 style={styles.h1}>Verify Document Proof</h1>
        <p style={styles.sub}>
          Upload a document to check if its proof exists on the Sepolia blockchain.
          Your file never leaves your browser — only the hash is checked on-chain.
        </p>
      </div>

      {status === "done" && verified !== null && (
        <>
          {verified ? (
            <div style={styles.resultVerified}>
              
              <div style={styles.resultTitle}>VERIFIED</div>
              <div style={styles.resultSub}>
                This document's proof exists on the Ethereum Sepolia blockchain.<br />
                The document is authentic and has not been tampered with.
              </div>
              <div style={styles.hashSmall}>Hash: {hash}</div>
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                  <ProofCertificate
                    imagePreview={imagePreview}
                    fileHash={fileHash}
                    txHash={txHash || "Not Available"}
                    walletAddress={walletAddress}
                  />
                </div>

                <button
                  onClick={downloadPDF}
                  style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    background: "black",
                    color: "white",
                    cursor: "pointer"
                  }}
                >
                  Download PDF
                </button>
              <button style={styles.resetBtn} onClick={handleReset}>Verify Another</button>
            </div>
          ) : (
            <div style={styles.resultNotFound}>
              
              <div style={{ ...styles.resultTitle, color: "#fff" }}>NOT FOUND</div>
              <div style={{ ...styles.resultSub, color: "#fff" }}>
                No proof of this document exists on the blockchain.<br />
                It may not have been stored, or the file may have been modified.
              </div>
              <div style={{ ...styles.hashSmall, background: "rgba(0,0,0,0.2)", color: "#fff" }}>
                Hash: {hash}
              </div>
              <button style={{ ...styles.resetBtn, border: "4px solid #fff", boxShadow: "4px 4px 0px #fff" }} onClick={handleReset}>
                Try Another File
              </button>
            </div>
          )}
        </>
      )}

      {error && status === "error" && (
        <div style={styles.error}>
          ⚠ Error: {error}
          <br />
          <button style={{ ...styles.resetBtn, marginTop: "16px", boxShadow: "4px 4px 0 #fff", border: "4px solid #fff" }} onClick={handleReset}>
            Try Again
          </button>
        </div>
      )}

      {status !== "done" && (
        <>
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <span style={styles.stepBadge}>01</span>
              Select the Document to Verify
            </div>
            <FileUploader onFileSelect={handleFileSelect} label="Select document to verify" />
          </div>

          {hash && (
            <div style={styles.section}>
              <div style={styles.sectionTitle}>
                <span style={styles.stepBadge}>02</span>
                Hash Computed
              </div>
              <div style={styles.hashLabel}>SHA-256 Fingerprint:</div>
              <div style={styles.hashBox}>{hash}</div>
              <p style={{ marginTop: "12px", fontSize: "13px", color: "#555", fontWeight: "500" }}>
                This hash will be checked against the blockchain record.
              </p>
            </div>
          )}
         

          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <span style={styles.stepBadge}>03</span>
              Check Blockchain
            </div>
            <p style={{ fontWeight: "500", fontSize: "15px", color: "#444", marginBottom: "20px", lineHeight: "1.6" }}>
              {!hash
                ? "Select a file above first to generate its hash."
                : status === "hashing"
                ? "Generating hash..."
                : status === "verifying"
                ? "Querying blockchain..."
                : "Click below to connect MetaMask and verify if this document's proof exists on Sepolia."}
            </p>
            <button
              style={{
                ...styles.btn,
                ...(!canVerify || status === "verifying" ? styles.btnDisabled : {}),
              }}
              onClick={handleVerify}
              disabled={!canVerify || status === "verifying"}
              onMouseDown={(e) => {
                if (!canVerify) return;
                e.currentTarget.style.transform = "translate(3px,3px)";
                e.currentTarget.style.boxShadow = "3px 3px 0px #FFD600";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "6px 6px 0px #FFD600";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "6px 6px 0px #FFD600";
              }}
            >
              {status === "verifying" ? "⏳ Checking Blockchain..." : status === "hashing" ? "⏳ Hashing..." : "✓ Verify on Blockchain"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
