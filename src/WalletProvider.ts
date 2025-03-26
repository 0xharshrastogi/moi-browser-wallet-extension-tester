import { JsonRpcProvider } from "js-moi-sdk";

interface IWalletProvider {
    /**
     * Sends a JSON-RPC request to the extension.
     *
     * @param method - The method to call.
     * @param params - The parameters to pass to the method.
     * @returns A promise that resolves with the result of the JSON-RPC request.
     */
    request<T>(method: string, ...params: unknown[]): Promise<T>;

    /**
     * Adds an event listener for a specified event name.
     *
     * @param event - The name of the event to listen for.
     * @param listener - The function to be called when the event is triggered.
     * @returns void
     */
    addListener(event: string, listener: EventListener): void;

    /**
     * Removes an event listener for a specified event.
     *
     * @param event - The name of the event for which the listener should be removed.
     * @param listener - The event listener function to be removed.
     * @returns void
     */
    removeListener(event: string, listener: EventListener): void;

    /**
     * Checks if a specific event listener is registered for a given event.
     *
     * @param event - The name of the event to check.
     * @param listener - The event listener function to check for.
     * @returns `true` if the listener is registered for the event, otherwise `false`.
     */
    hasListener(event: string, listener: EventListener): boolean;

    /**
     * Returns the list of namespaces exposed by the wallet provider.
     */
    namespaces(): string[];

    __isVoyagePassport: boolean;
}

declare global {
    interface Window {
        moi: IWalletProvider;
    }
}

export class WalletProvider extends JsonRpcProvider {
    constructor() {
        if (!window?.moi?.__isVoyagePassport) {
            throw new Error("Voyage Browser Wallet is not installed");
        }

        // @ts-expect-error globalThis is not defined in typescript
        super(globalThis.moi);
    }

    private isPassportEvent(eventName: string | symbol): boolean {
        if (typeof eventName === "symbol") {
            return false;
        }

        return ["accountChange", "networkChange"].includes(eventName);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on(eventName: string | symbol, listener: (...args: any[]) => void): this {
        if (this.isPassportEvent(eventName)) {
            this.transport.on(eventName, listener);
        }

        return super.on(eventName, listener);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    off(eventName: string | symbol, listener: (...args: any[]) => void): this {
        if (this.isPassportEvent(eventName)) {
            this.transport.off(eventName, listener);
        }

        return super.off(eventName, listener);
    }

    async getWalletVersion() {
        const response = await this.request<string>("wallet.ClientVersion");
        return this.processJsonRpcResponse(response);
    }

    async getWalletAccounts() {
        const response = await this.request<string[]>("wallet.Accounts");
        return this.processJsonRpcResponse(response);
    }

    async requestPermission<T>(method: string, caveats: unknown = {}) {
        const response = await this.request<T>("wallet.RequestPermissions", [
            { [method]: caveats },
        ]);

        return this.processJsonRpcResponse(response);
    }
}
