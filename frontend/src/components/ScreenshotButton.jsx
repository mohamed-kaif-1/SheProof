import { useState } from "react";

export default function ScreenshotButton({ onCapture }) {
  const [loading, setLoading] = useState(false);

  const takeScreenshot = async () => {
    try {
      setLoading(true);

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      });

      const track = stream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(track);
      const bitmap = await imageCapture.grabFrame();

      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(bitmap, 0, 0);

      canvas.toBlob(blob => {
        const file = new File([blob], "screenshot.png", { type: "image/png" });
        onCapture(file);
      });

      track.stop();
      setLoading(false);

    } catch {
      setLoading(false);
      alert("Screenshot cancelled");
    }
  };

  return (
  <button
    style={{
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
      marginTop: "16px"
    }}
    onClick={takeScreenshot}
    onMouseDown={(e)=>{
      e.currentTarget.style.transform="translate(3px,3px)";
      e.currentTarget.style.boxShadow="3px 3px 0px black";
    }}
    onMouseUp={(e)=>{
      e.currentTarget.style.transform="";
      e.currentTarget.style.boxShadow="6px 6px 0px black";
    }}
    onMouseLeave={(e)=>{
      e.currentTarget.style.transform="";
      e.currentTarget.style.boxShadow="6px 6px 0px black";
    }}
  >
    {loading ? "⏳ Capturing..." : "📸 Capture Screenshot"}
  </button>
);
}