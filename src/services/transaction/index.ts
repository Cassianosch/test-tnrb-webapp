import { TransactionData, TransactionFormData } from '../../interfaces/transaction';
import { serviceErrorHandler } from '../../utils/helpers';
import api from '../api';

interface _updateParams {
    id: number;
    data: TransactionFormData;
}

interface TransactionServiceProps {
    _getAll(): Promise<TransactionData[]>;
    _create(data: TransactionFormData): Promise<void>;
    _update(params: _updateParams): Promise<void>;
    _delete(id_plan: number): Promise<void>;
}

const _getAll = async (): Promise<TransactionData[]> => {
    try {
        const { data: plans } = await api.get('transactions');

        return plans;
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

const _update = async (params: _updateParams): Promise<void> => {
    try {
        await api.put(`transactions/${params.id}`, params.data);
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

export const transactionServices = (): TransactionServiceProps => ({
    _getAll,
    _create,
    _update,
    _delete,
});
