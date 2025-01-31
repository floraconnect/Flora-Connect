import { JupiterPrice } from '../../solana/protocols/jupiter/price';
import { JupiterPool } from '../../solana/protocols/jupiter/pool';

describe('Jupiter Price Tests', () => {
    let jupiterPrice: JupiterPrice;
    let connection: Connection;

    beforeEach(() => {
        connection = new Connection('http://localhost:8899', 'confirmed');
        jupiterPrice = new JupiterPrice(connection);
    });

    describe('Get Price', () => {
        it('should return valid price quote', async () => {
            const params = {
                inputMint: new PublicKey('InputTokenMint'),
                outputMint: new PublicKey('OutputTokenMint'),
                amount: 100,
                slippageBps: 50
            };

            const quote = await jupiterPrice.getPrice(params);
            expect(quote.notEnoughLiquidity).toBe(false);
            expect(quote.routes.length).toBeGreaterThan(0);
            expect(quote.bestRoute).toBeDefined();
        });

        it('should handle insufficient liquidity', async () => {
            const params = {
                inputMint: new PublicKey('InputTokenMint'),
                outputMint: new PublicKey('OutputTokenMint'),
                amount: 1000000000, // Very large amount
                slippageBps: 50
            };

            const quote = await jupiterPrice.getPrice(params);
            expect(quote.notEnoughLiquidity).toBe(true);
        });
    });
});

