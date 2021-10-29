import React from 'react';
import { PaginationData } from './services';

export interface BaseHookData<T, F> {
    data: PaginationData<T>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    handleGetData(params?: { limit?: number }): Promise<void>;
    handleCreate(values: F): Promise<void>;
    handleUpdate(id_announcer: number, values: F): Promise<void>;
    handleDelete(id_announcer: number, showToast?: boolean): Promise<void>;
}
