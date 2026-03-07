import { useState, useRef } from "react";

const styles = {
  dropzone: {
    border: "4px dashed black",
    background: "#fff",
    padding: "48px 32px",
    textAlign: "center",
    cursor: "pointer",
    transition: "background 0.15s",
    position: "relative",
    userSelect: "none",
  },
  dropzoneActive: {
    background: "#FFD600",
  },
  icon: {
    fontSize: "48px",
    display: "block",
    marginBottom: "16px",
  },
  title: {
    fontWeight: "800",
    fontSize: "20px",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  sub: {
    fontWeight: "500",
    fontSize: "14px",
    color: "#555",
  },
  fileInfo: {
    marginTop: "16px",
    padding: "14px 20px",
    background: "#000",
    color: "#FFD600",
    border: "4px solid black",
    fontWeight: "700",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    wordBreak: "break-all",
  },
  clearBtn: {
    marginLeft: "auto",
    background: "#FF3B3B",
    border: "2px solid #FFD600",
    color: "#fff",
    padding: "4px 10px",
    cursor: "pointer",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: "700",
    fontSize: "13px",
    flexShrink: 0,
  },
};

export default function FileUploader({ onFileSelect, label = "Drop your file here" }) {
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file) return;
    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const clear = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    onFileSelect(null);
    inputRef.current.value = "";
  };

  return (
    <div>
      <div
        style={{
          ...styles.dropzone,
          ...(dragging ? styles.dropzoneActive : {}),
        }}
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <span style={styles.icon}>📄</span>
        <div style={styles.title}>{label}</div>
        <div style={styles.sub}>Click to browse or drag & drop any file</div>
        <input
          ref={inputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleChange}
        />
      </div>
      {selectedFile && (
        <div style={styles.fileInfo}>
          <span>✅</span>
          <span style={{ flex: 1 }}>{selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
          <button style={styles.clearBtn} onClick={clear}>✕ Clear</button>
        </div>
      )}
    </div>
  );
}
