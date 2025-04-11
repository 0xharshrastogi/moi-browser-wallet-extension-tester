import { provider } from "./provider";

export const NodeInfo = () => {
    const handleOnNodeKeystore = async () => {
        try {
            const response = await provider.request("wallet.NodeKeystore", [
                {
                    networkPath: "m/44'/6174'/6020'/0/1",
                    consensusPath: "m/44'/6174'/5020'/0/0",
                    zone: 0,
                },
            ]);

            const result = provider.processJsonRpcResponse(response);
            alert(JSON.stringify(result));
        } catch (error) {
            alert(
                "Error: " +
                    (error instanceof Error
                        ? error.message
                        : JSON.stringify(error))
            );
        }
    };

    const handleOnNodeInfo = async () => {
        try {
            const response = await provider.request("wallet.NodeInfo", [
                [
                    { path: "m/44'/6174'/6020'/0/1", zone: 0 },
                    { path: "m/44'/6174'/6020'/0/2", zone: 0 },
                ],
            ]);
            const result = provider.processJsonRpcResponse(response);
            alert(JSON.stringify(result));
        } catch (error) {
            alert(
                "Error: " +
                    (error instanceof Error
                        ? error.message
                        : JSON.stringify(error))
            );
        }
    };

    return (
        <>
            <button onClick={handleOnNodeKeystore}>Get Node Keystore</button>
            <button onClick={handleOnNodeInfo}>Get Node Info</button>
        </>
    );
};
