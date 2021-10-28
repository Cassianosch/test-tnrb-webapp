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
} from '../../../../utils/helpers';

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
        handleGetRowsBalance('01-2021', 'out');
    }, [handleGetRowsBalance]);

    return (
        <Container title="Administration Checks" type="app">
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
