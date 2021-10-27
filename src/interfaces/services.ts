export interface PaginationData<T> {
    count: number;
    rows: T[];
}

export interface PaginationParams {
    limit: number;
    currentPage: number;
}
