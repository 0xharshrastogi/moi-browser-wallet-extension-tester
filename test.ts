import { createParticipantId, IdentifierVersion } from "js-moi-sdk";

const id = createParticipantId({
    version: IdentifierVersion.V0,
    variant: 0,
    fingerprint: globalThis.crypto.getRandomValues(new Uint8Array(24)),
});

console.log(id);
