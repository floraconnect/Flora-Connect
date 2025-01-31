import { RaydiumPool } from '../../solana/protocols/raydium/pool';
import { RaydiumSwap } from '../../solana/protocols/raydium/swap';

describe('Raydium Pool Tests', () => {
    let raydiumPool: RaydiumPool;
    let connection: Connection;
    let transactionHandler: TransactionHandler;

    beforeEach(() => {
        connection = new Connection('http://localhost:8899', 'confirmed');
        transactionHandler = new TransactionHandler(connection);
        raydiumPool = new RaydiumPool(connection, transactionHandler);
    });

    describe('Create Pool', () => {
        it('should successfully create a pool', async () => {
            const owner = Keypair.generate();
            const config = {
                tokenAMint: new PublicKey('TokenAMint'),
                tokenBMint: new PublicKey('TokenBMint'),
                fees: {
                    tradeFee: 0.3,
                    withdrawFee: 0,
                    adminTradeFee: 0,
                    adminWithdrawFee: 0
                },
                initialLiquidity: {
                    tokenAAmount: 1000,
                    tokenBAmount: 1000
                }
            };

            const result = await raydiumPool.createPool(config, owner);
            expect(result.success).toBe(true);
            expect(result.signature).toBeDefined();
        });
    });
});