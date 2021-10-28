import { useCallback, useState } from 'react';
import {
    TransactionData,
    TransactionFormData,
    TransactionFormBalanceData,
} from '../interfaces/transaction';
import { transactionServices } from '../services/transaction';
import useCustomToast from './useCustomToast';
import useSession from './useSession';

interface useTransactionHookData {
    rows: TransactionData[];
    handleGetRows(type?: string): Promise<void>;
    balance: TransactionFormBalanceData;
    handleGetRowsBalance(period?: string, type?: string): Promise<void>;
    handleCreate(values: TransactionFormData, type?: string): Promise<void>;
    handleUpdate(
        id_plan: number,
        values: TransactionFormData,
        type?: string,
    ): Promise<void>;
    handleDelete(id_plan: number, type: string): Promise<void>;
}

export default (): useTransactionHookData => {
    const [rows, setRows] = useState<TransactionData[]>([]);
    const [balance, setBalance] = useState<TransactionFormBalanceData>();

    const { showErrorToast, showSuccessToast } = useCustomToast();

    const { _getAll, _getBalance, _create, _update, _delete } =
        transactionServices();

    const { session } = useSession();

    const handleGetRows = useCallback(async () => {
        try {
            const data = await _getAll();

            setRows(data);
        } catch (err) {
            showErrorToast(err);
        }
    }, [_getAll, showErrorToast]);

    const handleGetRowsBalance = useCallback(
        async (period = '', type = '') => {
            try {
                const data = await _getBalance(period, type);
                setBalance(data);
            } catch (err) {
                showErrorToast(err);
            }
        },
        [_getBalance, showErrorToast],
    );

    const handleCreate = useCallback(
        async (values: TransactionFormData, type: string) => {
            try {
                await _create(values);

                await handleGetRowsBalance('01-2021', type);

                showSuccessToast('Successfully created.');
            } catch (err) {
                showErrorToast(err);
            }
        },
        [_create, handleGetRowsBalance, showErrorToast, showSuccessToast],
    );

    const handleUpdate = useCallback(
        async (id: number, values: TransactionFormData, type = 'in') => {
            try {
                await _update({ id, data: values });

                if (session && session.user.admin === 1) {
                    await handleGetRows();
                } else {
                    await handleGetRowsBalance('01-2021', type);
                }

                showSuccessToast('Successfully updated.');
            } catch (err) {
                showErrorToast(err);
            }
        },
        [
            _update,
            handleGetRows,
            handleGetRowsBalance,
            session,
            showErrorToast,
            showSuccessToast,
        ],
    );

    const handleDelete = useCallback(
        async (id: number, type: string) => {
            try {
                await _delete(id);

                if (session && session.user.admin === 1) {
                    await handleGetRows();
                } else {
                    await handleGetRowsBalance('01-2021', type);
                }

                showSuccessToast('Successfully deleted.');
            } catch (err) {
                showErrorToast(err);
            }
        },
        [
            _delete,
            handleGetRows,
            handleGetRowsBalance,
            session,
            showErrorToast,
            showSuccessToast,
        ],
    );

    return {
        rows,
        balance,
        handleGetRows,
        handleGetRowsBalance,
        handleCreate,
        handleUpdate,
        handleDelete,
    };
};
