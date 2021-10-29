import { Stack, Box } from '@chakra-ui/react';
import React, { useCallback, useMemo } from 'react';
import { PaginationProps } from '../Table/types';
import { PaginationItem } from './Item';

export const Pagination = (props: PaginationProps): JSX.Element => {
    const {
        total,
        numberPerPage = 10,
        current,
        setCurrentPage,
        onChangePage,
    } = props;

    const rest = useMemo(() => total % numberPerPage, [numberPerPage, total]);

    const numOfPages = useMemo(
        () => (total + (10 - rest)) / numberPerPage,
        [numberPerPage, rest, total],
    );

    const itemsToShow = useMemo(() => {
        const arr: number[] = [];

        let aux = current;

        for (let i = aux - 2; i <= aux + 2; i++) {
            if (i <= 0) aux += 1;
            else if (i <= numOfPages) arr.push(i);
            else {
                const value = current - 2 - (i - numOfPages);

                if (value > 0) arr.unshift(value);
            }
        }

        return arr;
    }, [current, numOfPages]);

    const handleChangePage = useCallback(
        (index: number) => {
            setCurrentPage(index);

            onChangePage();
        },
        [onChangePage, setCurrentPage],
    );

    const range = useMemo(
        () => ({
            from: (current - 1) * numberPerPage + 1,
            to:
                current * numberPerPage > total
                    ? total
                    : current * numberPerPage,
            total,
        }),
        [current, numberPerPage, total],
    );

    return (
        <Stack
            direction={['column', 'column', 'row']}
            spacing="6"
            mt="8"
            justify="space-between"
            align="center">
            <Box>
                <strong>{range.from}</strong> - <strong>{range.to}</strong> de{' '}
                <strong>{range.total}</strong>
            </Box>
            <Stack direction="row" spacing="2">
                {itemsToShow.map((page) => (
                    <PaginationItem
                        key={`pagination-item-${page}`}
                        number={page}
                        isCurrent={page === current}
                        handleChangePage={() => handleChangePage(page)}
                        data-testid={`pagination-item-${page}`}
                    />
                ))}
            </Stack>
        </Stack>
    );
};
