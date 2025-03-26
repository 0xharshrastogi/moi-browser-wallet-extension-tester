import elliptic from "elliptic";
import { createFromPubKey } from "peer-id";

// const pKey = await Wallet.createRandomSync().getPrivateKey();

// Example usage
const privateKeyHex =
    "a8832f8228ba214ac1656a4a60739508aada64ad88a8a898d93daefafff08f93";

const getPublicKey = (privateKey: string) => {
    const e = new elliptic.ec("secp256k1");
    const pair = e.keyFromPrivate(privateKey, "hex");
    const prefix = [0, 37, 8, 2, 18, 33];
    return new Uint8Array([...prefix, ...pair.getPublic(true, "array")]);
};

const getPeerId = async (privateKey: string) => {
    return await createFromPubKey(getPublicKey(privateKey));
};

console.log((await getPeerId(privateKeyHex)).toB58String());

// How to get public key from private key
// import { secp256k1 as secp } from '@noble/curves/secp256k1'
// return secp.getPublicKey(privateKey, true)
