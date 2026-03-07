/**
 * Hash a file using SHA-256 via Web Crypto API (browser native)
 * Returns the hash as a 0x-prefixed hex string suitable for bytes32
 */
export async function hashFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return "0x" + hashHex;
}
