import { BrowserWallet, bytesToHex, encodeText, type Hex } from "js-moi-sdk";
import type { FC } from "react";
import { provider } from "./provider";

interface SignMessageProps {
    account: Hex;
}

export const SignMessage: FC<SignMessageProps> = (props) => {
    const handleOnSignMessage = async () => {
        const message = prompt("Enter message to sign");

        if (message == null) {
            return;
        }
        const { account } = props;
        const hexEncodedMessage = bytesToHex(encodeText(message));
        const wallet = new BrowserWallet(account, { provider });

        const signature = await wallet.sign(
            hexEncodedMessage,
            wallet.signingAlgorithms.ecdsa_secp256k1
        );

        alert(`Signature: ${signature}`);
    };

    return <button onClick={handleOnSignMessage}>Sign Message</button>;
};
