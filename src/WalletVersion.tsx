import { provider } from "./provider";

export const WalletVersion = () => {
    const handleOnGetVersion = async () => {
        const version = await provider.getWalletVersion();
        alert("Extension version: " + version);
    };

    return <button onClick={handleOnGetVersion}>Get Version</button>;
};
