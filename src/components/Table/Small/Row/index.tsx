import React from 'react';
import {
    Box,
    Button,
    Checkbox,
    Flex,
    GridItem,
    Icon,
    Text,
} from '@chakra-ui/react';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import useTableRow from '../../../../hooks/useTableRow';
import { TableColumnProps, TableRowProps } from '../../types';
import useTranslation from '../../../../hooks/useTranslation';

function TableColumn<T>(props: TableColumnProps<T>): JSX.Element {
    const { row, column, customRenderers } = props;

    const { translate } = useTranslation();

    const hasCustomRenderer = customRenderers && column in customRenderers;

    return (
        <Text fontSize="0.875rem" fontWeight="semibold">
            {translate(String(column).toLowerCase())}:
            <>
                {hasCustomRenderer ? (
                    customRenderers[column](row[column])
                ) : (
                    <Text as="span" fontWeight="normal">
                        {' '}
                        {row[column]}
                    </Text>
                )}
            </>
        </Text>
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
    } = props;

    const {
        isRowSelected,
        handleToggleRow,
        handleEditRow,
        handleDeleteRow,
        isRowBeingDeleted,
    } = useTableRow({
        row,
        selected,
        setSelected,
        onClickEdit,
        onClickDelete,
    });

    return (
        <GridItem key={`row-${index}`}>
            <Box w="100%" h="auto" p="4" bg="gray.300" borderRadius="md">
                {columns.map((column) => (
                    <TableColumn<T>
                        key={`row-${index}-key-${column}`}
                        row={row}
                        column={column}
                        customRenderers={customRenderers}
                    />
                ))}
                <Flex align="center" justify="flex-end" mt="4">
                    <Flex flex={1}>
                        <Checkbox
                            colorScheme="facebook"
                            borderColor="gray.700"
                            isChecked={isRowSelected}
                            onChange={handleToggleRow}
                        />
                    </Flex>
                    <Flex gridGap="4">
                        <Button
                            size="xs"
                            colorScheme="teal"
                            onClick={handleEditRow}>
                            <Icon as={RiEditLine} />
                        </Button>
                        <Button
                            size="xs"
                            colorScheme="red"
                            onClick={handleDeleteRow}
                            isLoading={isRowBeingDeleted}>
                            <Icon as={RiDeleteBinLine} />
                        </Button>
                    </Flex>
                </Flex>
            </Box>
        </GridItem>
    );
}
