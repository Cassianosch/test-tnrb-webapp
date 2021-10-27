import React, { useCallback, useMemo } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { IconType } from 'react-icons/lib';

interface useTableHookParams<T> {
    data: T[];
    selected: T[];
    setSelected: React.Dispatch<React.SetStateAction<T[]>>;
    onClickDelete(row: T, showToast?: boolean): Promise<void>;
    sortOrd: 'asc' | 'desc';
}

interface useTableHookData {
    handleDeleteAll(): void;
    isDeleteAllDisabled: boolean;
    isMainCheckboxChecked: boolean;
    handleToggleMainCheckbox(): void;
    SortOrderIcon: IconType;
}

export default function useTable<T>(
    params: useTableHookParams<T>,
): useTableHookData {
    const { data, selected, setSelected, onClickDelete, sortOrd } = params;

    const handleDeleteAll = useCallback(async () => {
        const promises = selected.map((row, index) =>
            onClickDelete(row, index === selected.length),
        );

        await Promise.all(promises);

        setSelected([]);
    }, [onClickDelete, selected, setSelected]);

    const isDeleteAllDisabled = useMemo(
        () => selected.length === 0,
        [selected.length],
    );

    const isMainCheckboxChecked = useMemo(
        () => selected.length === data.length && selected.length > 0,
        [data.length, selected.length],
    );

    const handleToggleMainCheckbox = useCallback(() => {
        if (selected.length === data.length) {
            setSelected([]);
        } else {
            setSelected(data);
        }
    }, [data, selected.length, setSelected]);

    const SortOrderIcon = useMemo(
        () => (sortOrd === 'asc' ? AiFillCaretDown : AiFillCaretUp),
        [sortOrd],
    );

    return {
        handleDeleteAll,
        isDeleteAllDisabled,
        isMainCheckboxChecked,
        handleToggleMainCheckbox,
        SortOrderIcon,
    };
}
