import { useCallback, useState } from 'react';
import { TransactionData, TransactionFormData } from '../interfaces/transaction';
import { transactionServices } from '../services/transaction';
import useCustomToast from './useCustomToast';

interface useTransactionHookData {
    rows: TransactionData[];
    handleGetRows(): Promise<void>;
    handleCreate(values: TransactionFormData): Promise<void>;
    handleUpdate(id_plan: number, values: TransactionFormData): Promise<void>;
    handleDelete(id_plan: number): Promise<void>;
}

export default (): useTransactionHookData => {
    const [rows, setRows] = useState<TransactionData[]>([]);

    const { showErrorToast, showSuccessToast } = useCustomToast();

    const { _getAll, _create, _update, _delete } = transactionServices();

    const handleGetRows = useCallback(async () => {
        try {
            const data = await _getAll();

            setRows(data);
        } catch (err) {
            showErrorToast(err);
        }
    }, [_getAll, showErrorToast]);

    const handleCreate = useCallback(
        async (values: TransactionFormData) => {
            try {
                await _create(values);

                await handleGetRows();

                showSuccessToast('Check successfully created.');
            } catch (err) {
                showErrorToast(err);
            }
        },
        [_create, handleGetRows, showErrorToast, showSuccessToast],
    );

    const handleUpdate = useCallback(
        async (id: number, values: TransactionFormData) => {
            try {
                await _update({ id, data: values });

                await handleGetRows();

                showSuccessToast('Check successfully updated.');
            } catch (err) {
                showErrorToast(err);
            }
        },
        [_update, handleGetRows, showErrorToast, showSuccessToast],
    );

    const handleDelete = useCallback(
        async (id: number) => {
            try {
                await _delete(id);

                await handleGetRows();

                showSuccessToast('Check successfully deleted.');
            } catch (err) {
                showErrorToast(err);
            }
        },
        [_delete, handleGetRows, showErrorToast, showSuccessToast],
    );

    return {
        rows,
        handleGetRows,
        handleCreate,
        handleUpdate,
        handleDelete,
    };
};
