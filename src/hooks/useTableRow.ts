import React, { useCallback, useMemo, useState } from 'react';

interface useTableRowHookParams<T> {
    row: T;
    selected: T[];
    setSelected: React.Dispatch<React.SetStateAction<T[]>>;
    onClickEdit(row: T): void;
    onClickDelete(row: T): Promise<void>;
    onClickDetail?(row: T): void;
}

interface useTableRowHookData {
    isRowSelected: boolean;
    handleToggleRow(): void;
    handleEditRow(): void;
    handleDeleteRow(): void;
    handleDetailRow(): void;
    isRowBeingDeleted: boolean;
}

export default function useTableRow<T>(
    params: useTableRowHookParams<T>,
): useTableRowHookData {
    const {
        row,
        selected,
        setSelected,
        onClickEdit,
        onClickDelete,
        onClickDetail,
    } = params;

    const [rowBeingDeleted, setRowBeingDeleted] = useState<T | null>(null);

    const isRowSelected = useMemo(
        () => selected.includes(row),
        [row, selected],
    );

    const handleToggleRow = useCallback(() => {
        if (selected.includes(row)) {
            setSelected((prev) => prev.filter((el) => el !== row));
        } else {
            setSelected((prev) => [...prev, row]);
        }
    }, [row, selected, setSelected]);

    const handleEditRow = useCallback(() => {
        setSelected([]);

        onClickEdit(row);

        const headerElement = document.querySelector('#header');

        headerElement.scrollIntoView({
            behavior: 'smooth',
        });
    }, [onClickEdit, row, setSelected]);

    const handleDeleteRow = useCallback(() => {
        setRowBeingDeleted(row);

        onClickDelete(row);
    }, [onClickDelete, row]);

    const handleDetailRow = useCallback(() => {
        onClickDetail(row);
    }, [onClickDetail, row]);

    const isRowBeingDeleted = useMemo(
        () => rowBeingDeleted === row,
        [row, rowBeingDeleted],
    );

    return {
        isRowSelected,
        handleToggleRow,
        handleEditRow,
        handleDeleteRow,
        handleDetailRow,
        isRowBeingDeleted,
    };
}
