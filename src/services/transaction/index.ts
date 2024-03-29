import {
    TransactionData,
    TransactionFormData,
    TransactionFormBalanceData,
    TransactionFormIncomeData,
} from '../../interfaces/transaction';
import { serviceErrorHandler } from '../../utils/helpers';
import api from '../api';

interface _updateParams {
    id: number;
    data: TransactionFormData;
}

interface TransactionServiceProps {
    _getAll(): Promise<TransactionData[]>;
    _getBalance(
        period: string,
        type: string,
    ): Promise<TransactionFormBalanceData>;
    _getIncomes(period: string): Promise<TransactionFormIncomeData>;
    _create(data: TransactionFormData): Promise<void>;
    _createIncome(data: TransactionFormData): Promise<void>;
    _update(params: _updateParams): Promise<void>;
    _delete(id_plan: number): Promise<void>;
    _getPhoto(id: number): Promise<string>;
}

const _getAll = async (): Promise<TransactionData[]> => {
    try {
        const { data: plans } = await api.get('transactions');

        return plans;
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};
const _getBalance = async (
    period = '',
    type = '',
): Promise<TransactionFormBalanceData> => {
    try {
        const { data } = await api.get(
            `transactions-balance?period=${period}&type=${type}`,
        );

        return data;
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};
const _getIncomes = async (period = ''): Promise<TransactionFormIncomeData> => {
    try {
        const { data } = await api.get(`transactions-incomes?period=${period}`);

        return data;
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _create = async (data: TransactionFormData): Promise<void> => {
    try {
        await api.post(`transactions`, data);
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};
const _createIncome = async (data: TransactionFormData): Promise<void> => {
    try {
        await api.post(`transactions`, data, {
            headers: {
                'Content-Type': 'multipart/form-data;',
            },
        });
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _update = async (params: _updateParams): Promise<void> => {
    try {
        await api.patch(`transactions/${params.id}`, params.data);
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _delete = async (id: number): Promise<void> => {
    try {
        await api.delete(`transactions/${id}`);
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _getPhoto = async (id: number): Promise<any> => {
    try {
        const { data } = await api.get(`transactions-image/${id}`);

        return data;
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

export const transactionServices = (): TransactionServiceProps => ({
    _getAll,
    _getBalance,
    _getIncomes,
    _create,
    _createIncome,
    _update,
    _delete,
    _getPhoto,
});
