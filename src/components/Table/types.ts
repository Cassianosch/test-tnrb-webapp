import React from 'react';
import { IconType } from 'react-icons/lib';

export interface TableProps<T> {
    selected: T[];
    setSelected: React.Dispatch<React.SetStateAction<T[]>>;
    data: T[];
    columns: (keyof T)[];
    onClickEdit?(row: T): void;
    onClickDelete?(row: T, showToast?: boolean): Promise<void>;
    customRenderers?: { [key in keyof T]?: (value: T[key]) => JSX.Element };
    toggleSort(key: keyof T): void;
    sortKey: keyof T;
    sortOrd: 'asc' | 'desc';
    onClickDetail?(row: T): void;
}

export interface PaginationProps {
    total: number;
    numberPerPage?: number;
    current: number;
    setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
    onChangePage?: () => void;
}

export interface TableWrapperProps<T = Record<string, string | number>[]> {
    columns: (keyof T)[];
    data: T[];
    onClickEdit?(row: T): void;
    onClickDelete?(row: T, showToast?: boolean): Promise<void>;
    paginationProps: PaginationProps;
    customRenderers?: { [key in keyof T]?: (value: T[key]) => JSX.Element };
    onClickDetail?(row: T): void;
}

export interface TableHeadProps<T> {
    isMainCheckboxChecked: boolean;
    handleToggleMainCheckbox(): void;
    columns: (keyof T)[];
    toggleSort(column: keyof T): void;
    SortOrderIcon: IconType;
    sortKey: keyof T;
}

export interface TableColumnProps<T> {
    row: T;
    column: keyof T;
    customRenderers?: { [key in keyof T]?: (value: T[key]) => JSX.Element };
}

export interface TableRowProps<T> extends Omit<TableColumnProps<T>, 'column'> {
    index: number;
    selected: T[];
    setSelected: React.Dispatch<React.SetStateAction<T[]>>;
    columns: (keyof T)[];
    onClickEdit(row: T): void;
    onClickDelete(row: T): Promise<void>;
    onClickDetail?(row: T): void;
}

export interface TableFiltersProps<T> {
    columns: (keyof T)[];
    toggleSort(key: keyof T): void;
    sortKey: keyof T;
    SortOrderIcon: IconType;
}
