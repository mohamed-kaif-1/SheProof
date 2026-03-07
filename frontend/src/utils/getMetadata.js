export function getMetadata(file, source="upload") {

  const metadata = {
    fileName: file?.name || "screenshot",
    fileSize: file?.size || 0,
    fileType: file?.type || "image/png",
    capturedFrom: source,

    timestamp: new Date().toISOString(),

    device: navigator.platform,
    browser: navigator.userAgent,
    language: navigator.language,

    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
  };

  return metadata;
}