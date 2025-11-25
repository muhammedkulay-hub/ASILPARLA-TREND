export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

export const validatePhone = (phone) => {
  // Turkish phone number format
  const re = /^(\+90|0)?[5][0-9]{9}$/;
  return re.test(phone.replace(/\s/g, ''));
};

export const validateTCKN = (tckn) => {
  // Turkish ID number validation
  if (!tckn || tckn.length !== 11) return false;
  if (!/^\d+$/.test(tckn)) return false;
  
  const digits = tckn.split('').map(Number);
  const sum1 = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  const sum2 = digits[1] + digits[3] + digits[5] + digits[7];
  
  if ((sum1 * 7 - sum2) % 10 !== digits[9]) return false;
  if ((sum1 + sum2 + digits[9]) % 10 !== digits[10]) return false;
  
  return true;
};

export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

export const validateMinLength = (value, minLength) => {
  if (typeof value !== 'string') return false;
  return value.length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  if (typeof value !== 'string') return true;
  return value.length <= maxLength;
};

export const validateNumber = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value));
};

export const validatePositiveNumber = (value) => {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
};

export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

