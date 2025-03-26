import { provider } from "./provider";

export const NetworkVersion = () => {
    const handleOnClick = async () => {
        try {
            const { chain_id, version } = await provider.getNetworkInfo();

            alert(`Chain ID: ${chain_id}, Version: ${version}`);
        } catch (error) {
            console.error("Failed to get network version", error);
            alert("Error: " + (error instanceof Error ? error.message : error));
        }
    };
    return <button onClick={handleOnClick}>NetworkVersion</button>;
};
