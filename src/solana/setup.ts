import {
    Connection,
    Keypair,
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL
} from '@solana/web3.js';
import { Config } from '../../core/config';
import { CONSTANTS } from '../../core/constants';

export class WalletSetup {
    private connection: Connection;
    private keypair: Keypair | null = null;
    private config: Config;

    constructor() {
        this.config = Config.getInstance();
        this.connection = new Connection(
            this.config.get().rpcUrl,
            this.config.get().wallet.commitment
        );
    }

    async createWallet(): Promise<{ publicKey: string; secretKey: Uint8Array }> {
        this.keypair = Keypair.generate();
        return {
            publicKey: this.keypair.publicKey.toString(),
            secretKey: this.keypair.secretKey
        };
    }

    async loadWallet(secretKey: Uint8Array): Promise<boolean> {
        try {
            this.keypair = Keypair.fromSecretKey(secretKey);
            // Verify connection
            await this.connection.getAccountInfo(this.keypair.publicKey);
            return true;
        } catch (error) {
            throw new Error(`Failed to load wallet: ${error.message}`);
        }
    }

    async getBalance(): Promise<number> {
        if (!this.keypair) {
            throw new Error('Wallet not initialized');
        }

        const balance = await this.connection.getBalance(this.keypair.publicKey);
        return balance / LAMPORTS_PER_SOL;
    }

    getPublicKey(): string {
        if (!this.keypair) {
            throw new Error('Wallet not initialized');
        }
        return this.keypair.publicKey.toString();
    }

    getConnection(): Connection {
        return this.connection;
    }
}