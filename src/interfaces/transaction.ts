export interface TransactionFormData {
    amount: number;
    date: string;
    description: string;
    type: 'in' | 'out';
    status?: 'pending' | 'accepted' | 'rejected';
}
export interface TransactionFormImageData extends TransactionFormData {
    image?: string;
}

export interface TransactionData extends TransactionFormImageData {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface TransactionFormPreloadData extends TransactionData {
    user?: {
        id: number;
        name: string;
        email: string;
        admin: number;
    };
}
export interface TransactionFormBalanceData {
    balance: number;
    positive: number;
    negative: number;
    transactions: TransactionData[];
}
