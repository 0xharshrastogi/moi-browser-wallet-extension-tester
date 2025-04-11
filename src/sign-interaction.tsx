import { AssetStandard, OpType, type Hex, type IxOperation } from "js-moi-sdk";
import type { FC } from "react";
import { useParticipant } from "./wallet-extension-hooks";

interface SignInteractionProps {
    account: Hex;
    type: "sign" | "send";
}

export const SignOrSendInteraction: FC<SignInteractionProps> = (props) => {
    const { signer } = useParticipant();
    const { type } = props;

    const handleOnSignInteraction = async () => {
        if (signer == null) {
            alert("No signer found");
            return;
        }

        const operation: IxOperation<OpType.AssetCreate> = {
            type: OpType.AssetCreate,
            payload: {
                symbol: `TEST_${Math.random().toString(36).substring(7)}`,
                supply: 1000,
                standard: AssetStandard.MAS0,
            },
        };

        const request = await signer.createIxRequest("moi.Execute", operation);

        if (type === "sign") {
            const signedInteractionRequest = await signer.signInteraction(
                request,
                signer.signingAlgorithms.ecdsa_secp256k1
            );

            alert(
                `Signed Interaction Payload (JSON Encoded): ${JSON.stringify(
                    signedInteractionRequest
                )}`
            );
            return;
        }

        const ix = await signer.execute(operation);
        const result = ix.result();
        alert(`Interaction Hash: ${ix.hash}`);
        alert(`Interaction Result: ${JSON.stringify(await result)}`);
    };

    return (
        <button onClick={handleOnSignInteraction}>{type} interaction</button>
    );
};
