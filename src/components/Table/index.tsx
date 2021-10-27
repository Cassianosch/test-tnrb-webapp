import { useCallback, useMemo, useState } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
import { SmallTable } from './Small';
import { WideTable } from './Wide';
import { Pagination } from '../Pagination';
import { TableWrapperProps } from './types';
import { EmptyComponent } from '../Empty';

export function Table<T>(props: TableWrapperProps<T>): JSX.Element {
    const {
        columns,
        data,
        onClickEdit,
        onClickDelete,
        customRenderers,
        onClickDetail = null,
    } = props;

    const [sortByKey, setSortByKey] = useState<keyof T>(columns[0]);
    const [sortByOrd, setSortByOrd] = useState<'asc' | 'desc'>('asc');

    const itemsToShow = useMemo(
        () =>
            data.sort((a, b) => {
                if (sortByOrd === 'asc')
                    return a[sortByKey] > b[sortByKey] ? 1 : -1;
                return a[sortByKey] > b[sortByKey] ? -1 : 1;
            }),
        [data, sortByKey, sortByOrd],
    );

    const [selected, setSelected] = useState<T[]>([]);

    const isWideVersion = useBreakpointValue({
        base: false,
        xs: false,
        md: true,
    });

    const toggleSort = useCallback(
        (key: keyof T) => {
            if (key === sortByKey)
                setSortByOrd((prev) => (prev === 'asc' ? 'desc' : 'asc'));
            else {
                setSortByKey(key);
                setSortByOrd('asc');
            }
        },
        [sortByKey],
    );

    const tableProps = {
        selected,
        setSelected,
        data: itemsToShow,
        columns,
        onClickEdit,
        onClickDelete,
        customRenderers,
        toggleSort,
        sortKey: sortByKey,
        sortOrd: sortByOrd,
        onClickDetail,
    };

    return props.data.length > 0 ? (
        <>
            {isWideVersion ? (
                <WideTable<T> {...tableProps} />
            ) : (
                <SmallTable<T> {...tableProps} />
            )}
            {props.paginationProps.total > 0 && (
                <Pagination {...props.paginationProps} />
            )}
        </>
    ) : (
        <EmptyComponent />
    );
}
