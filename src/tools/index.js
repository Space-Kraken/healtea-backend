import { fileHandler } from "./fileHandler/fileHandler.js";
import { encryptor } from "./security/Encryption.js";
import { auth } from "./security/Auth.js";

export const tools = {
  auth,
  encryptor,
  fileHandler,
};
