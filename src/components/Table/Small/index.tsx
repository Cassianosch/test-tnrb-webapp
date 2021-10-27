import {
    Grid,
    Box,
    Text,
    Flex,
    Button,
    Icon,
    Checkbox,
} from '@chakra-ui/react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { TableProps } from '../types';
import useTable from '../../../hooks/useTable';
import { TableRow } from './Row';
import { TableFilters } from './Filters';

export function SmallTable<T>(props: TableProps<T>): JSX.Element {
    const {
        selected,
        setSelected,
        data,
        columns,
        onClickEdit,
        onClickDelete,
        customRenderers = null,
        toggleSort,
        sortKey,
        sortOrd,
    } = props;

    const {
        handleDeleteAll,
        isDeleteAllDisabled,
        isMainCheckboxChecked,
        handleToggleMainCheckbox,
        SortOrderIcon,
    } = useTable<T>({
        data,
        selected,
        setSelected,
        onClickDelete,
        sortOrd,
    });

    return (
        <Flex direction="column" w="full" gridGap="4">
            <Box alignSelf="flex-end">
                <Button
                    variant="delete"
                    onClick={handleDeleteAll}
                    isDisabled={isDeleteAllDisabled}>
                    <Flex direction="row" align="center">
                        <Icon as={RiDeleteBinLine} w="6" h="6" mr="4" />
                        <Text>Deletar selecionados</Text>
                    </Flex>
                </Button>
            </Box>
            <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                w="full">
                <Checkbox
                    colorScheme="facebook"
                    borderColor="gray.700"
                    isChecked={isMainCheckboxChecked}
                    onChange={handleToggleMainCheckbox}>
                    <Text cursor="text">Selecionar todos</Text>
                </Checkbox>
                <TableFilters<T>
                    columns={columns}
                    toggleSort={toggleSort}
                    sortKey={sortKey}
                    SortOrderIcon={SortOrderIcon}
                />
            </Flex>
            <Grid templateColumns="1fr" gap={4}>
                {data.map((row, index) => (
                    <TableRow<T>
                        key={`row-${index}`}
                        row={row}
                        index={index}
                        selected={selected}
                        setSelected={setSelected}
                        columns={columns}
                        customRenderers={customRenderers}
                        onClickEdit={onClickEdit}
                        onClickDelete={onClickDelete}
                    />
                ))}
            </Grid>
        </Flex>
    );
}
