/**
 * This is a helper function around the Browser storage to add a little security
 */
import SimpleEncryptor from "simple-encryptor";

const ENCRYPTION_KEY = `aj89ankZQp94usniu3nUIZY893nire2494803kLKZPOR358`;
const encryptor = SimpleEncryptor(ENCRYPTION_KEY);

export const addToLocalStorage = (key, value) => {
  if (typeof value !== "string") value = JSON.stringify(value);
  try {
    const encrypted = encryptor.encrypt(value);
    localStorage.setItem(key, encrypted);
  } catch (err) {}
};

export const getFromLocalStorage = (key) => {
  const encryptedValue = localStorage.getItem(key);
  try {
    return encryptor.decrypt(encryptedValue);
  } catch (err) {
    return null;
  }
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};
