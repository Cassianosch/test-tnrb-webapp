import { Table, Button, Icon, Flex, Text, Tbody } from '@chakra-ui/react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { TableHead } from './Head';
import useTable from '../../../hooks/useTable';
import { TableRow } from './Row';
import { TableProps } from '../types';

export function WideTable<T>(props: TableProps<T>): JSX.Element {
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
        onClickDetail,
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
        <Flex direction="column" align="flex-end" gridGap="4">
            <Button
                variant="delete"
                onClick={handleDeleteAll}
                isDisabled={isDeleteAllDisabled}>
                <Flex direction="row" align="center">
                    <Icon as={RiDeleteBinLine} w="6" h="6" mr="4" />
                    <Text>Deletar selecionados</Text>
                </Flex>
            </Button>
            <Table variant="striped" colorScheme="blackAlpha">
                <TableHead<T>
                    isMainCheckboxChecked={isMainCheckboxChecked}
                    handleToggleMainCheckbox={handleToggleMainCheckbox}
                    columns={columns}
                    toggleSort={toggleSort}
                    SortOrderIcon={SortOrderIcon}
                    sortKey={sortKey}
                />
                <Tbody>
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
                            onClickDetail={onClickDetail}
                        />
                    ))}
                </Tbody>
            </Table>
        </Flex>
    );
}
