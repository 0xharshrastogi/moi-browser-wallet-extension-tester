import type { FC } from "react";
import { useParticipant } from "./wallet-extension-hooks";

export const RequestPermission: FC = () => {
    const { requestPermission } = useParticipant();

    return <button onClick={requestPermission}>RequestPermission</button>;
};
