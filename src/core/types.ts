export type Networks = 'mainnet-beta' | 'testnet' | 'devnet';

export interface AppConfig {
    network: Networks;
    rpcUrl: string;
    sonicApiKey: string;
    protocols: ProtocolConfig;
    wallet: WalletConfig;
}

export interface ProtocolConfig {
    pumpfun: PumpFunConfig;
    jupiter: JupiterConfig;
    jito: JitoConfig;
    kamino: KaminoConfig;
}

export interface WalletConfig {
    autoConnect: boolean;
    commitment: 'processed' | 'confirmed' | 'finalized';
}

export interface PumpFunConfig {
    enabled: boolean;
    apiUrl: string;
    apiKey: string;
}

export interface JupiterConfig {
    enabled: boolean;
    slippageTolerance: number;
    defaultVersion: string;
}

export interface JitoConfig {
    enabled: boolean;
    apiUrl: string;
    minStakeAmount: number;
}

export interface KaminoConfig {
    enabled: boolean;
    apiUrl: string;
    maxLTV: number;
}

export interface TransactionResult {
    success: boolean;
    signature?: string;
    error?: string;
    blockTime?: number;
    confirmations?: number;
}

export interface TokenInfo {
    address: string;
    symbol: string;
    decimals: number;
    name?: string;
    logoURI?: string;
}

export interface ProtocolError extends Error {
    code: string;
    details?: any;
}