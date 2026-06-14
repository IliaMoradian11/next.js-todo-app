import { compare, hash } from "bcryptjs";

async function hashPassword(password) {
  const hashedPassword = await hash(password, 123);
  return hashedPassword;
}

async function comparePasswords(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export { hashPassword, comparePasswords };
