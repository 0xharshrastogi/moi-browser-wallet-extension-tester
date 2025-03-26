import { isHex } from "js-moi-sdk";
import { provider } from "./provider";

export const WalletPublicKey = () => {
    const handleOnClick = async () => {
        const isMasterKeyRequired = confirm(
            "Do you want public key for main account?"
        );

        if (isMasterKeyRequired) {
            const key = await provider.getWalletPublicKey();
            alert(`Public Key for main account: ${key}`);
            return;
        }

        const identifier = prompt(
            "Enter the account id for request public key"
        );

        if (identifier == null) {
            return;
        }

        if (!isHex(identifier, 32)) {
            alert("Invalid account id");
            return;
        }

        const key = await provider.getWalletPublicKey(identifier);
        alert(`Public Key for account ${identifier}: ${key}`);
    };

    return <button onClick={handleOnClick}>Get Public Key</button>;
};
