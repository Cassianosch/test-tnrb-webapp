import React from 'react';
import { Button, Checkbox, Flex, Icon, Td, Text, Tr } from '@chakra-ui/react';
import { RiDeleteBinLine, RiEditLine, RiEyeLine } from 'react-icons/ri';
import useTableRow from '../../../../hooks/useTableRow';
import { TableColumnProps, TableRowProps } from '../../types';

function TableColumn<T>(props: TableColumnProps<T>): JSX.Element {
    const { row, column, customRenderers } = props;

    const hasCustomRenderer = customRenderers && column in customRenderers;

    const handleValueRow = (rowEl, columns) => {
        const splittedColumns = columns.split(".");
        if (splittedColumns.length === 2) return rowEl[splittedColumns[0]][splittedColumns[1]];
        return rowEl[splittedColumns[0]];
    }
    return (
        <Td>
            {hasCustomRenderer ? (
                customRenderers[column](row[column])
            ) : (
                <Text>{handleValueRow(row, column)}</Text>
            )}
        </Td>
    );
}

export function TableRow<T>(props: TableRowProps<T>): JSX.Element {
    const {
        row,
        index,
        selected,
        setSelected,
        columns,
        customRenderers,
        onClickEdit,
        onClickDelete,
        onClickDetail,
    } = props;

    const {
        isRowSelected,
        handleToggleRow,
        handleEditRow,
        handleDeleteRow,
        handleDetailRow,
        isRowBeingDeleted,
    } = useTableRow({
        row,
        selected,
        setSelected,
        onClickEdit,
        onClickDelete,
        onClickDetail,
    });

    return (
        <Tr>
            <Td px="6">
                <Checkbox
                    colorScheme="facebook"
                    borderColor="gray.700"
                    isChecked={isRowSelected}
                    onChange={handleToggleRow}
                />
            </Td>
            {columns.map((column) => (
                <TableColumn<T>
                    key={`row-${index}-column-${column}`}
                    row={row}
                    column={column}
                    customRenderers={customRenderers}
                />
            ))}
            <Td w="40">
                <Flex
                    direction={{ base: 'column', xl: 'row' }}
                    align="center"
                    justify="center"
                    gridGap="4">
                    {onClickDetail && (
                        <Button
                            size="xs"
                            colorScheme="blue"
                            onClick={handleDetailRow}>
                            <Icon as={RiEyeLine} />
                        </Button>
                    )}
                    <Button
                        size="xs"
                        colorScheme="teal"
                        onClick={handleEditRow}
                        data-testid={`row-${index}-edit`}>
                        <Icon as={RiEditLine} />
                    </Button>
                    <Button
                        size="xs"
                        colorScheme="red"
                        onClick={handleDeleteRow}
                        isLoading={isRowBeingDeleted}
                        data-testid={`row-${index}-delete`}>
                        <Icon as={RiDeleteBinLine} />
                    </Button>
                </Flex>
            </Td>
        </Tr>
    );
}
