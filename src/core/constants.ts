export const CONSTANTS = {
    NETWORKS: {
        MAINNET: 'mainnet-beta',
        TESTNET: 'testnet',
        DEVNET: 'devnet'
    },

    PROTOCOLS: {
        PUMPFUN: {
            MIN_TOKEN_AMOUNT: '1000',
            MAX_TOKEN_AMOUNT: '1000000000',
            DEFAULT_DECIMALS: 9
        },
        JUPITER: {
            MIN_SWAP_AMOUNT: '0.000001',
            DEFAULT_SLIPPAGE: 0.5,
            SUPPORTED_VERSIONS: ['v4', 'v5', 'v6']
        },
        JITO: {
            MIN_STAKE: 0.1,
            MAX_STAKE: 100000,
            UNSTAKE_COOLDOWN: 2 * 24 * 60 * 60 // 2 days in seconds
        },
        KAMINO: {
            MIN_COLLATERAL: 0.1,
            MAX_LTV: 0.75,
            LIQUIDATION_THRESHOLD: 0.825
        }
    },

    ERRORS: {
        INITIALIZATION: 'INITIALIZATION_ERROR',
        WALLET_CONNECTION: 'WALLET_CONNECTION_ERROR',
        INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
        TRANSACTION_FAILED: 'TRANSACTION_FAILED',
        INVALID_PARAMETERS: 'INVALID_PARAMETERS'
    },

    TIMEOUTS: {
        TRANSACTION: 30000, // 30 seconds
        CONFIRMATION: 60000, // 1 minute
        CONNECTION: 5000 // 5 seconds
    }
} as const;
