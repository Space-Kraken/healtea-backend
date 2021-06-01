import encrypter from "crypto-js";
import secret from "crypto";

export let encryptor = {
  secret: "CIPHERKEY",

  encrypt: function (password) {
    const encryptedPSW = encrypter.AES.encrypt(password, encryptor.secret);
    return encryptedPSW.toString();
  },

  decrypt: function (password) {
    const decryptedPSW = encrypter.AES.decrypt(password, encryptor.secret);
    return decryptedPSW.toString(encrypter.enc.Utf8);
  },
  generateToken: function (user) {
    const token = secret.randomBytes(64).toString("hex");
    console.log(token);
    return token;
  },
};
