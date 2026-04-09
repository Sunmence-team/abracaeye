import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_ENCRYPT_HELPER_SECRET_KEY;

// Encrypt a token or payload string
export const encryptToken = (token: string, expiresInMinutes = 5) => {
  const payload = JSON.stringify({
    token,
    expiresAt: Date.now() + expiresInMinutes * 60 * 1000,
  });

  return CryptoJS.AES.encrypt(payload, SECRET_KEY).toString();
};

// Decrypt token, check expiry, return token or null
export const decryptToken = (encryptedToken: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) return null;

    const parsed = JSON.parse(decrypted);

    if (parsed.expiresAt < Date.now()) {
      console.warn("Token expired");
      return null;
    }

    return parsed.token;
  } catch (err) {
    console.log(err)
    console.error("Invalid encrypted token format");
    return null;
  }
};
