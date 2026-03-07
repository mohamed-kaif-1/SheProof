document.addEventListener("DOMContentLoaded", () => {

  const button = document.getElementById("screenshotBtn");
  const output = document.getElementById("hashOutput");
  const openBtn = document.getElementById("openBtn");

  button.addEventListener("click", () => {

    chrome.tabs.captureVisibleTab(
      chrome.windows.WINDOW_ID_CURRENT,
      { format: "png" },
      async (dataUrl) => {

        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          output.style.display = "block";
          output.innerText = "Capture failed.";
          return;
        }

        if (!dataUrl) {
          output.style.display = "block";
          output.innerText = "No image captured.";
          return;
        }

        try {
          const response = await fetch(dataUrl);
          const buffer = await response.arrayBuffer();

          const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);

          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");

          output.style.display = "block";
          output.innerText = hashHex;

          chrome.storage.local.set(
            { sheproofImage: dataUrl },
            () => {

              chrome.tabs.create({
                url: "http://localhost:5173/upload"
              });

            }
          );

        } catch (err) {
          console.error(err);
          output.style.display = "block";
          output.innerText = "Hash error.";
        }

      }
    );

  });

  openBtn.addEventListener("click", () => {
    chrome.tabs.create({
      url: "http://localhost:5173/upload"
    });
  });

});