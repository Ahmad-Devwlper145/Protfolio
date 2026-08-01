async function generateAESKey(password: string): Promise<CryptoKey> {
  const passwordBuffer = new TextEncoder().encode(password);
  const hashedPassword = await crypto.subtle.digest("SHA-256", passwordBuffer);
  return crypto.subtle.importKey(
    "raw",
    hashedPassword.slice(0, 32),
    { name: "AES-CBC" },
    false,
    ["encrypt", "decrypt"]
  );
}

export const decryptFile = async (
  url: string,
  password: string
): Promise<ArrayBuffer> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch encrypted model: ${response.status}`);
  }

  const encryptedData = await response.arrayBuffer();

  if (encryptedData.byteLength < 16) {
    throw new Error("Model file is too small to be a valid encrypted asset.");
  }

  const textPreview = new TextDecoder().decode(encryptedData.slice(0, 128));
  if (textPreview.includes("git-lfs.github.com/spec/v1")) {
    throw new Error(
      "Git LFS pointer detected: the actual 3D model file was not checked out."
    );
  }

  const iv = new Uint8Array(encryptedData.slice(0, 16));
  const data = encryptedData.slice(16);
  const key = await generateAESKey(password);
  return crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data);
};
