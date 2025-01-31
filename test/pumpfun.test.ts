import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { PumpFunTrading } from '../../solana/protocols/pumpfun/trading';
import { TransactionHandler } from '../../solana/wallet/transactions';
import { Config } from '../../core/config';

describe('PumpFun Trading Tests', () => {
    let connection: Connection;
    let transactionHandler: TransactionHandler;
    let trading: PumpFunTrading;
    let testWallet: Keypair;

    beforeEach(() => {
        connection = new Connection('http://localhost:8899', 'confirmed');
        transactionHandler = new TransactionHandler(connection);
        trading = new PumpFunTrading(connection, transactionHandler);
        testWallet = Keypair.generate();
    });

    describe('Buy Token', () => {
        it('should successfully buy tokens with valid parameters', async () => {
            const params = {
                tokenMint: new PublicKey('TokenMintAddress'),
                amount: 100,
                slippageBps: 100 // 1%
            };

            const result = await trading.buyToken(params, testWallet);
            expect(result.success).toBe(true);
            expect(result.signature).toBeDefined();
        });

        it('should fail when slippage is exceeded', async () => {
            const params = {
                tokenMint: new PublicKey('TokenMintAddress'),
                amount: 100,
                slippageBps: 10 // 0.1%
            };

            const result = await trading.buyToken(params, testWallet);
            expect(result.success).toBe(false);
            expect(result.error).toContain('Slippage tolerance exceeded');
        });
    });

    describe('Sell Token', () => {
        it('should successfully sell tokens with valid parameters', async () => {
            const params = {
                tokenMint: new PublicKey('TokenMintAddress'),
                amount: 50,
                slippageBps: 100
            };

            const result = await trading.sellToken(params, testWallet);
            expect(result.success).toBe(true);
            expect(result.signature).toBeDefined();
        });

        it('should fail when token balance is insufficient', async () => {
            const params = {
                tokenMint: new PublicKey('TokenMintAddress'),
                amount: 1000000,
                slippageBps: 100
            };

            const result = await trading.sellToken(params, testWallet);
            expect(result.success).toBe(false);
            expect(result.error).toContain('Insufficient token balance');
        });
    });
});