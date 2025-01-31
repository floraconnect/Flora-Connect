import { Networks, ProtocolConfig } from './types';

export class Config {
    private static instance: Config;
    private config: AppConfig;

    private constructor() {
        this.config = {
            network: process.env.SOLANA_NETWORK as Networks || 'mainnet-beta',
            rpcUrl: process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
            sonicApiKey: process.env.SONIC_API_KEY || '',
            protocols: {
                pumpfun: {
                    enabled: true,
                    apiUrl: process.env.PUMPFUN_API_URL || 'https://api.pumpfun.io',
                    apiKey: process.env.PUMPFUN_API_KEY || ''
                },
                jupiter: {
                    enabled: true,
                    slippageTolerance: 0.5, // 0.5%
                    defaultVersion: 'v6'
                },
                jito: {
                    enabled: true,
                    apiUrl: process.env.JITO_API_URL || 'https://api.jito.wtf',
                    minStakeAmount: 0.1 // SOL
                },
                kamino: {
                    enabled: true,
                    apiUrl: process.env.KAMINO_API_URL || 'https://api.kamino.finance',
                    maxLTV: 0.75 // 75%
                }
            },
            wallet: {
                autoConnect: true,
                commitment: 'confirmed'
            }
        };
    }

    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }

    public get(): AppConfig {
        return this.config;
    }

    public update(newConfig: Partial<AppConfig>): void {
        this.config = {
            ...this.config,
            ...newConfig
        };
    }

    public getProtocolConfig(protocol: keyof ProtocolConfig): any {
        return this.config.protocols[protocol];
    }
}