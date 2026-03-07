import { Link } from "react-router-dom";

const styles = {
  hero: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "80px 32px 60px",
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
    marginBottom: "24px",
    boxShadow: "4px 4px 0px black",
  },
  h1: {
    fontWeight: "800",
    fontSize: "clamp(48px, 8vw, 96px)",
    lineHeight: "1.0",
    letterSpacing: "-0.04em",
    marginBottom: "24px",
    color: "#000",
  },
  accent: {
    background: "#FFD600",
    borderBottom: "6px solid black",
    display: "inline",
    paddingBottom: "2px",
  },
  sub: {
    fontWeight: "500",
    fontSize: "clamp(16px, 2.5vw, 22px)",
    color: "#333",
    maxWidth: "620px",
    lineHeight: "1.5",
    marginBottom: "48px",
  },
  ctas: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "80px",
  },
  btnPrimary: {
    padding: "18px 36px",
    background: "#FF3B3B",
    color: "#fff",
    border: "4px solid black",
    boxShadow: "6px 6px 0px black",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: "800",
    fontSize: "18px",
    textDecoration: "none",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    display: "inline-block",
    transition: "transform 0.1s, box-shadow 0.1s",
    cursor: "pointer",
  },
  btnSecondary: {
    padding: "18px 36px",
    background: "#FFD600",
    color: "#000",
    border: "4px solid black",
    boxShadow: "6px 6px 0px black",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: "800",
    fontSize: "18px",
    textDecoration: "none",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    display: "inline-block",
    transition: "transform 0.1s, box-shadow 0.1s",
    cursor: "pointer",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    marginBottom: "80px",
  },
  card: {
    background: "#fff",
    border: "4px solid black",
    boxShadow: "8px 8px 0px black",
    padding: "32px",
  },
  cardIcon: {
    fontSize: "48px",
    display: "block",
    marginBottom: "16px",
  },
  cardTitle: {
    fontWeight: "800",
    fontSize: "22px",
    marginBottom: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.03em",
  },
  cardText: {
    fontWeight: "500",
    fontSize: "15px",
    color: "#444",
    lineHeight: "1.6",
  },
  sectionTitle: {
    fontWeight: "800",
    fontSize: "36px",
    marginBottom: "32px",
    textTransform: "uppercase",
    letterSpacing: "-0.02em",
    borderBottom: "4px solid black",
    paddingBottom: "16px",
  },
  howStep: {
    display: "flex",
    alignItems: "flex-start",
    gap: "24px",
    marginBottom: "24px",
    padding: "24px",
    background: "#fff",
    border: "4px solid black",
    boxShadow: "6px 6px 0px black",
  },
  stepNum: {
    background: "#ff9900",
    color: "#fff",
    border: "4px solid black",
    fontWeight: "800",
    fontSize: "24px",
    width: "56px",
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stepContent: {},
  stepTitle: { fontWeight: "700", fontSize: "18px", marginBottom: "6px" },
  stepText: { fontWeight: "500", fontSize: "14px", color: "#555", lineHeight: "1.6" },
  footer: {
    borderTop: "4px solid black",
    background: "#000",
    color: "#f2f3acbe",
    textAlign: "center",
    padding: "28px",
    fontWeight: "700",
    fontSize: "15px",
    letterSpacing: "0.05em",
  },
};

const hoverPrimary = (e, active) => {
  e.currentTarget.style.transform = active ? "translate(3px,3px)" : "";
  e.currentTarget.style.boxShadow = active ? "3px 3px 0px black" : "6px 6px 0px black";
};

export default function Landing() {
  return (
    <>
      <div style={styles.hero}>
        <div style={styles.tag}>Blockchain-Powered Document Proof</div>
        <h1 style={styles.h1}>
          Upload Once<br />
          <span style={styles.accent}>Verify Anytime</span> </h1>
        <p style={styles.sub}>
         SheProof stores a unique fingerprint of your document on the Ethereum blockchain, creating a permanent, tamper-proof proof that anyone can verify anytime.
        </p>
        <div style={styles.ctas}>
          <Link
            to="/upload"
            style={styles.btnPrimary}
            onMouseDown={(e) => hoverPrimary(e, true)}
            onMouseUp={(e) => hoverPrimary(e, false)}
            onMouseLeave={(e) => hoverPrimary(e, false)}
          >
            Store Proof
          </Link>
          <Link
            to="/verify"
            style={styles.btnSecondary}
            onMouseDown={(e) => hoverPrimary(e, true)}
            onMouseUp={(e) => hoverPrimary(e, false)}
            onMouseLeave={(e) => hoverPrimary(e, false)}
          >
            Verify Document
          </Link>
        </div>
        <div style={styles.sectionTitle}>How It Works</div>
        {[
          { n: "01", title: "Select Your Document", text: "Choose any file — PDF, image. It stays on your device." },
          { n: "02", title: "Generate SHA-256 Hash", text: "We compute a cryptographic fingerprint of your file in-browser using the Web Crypto API." },
          { n: "03", title: "Store on Blockchain", text: "Connect MetaMask, pay a small gas fee, and store the hash permanently on Sepolia." },
          { n: "04", title: "Verify Anytime", text: "Later, anyone can upload the same file to verify it matches the on-chain record." },
        ].map((s) => (
          <div key={s.n} style={styles.howStep}>
            <div style={styles.stepNum}>{s.n}</div>
            <div style={styles.stepContent}>
              <div style={styles.stepTitle}>{s.title}</div>
              <div style={styles.stepText}>{s.text}</div>
            </div>
          </div>
        ))}
      </div>
      <footer style={styles.footer}>
         SHEPROOF — Built on Ethereum Sepolia
      </footer>
    </>
  );
}
