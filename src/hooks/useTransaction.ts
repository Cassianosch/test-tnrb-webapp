import { useCallback, useState } from 'react';
import {
    TransactionData,
    TransactionFormData,
    TransactionFormBalanceData,
    TransactionFormIncomeData,
} from '../interfaces/transaction';
import { transactionServices } from '../services/transaction';
import useCustomToast from './useCustomToast';
import useSession from './useSession';
import { currentDateToFilter } from '../utils/helpers';

interface useTransactionHookData {
    rows: TransactionData[];
    handleGetRows(type?: string): Promise<void>;
    balance: TransactionFormBalanceData;
    handleGetRowsBalance(period?: string, type?: string): Promise<void>;
    incomes: TransactionFormIncomeData;
    handleGetRowsIncome(period?: string): Promise<void>;
    handleCreate(values: TransactionFormData, type?: string): Promise<void>;
    handleCreateIncome(values: TransactionFormData): Promise<void>;
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
    const [incomes, setIncomes] = useState<TransactionFormIncomeData>();

    const { showErrorToast, showSuccessToast } = useCustomToast();

    const {
        _getAll,
        _getBalance,
        _getIncomes,
        _create,
        _createIncome,
        _update,
        _delete,
    } = transactionServices();

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

    const handleGetRowsIncome = useCallback(
        async (period = '') => {
            try {
                const data = await _getIncomes(period);
                setIncomes(data);
            } catch (err) {
                showErrorToast(err);
            }
        },
        [_getIncomes, showErrorToast],
    );

    const handleCreate = useCallback(
        async (values: TransactionFormData, type: string) => {
            try {
                await _create(values);

                await handleGetRowsBalance(currentDateToFilter(), type);

                showSuccessToast('Successfully created.');
            } catch (err) {
                showErrorToast(err);
            }
        },
        [_create, handleGetRowsBalance, showErrorToast, showSuccessToast],
    );

    const handleCreateIncome = useCallback(
        async (values) => {
            try {
                await _createIncome(values);

                await handleGetRowsIncome(currentDateToFilter());

                showSuccessToast('Successfully created.');
            } catch (err) {
                showErrorToast(err);
            }
        },
        [_createIncome, handleGetRowsIncome, showErrorToast, showSuccessToast],
    );

    const handleUpdate = useCallback(
        async (id: number, values: TransactionFormData, type = 'in') => {
            try {
                await _update({ id, data: values });

                if (session && session.user.admin === 1) {
                    await handleGetRows();
                } else if (type === 'in') {
                    await handleGetRowsIncome(currentDateToFilter());
                } else {
                    await handleGetRowsBalance(currentDateToFilter(), type);
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
            handleGetRowsIncome,
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
                } else if (type === 'in') {
                    await handleGetRowsIncome(currentDateToFilter());
                } else {
                    await handleGetRowsBalance(currentDateToFilter(), type);
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
            handleGetRowsIncome,
            session,
            showErrorToast,
            showSuccessToast,
        ],
    );

    return {
        rows,
        balance,
        incomes,
        handleGetRows,
        handleGetRowsBalance,
        handleGetRowsIncome,
        handleCreate,
        handleCreateIncome,
        handleUpdate,
        handleDelete,
    };
};
