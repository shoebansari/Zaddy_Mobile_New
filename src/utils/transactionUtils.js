// Custom utility functions for generating transaction IDs and tracking numbers
// without relying on crypto libraries

/**
 * Generate a random string of specified length
 * @param {number} length - Length of the string to generate
 * @returns {string} Random string
 */
const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * Generate a timestamp-based unique identifier
 * @returns {string} Timestamp-based ID
 */
const generateTimestampId = () => {
  const now = new Date();
  const timestamp = now.getTime().toString();
  const randomPart = generateRandomString(4);
  return timestamp.slice(-8) + randomPart;
};

/**
 * Generate a transaction ID with format TXN-XXXXXXXX
 * @returns {string} Transaction ID
 */
export const generateTransactionId = () => {
  const randomPart = generateRandomString(8);
  return `TXN-${randomPart}`;
};

/**
 * Generate a tracking number with format TRK-XXXXXXXX
 * @returns {string} Tracking number
 */
export const generateTrackingNumber = () => {
  const randomPart = generateRandomString(8);
  return `TRK-${randomPart}`;
};

/**
 * Generate a unique order ID
 * @returns {string} Order ID
 */
export const generateOrderId = () => {
  const timestamp = new Date().getTime().toString();
  const randomPart = generateRandomString(6);
  return `ORD-${timestamp.slice(-6)}${randomPart}`;
};

/**
 * Generate a unique reference number
 * @returns {string} Reference number
 */
export const generateReferenceNumber = () => {
  const timestamp = new Date().getTime().toString();
  const randomPart = generateRandomString(4);
  return `REF-${timestamp.slice(-8)}${randomPart}`;
}; 