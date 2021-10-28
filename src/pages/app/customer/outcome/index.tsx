import React, { useState, useEffect } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { Container } from '../../../../components/Layout';
import { TransactionForm } from './form';
import { Table } from '../../../../components/Table';
import { TransactionFormPreloadData } from '../../../../interfaces/transaction';
import useAdministrationCheck from '../../../../hooks/useTransaction';
import {
    formatterCurrencyDolar,
    formatterDate,
    currentDateToFilter,
} from '../../../../utils/helpers';
import { FormInput } from '../../../../components/Form/Input';

export const OutcomePage = (): JSX.Element => {
    const [editing, setEditing] = useState<TransactionFormPreloadData | null>(
        null,
    );

    const {
        balance,
        handleGetRowsBalance,
        handleCreate,
        handleUpdate,
        handleDelete,
    } = useAdministrationCheck();

    useEffect(() => {
        handleGetRowsBalance(currentDateToFilter(), 'out');
    }, [handleGetRowsBalance]);

    const handleFilter = (e) => {
        if (e.target.value === '') {
            handleGetRowsBalance(currentDateToFilter(), 'out');
            return;
        }
        handleGetRowsBalance(e.target.value, 'out');
    };

    return (
        <Container title="Expenses" type="app">
            <Flex direction="column" gridGap="8">
                <Heading fontSize="2xl">Expense Edition</Heading>
                <TransactionForm
                    editing={editing}
                    setEditing={setEditing}
                    handleCreate={handleCreate}
                    handleUpdate={handleUpdate}
                />
            </Flex>
            {balance?.transactions && (
                <>
                    <Heading fontSize="2xl">Expense List</Heading>
                    <FormInput
                        name="month"
                        label="Filter"
                        type="month"
                        defaultValue={currentDateToFilter()}
                        onChange={handleFilter}
                    />
                    <Table<TransactionFormPreloadData>
                        columns={['description', 'date', 'amount']}
                        data={balance?.transactions}
                        onClickEdit={(row) => setEditing(row)}
                        onClickDelete={({ id }) => handleDelete(id, 'out')}
                        paginationProps={{ total: 0, current: 1 }}
                        customRenderers={{
                            date: (value) => (
                                <Text as="span" fontWeight="normal">
                                    {formatterDate.format(new Date(value))}
                                </Text>
                            ),
                            amount: (value) => (
                                <Text as="span" fontWeight="normal">
                                    {formatterCurrencyDolar.format(value * -1)}
                                </Text>
                            ),
                        }}
                    />
                </>
            )}
        </Container>
    );
};
