export interface TransactionFormData {
    amount: number;
    date: string;
    description: string;
    image?: string;
    type: 'in' | 'out';
    status?: 'pending' | 'accepted' | 'rejected';
}

export interface TransactionData extends TransactionFormData {
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
    }
}
