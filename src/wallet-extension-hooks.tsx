import { BrowserWallet, type Hex, type NetworkConfiguration } from "js-moi-sdk";
import { useCallback, useEffect, useMemo, useState } from "react";
import { provider } from "./provider";

export const useParticipant = () => {
    const [loading, setLoading] = useState(false);
    const [participant, setParticipant] = useState<Hex | null>(null);

    useEffect(() => {
        const initAccount = async () => {
            try {
                setLoading(true);
                const accounts = await provider.getWalletAccounts();
                const active = accounts.at(0);

                if (active) {
                    setParticipant(active);
                }
            } catch (error) {
                console.error(
                    `${useParticipant.name}: Failed to initialize accounts`,
                    error
                );
                setParticipant(null);
            } finally {
                setLoading(false);
            }
        };

        void initAccount();

        const onParticipantChangeListener = (participant: Hex) => {
            setParticipant(participant);
        };

        provider.on("accountChange", onParticipantChangeListener);

        return () => {
            provider.off("accountChange", onParticipantChangeListener);
        };
    }, []);

    const requestPermission = useCallback(async () => {
        const [permission] = await provider.requestPermissions(
            "wallet.Accounts",
            {}
        );

        const caveat = permission.caveats.find(
            (caveat) => caveat.type === "returnAddress"
        );

        const activeParticipant = caveat?.value.at(0);
        setParticipant(activeParticipant ?? null);
    }, []);

    const signer = useMemo(
        () =>
            participant == null
                ? null
                : new BrowserWallet(participant, { provider }),
        [participant]
    );

    console.log("useParticipant", participant);

    return { loading, participant, requestPermission, signer };
};

export const useNetwork = () => {
    const [network, setNetwork] = useState<NetworkConfiguration | null>(null);

    useEffect(() => {
        const initNetwork = async () => {
            setNetwork(await provider.getNetwork());
        };

        void initNetwork();

        const onNetworkChangeListener = (
            network: NetworkConfiguration
        ): void => {
            setNetwork(network);
        };

        provider.on("networkChange", onNetworkChangeListener);

        return () => {
            provider.off("networkChange", onNetworkChangeListener);
        };
    }, []);

    return network;
};
