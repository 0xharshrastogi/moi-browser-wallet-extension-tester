import { provider } from "./provider";

export const NetworkConfig = () => {
    const handleOnGetActiveNetwork = async () => {
        alert("Active Network: " + JSON.stringify(await provider.getNetwork()));
    };

    return (
        <button onClick={handleOnGetActiveNetwork}>Get Active Network</button>
    );
};
