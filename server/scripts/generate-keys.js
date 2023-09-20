const { getPublicKey, utils } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak.js");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = utils.randomPrivateKey();
const publicKey = getPublicKey(privateKey);
const address = keccak256(publicKey).slice(-20);

console.log("private key: ", toHex(privateKey));
console.log("public key: ", toHex(publicKey));
console.log("address: ", toHex(address));
