import { Link, useLocation } from "react-router-dom";
import WalletConnect from "./WalletConnect.jsx";

const styles = {
  nav: {
    background: "#FF3B3B",
    borderBottom: "4px solid black",
    padding: "0 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "72px",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontWeight: "800",
    fontSize: "28px",
    color: "#000",
    textDecoration: "none",
    letterSpacing: "-0.03em",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  logoAccent: {
    background: "#FFD600",
    border: "3px solid black",
    padding: "2px 8px",
    display: "inline-block",
  },
  links: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  link: {
    fontWeight: "700",
    fontSize: "15px",
    textDecoration: "none",
    color: "#000",
    padding: "8px 16px",
    border: "3px solid black",
    background: "#FDF6E3",
    boxShadow: "4px 4px 0px black",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    transition: "transform 0.1s, box-shadow 0.1s",
    display: "inline-block",
  },
  activeLink: {
    background: "#FFD600",
  },
};

export default function Navbar() {
  const location = useLocation();

  const navLink = (to, label) => ({
    ...styles.link,
    ...(location.pathname === to ? styles.activeLink : {}),
  });

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        She<span style={styles.logoAccent}>Proof</span>
      </Link>
      <div style={styles.links}>
        <Link to="/upload" style={navLink("/upload", "Upload")}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-2px,-2px)"; e.currentTarget.style.boxShadow = "6px 6px 0px black"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "4px 4px 0px black"; }}
        >Upload</Link>
        <Link to="/verify" style={navLink("/verify", "Verify")}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translate(-2px,-2px)"; e.currentTarget.style.boxShadow = "6px 6px 0px black"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "4px 4px 0px black"; }}
        >Verify</Link>
        <WalletConnect />
      </div>
    </nav>
  );
}
