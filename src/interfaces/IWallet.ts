// src/interfaces/IWallet.ts
export interface IWallet {
    address: string;
    balance: number;
    connect(): Promise<boolean>;
    disconnect(): Promise<void>;
    signTransaction(transaction: any): Promise<any>;
    sendTransaction(transaction: any): Promise<string>;
}
