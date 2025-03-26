import { bytesToHex, encodeText } from "js-moi-sdk";
import { useParticipant } from "./wallet-extension-hooks";

export const SignMessage = () => {
    const { signer } = useParticipant();

    const handleOnSignMessage = async () => {
        if (signer == null) {
            alert("No signer found");
            return;
        }

        const message = prompt("Enter message to sign");

        if (message == null) {
            return;
        }
        const hexEncodedMessage = bytesToHex(encodeText(message));

        const signature = await signer.sign(
            hexEncodedMessage,
            signer.signingAlgorithms.ecdsa_secp256k1
        );

        alert(`Signature: ${signature}`);
    };

    return <button onClick={handleOnSignMessage}>Sign Message</button>;
};
