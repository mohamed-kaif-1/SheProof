import React from "react";
import logo from "../assets/sheproof_logo.png";

const ProofCertificate = ({ imagePreview, fileHash, txHash, walletAddress }) => {
  return (
    <div
      id="proof-container"
      style={{
        width: "100%",
        maxWidth: "720px",
        margin: "20px auto 0",
        padding: "28px",
        border: "4px solid black",
        boxShadow: "8px 8px 0px black",
        fontFamily: "Arial",
        position: "relative",
        overflow: "hidden",
        background: "rgba(0,0,0,0.08)"
      }}
    >
      <img
        src={logo}
        alt="watermark"
        style={{
          position: "absolute",
          inset: "0",
          margin: "auto",
          width: "520px",
          maxWidth: "90%",
          opacity: 0.08,
          transform: "rotate(-18deg)",
          pointerEvents: "none",
          filter: "grayscale(100%)"
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: "12px", position: "relative" }}>
        <img
          src={logo}
          alt="SheProof"
          style={{
            width: "54px",
            height: "54px",
            objectFit: "contain"
          }}
        />
        <div>
          <div style={{ fontSize: "20px", fontWeight: "800" }}>
            SheProof Blockchain Certificate
          </div>
          <div style={{ fontSize: "12px", fontWeight: "700", opacity: 0.8 }}>
            Verified on Ethereum Sepolia
          </div>
        </div>
      </div>

      <hr style={{ border: "0", borderTop: "3px solid black", margin: "16px 0", position: "relative" }} />

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Uploaded"
          style={{
            width: "100%",
            marginTop: "10px",
            border: "3px solid black",
            boxShadow: "6px 6px 0px black",
            position: "relative"
          }}
        />
      )}

      <div style={{ marginTop: "18px", fontSize: "14px", position: "relative" }}>
        <p style={{ margin: "8px 0" }}><b>File Hash:</b> {fileHash}</p>
        <p style={{ margin: "8px 0" }}><b>Transaction Hash:</b> {txHash || "Not Available"}</p>
        <p style={{ margin: "8px 0" }}><b>Wallet Address:</b> {walletAddress}</p>
        <p style={{ margin: "8px 0" }}><b>Timestamp:</b> {new Date().toLocaleString()}</p>
      </div>

      <div
        style={{
          marginTop: "18px",
          padding: "10px 12px",
          border: "3px dashed black",
          fontWeight: "800",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontSize: "12px",
          position: "relative",
          background: "rgba(255,255,255,0.35)"
        }}
      >
        ✔ Tamper-evident • Hash stored on-chain • SheProof
      </div>
    </div>
  );
};

export default ProofCertificate;