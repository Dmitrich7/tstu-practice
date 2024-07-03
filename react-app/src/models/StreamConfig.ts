import { accountExample } from "./Accounts";

export enum StreamNames {
    ACCOUNTS = "accounts"
}

export const StreamConfig: Record<string, object> = {
    [StreamNames.ACCOUNTS]: accountExample
}
