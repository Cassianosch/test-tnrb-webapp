import {
    Button,
    Checkbox,
    Flex,
    Icon,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import useTranslation from '../../../../hooks/useTranslation';
import { TableHeadProps } from '../../types';

export function TableHead<T>(props: TableHeadProps<T>): JSX.Element {
    const {
        isMainCheckboxChecked,
        handleToggleMainCheckbox,
        columns,
        toggleSort,
        SortOrderIcon,
        sortKey,
        onClickDelete,
    } = props;

    const { translate } = useTranslation();

    return (
        <Thead>
            <Tr>
                {onClickDelete && (
                    <Th px="6" color="gray.300" width="8">
                        <Checkbox
                            colorScheme="facebook"
                            borderColor="gray.700"
                            isChecked={isMainCheckboxChecked}
                            onChange={handleToggleMainCheckbox}
                        />
                    </Th>
                )}
                {columns.map((column, index) => (
                    <Th key={`column-${index}`}>
                        <Button
                            variant="unstyled"
                            w="full"
                            h="unset"
                            onClick={() => toggleSort(column)}>
                            <Flex
                                direction="row"
                                alignItems="center"
                                gridGap="8px">
                                <Text
                                    fontSize="xs"
                                    fontWeight="bold"
                                    textAlign="left"
                                    wordBreak="break-all">
                                    {translate(String(column).toLowerCase())}
                                </Text>
                                <Icon
                                    as={SortOrderIcon}
                                    w="12px"
                                    h="12px"
                                    color="gray.700"
                                    opacity={sortKey === column ? 1 : 0}
                                />
                            </Flex>
                        </Button>
                    </Th>
                ))}
            </Tr>
        </Thead>
    );
}
