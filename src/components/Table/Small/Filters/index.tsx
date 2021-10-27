import React from 'react';
import {
    Text,
    Flex,
    Button,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
} from '@chakra-ui/react';
import { IoFilter } from 'react-icons/io5';
import { TableFiltersProps } from '../../types';
import useTranslation from '../../../../hooks/useTranslation';

export function TableFilters<T>(props: TableFiltersProps<T>): JSX.Element {
    const { columns, toggleSort, sortKey, SortOrderIcon } = props;

    const { translate } = useTranslation();

    return (
        <Popover>
            <PopoverTrigger>
                <Button leftIcon={<IoFilter />} variant="ghost">
                    <Text fontWeight="normal">Ordenação</Text>
                </Button>
            </PopoverTrigger>
            <PopoverContent w="40">
                <PopoverArrow />
                <PopoverBody>
                    {columns.map((column, index) => (
                        <Button
                            key={`column-${index}`}
                            variant="unstyled"
                            w="full"
                            h="unset"
                            onClick={() => toggleSort(column)}>
                            <Flex
                                direction="row"
                                alignItems="center"
                                gridGap="8px">
                                <Text
                                    flex={1}
                                    fontSize="xs"
                                    fontWeight="bold"
                                    textAlign="left">
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
                    ))}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
