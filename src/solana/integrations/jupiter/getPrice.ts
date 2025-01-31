import { Connection, PublicKey } from '@solana/web3.js';

export interface PriceResponse {
    inputMint: string;
    outputMint: string;
    notEnoughLiquidity: boolean;
    priceImpactPct: number;
    routes: Route[];
    bestRoute: Route;
}

export interface Route {
    marketInfos: MarketInfo[];
    amount: number;
    otherAmountThreshold: number;
    priceImpactPct: number;
    slippageBps: number;
    fee: {
        amount: number;
        mint: string;
        pct: number;
    };
}

export interface MarketInfo {
    id: string;
    label: string;
    inputMint: string;
    outputMint: string;
    inAmount: number;
    outAmount: number;
    lpFee: {
        amount: number;
        mint: string;
        pct: number;
    };
    platformFee: {
        amount: number;
        mint: string;
        pct: number;
    };
}

export class JupiterPrice {
    private connection: Connection;
    private indexedRouteMap: Map<string, Route[]>;

    constructor(connection: Connection) {
        this.connection = connection;
        this.indexedRouteMap = new Map();
    }

    async getPrice(params: {
        inputMint: PublicKey;
        outputMint: PublicKey;
        amount: number;
        slippageBps?: number;
        onlyDirectRoutes?: boolean;
    }): Promise<PriceResponse> {
        try {
            // In real implementation, this would use Jupiter's API
            // Example API endpoint: /v4/quote
            const response = await this.fetchJupiterPrice({
                inputMint: params.inputMint.toString(),
                outputMint: params.outputMint.toString(),
                amount: params.amount,
                slippageBps: params.slippageBps || 50, // Default 0.5%
                onlyDirectRoutes: params.onlyDirectRoutes || false
            });

            // Process and validate the response
            this.validatePriceResponse(response);

            // Index routes for future reference
            this.indexRoutes(response.routes, params.inputMint.toString(), params.outputMint.toString());

            return response;
        } catch (error) {
            throw new Error(`Failed to fetch Jupiter price: ${error.message}`);
        }
    }

    async getBestRoute(params: {
        inputMint: PublicKey;
        outputMint: PublicKey;
        amount: number;
        slippageBps?: number;
    }): Promise<Route | null> {
        const priceResponse = await this.getPrice(params);
        return priceResponse.bestRoute || null;
    }

    async getPriceImpact(params: {
        inputMint: PublicKey;
        outputMint: PublicKey;
        amount: number;
    }): Promise<number> {
        const priceResponse = await this.getPrice(params);
        return priceResponse.priceImpactPct;
    }

    private async fetchJupiterPrice(params: any): Promise<PriceResponse> {
        // This would make the actual API call to Jupiter's price API
        throw new Error('Jupiter price API integration pending');
    }

    private validatePriceResponse(response: PriceResponse): void {
        if (!response || !response.routes || response.routes.length === 0) {
            throw new Error('Invalid price response from Jupiter');
        }
    }

    private indexRoutes(routes: Route[], inputMint: string, outputMint: string): void {
        const key = `${inputMint}-${outputMint}`;
        this.indexedRouteMap.set(key, routes);
    }
}
