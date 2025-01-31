import {
    Connection,
    PublicKey,
    Transaction,
    TransactionInstruction,
    sendAndConfirmTransaction,
    Commitment,
    Keypair
} from '@solana/web3.js';
import { TokenInfo, TransactionResult } from '../../core/types';
import { CONSTANTS } from '../../core/constants';

export class TransactionHandler {
    private connection: Connection;
    private commitment: Commitment;

    constructor(connection: Connection, commitment: Commitment = 'confirmed') {
        this.connection = connection;
        this.commitment = commitment;
    }

    async createAndSignTransaction(
        instructions: TransactionInstruction[],
        signers: Keypair[],
        feePayer: PublicKey
    ): Promise<Transaction> {
        const latestBlockhash = await this.connection.getLatestBlockhash();

        const transaction = new Transaction({
            feePayer,
            ...latestBlockhash,
        }).add(...instructions);

        if (signers.length > 0) {
            transaction.sign(...signers);
        }

        return transaction;
    }

    async sendTransaction(
        transaction: Transaction,
        signers: Keypair[]
    ): Promise<TransactionResult> {
        try {
            const signature = await sendAndConfirmTransaction(
                this.connection,
                transaction,
                signers,
                {
                    commitment: this.commitment,
                    maxRetries: 3
                }
            );

            const confirmation = await this.connection.confirmTransaction({
                signature,
                ...await this.connection.getLatestBlockhash()
            }, this.commitment);

            if (confirmation.value.err) {
                throw new Error(`Transaction failed: ${confirmation.value.err}`);
            }

            return {
                success: true,
                signature,
                confirmations: confirmation.value.confirmations,
                blockTime: (await this.connection.getTransaction(signature))?.blockTime
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    async estimateFees(instructions: TransactionInstruction[]): Promise<number> {
        try {
            const transaction = new Transaction().add(...instructions);
            const { feeCalculator } = await this.connection.getRecentBlockhash();
            return feeCalculator.lamportsPerSignature * (transaction.signatures.length + 1);
        } catch (error) {
            throw new Error(`Failed to estimate fees: ${error.message}`);
        }
    }

    async validateTransaction(transaction: Transaction): Promise<boolean> {
        try {
            const simulation = await this.connection.simulateTransaction(transaction);
            return simulation.value.err === null;
        } catch (error) {
            return false;
        }
    }
}