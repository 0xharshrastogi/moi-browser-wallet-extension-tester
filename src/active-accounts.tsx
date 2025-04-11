import { ensureHexPrefix } from "js-moi-sdk";
import { provider } from "./provider";

export const ActiveAccount = () => {
    const handleOnClick = async () => {
        const address = prompt(
            "Enter the address of the account you want to get:"
        );

        const value = await provider.getWalletAccount(
            address === "" || address == null ? null : ensureHexPrefix(address)
        );

        alert(JSON.stringify(value));
    };

    return <button onClick={handleOnClick}>Get Account Info</button>;
};
