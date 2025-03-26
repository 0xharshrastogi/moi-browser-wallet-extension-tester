import { NetworkConfig } from "./network-config";
import { NetworkVersion } from "./NetworkVersion";
import { RequestPermission } from "./RequestPermission";
import { SignOrSendInteraction } from "./sign-interaction";
import { SignMessage } from "./sign-message";
import { useNetwork, useParticipant } from "./wallet-extension-hooks";
import { WalletPublicKey } from "./wallet-public-key";
import { WalletVersion } from "./WalletVersion";

function App() {
    const { participant } = useParticipant();
    console.log("Participant in app:", participant);
    const network = useNetwork();

    console.log("Participant:", participant);

    return (
        <>
            <span>
                <strong>Active Address:</strong>{" "}
                {participant == null ? "No Account Connected" : participant}
                <br />
                <strong>Active Network:</strong>{" "}
                {network == null
                    ? "No Network Connected"
                    : `${network.name} (${network.jsonRpcHost})`}
                <br />
                <br />
                <br />
                <div
                    style={{
                        display: "flex",
                        gap: 10,
                        textTransform: "uppercase",
                    }}
                >
                    <WalletVersion />
                    <RequestPermission />
                    <NetworkVersion />
                    {participant != null && (
                        <SignMessage account={participant} />
                    )}
                    {participant != null && (
                        <>
                            <SignOrSendInteraction
                                type="send"
                                account={participant}
                            />

                            <SignOrSendInteraction
                                type="sign"
                                account={participant}
                            />
                        </>
                    )}
                    <WalletPublicKey />

                    <NetworkConfig />
                </div>
            </span>
        </>
    );
}

export default App;
