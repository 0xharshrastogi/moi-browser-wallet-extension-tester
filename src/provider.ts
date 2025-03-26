import { BrowserProvider } from "js-moi-sdk";

if (globalThis["moi"]["__isVoyagePassport"] == null) {
    throw new Error("Voyage Browser Wallet is not installed");
}

export const provider = new BrowserProvider(globalThis["moi"]);
