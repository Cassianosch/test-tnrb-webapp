import React, { useState, useEffect } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { Container } from '../../../../components/Layout';
import { TransactionForm } from './form';
import { Table } from '../../../../components/Table';
import { TransactionData, TransactionFormPreloadData } from '../../../../interfaces/transaction';
import useAdministrationCheck from '../../../../hooks/useTransaction';

export const AdministrationChecksPage = (): JSX.Element => {
    const [editing, setEditing] = useState<TransactionFormPreloadData | null>(null);

    const { rows, handleGetRows, handleCreate, handleUpdate, handleDelete } =
        useAdministrationCheck();

    useEffect(() => {
        handleGetRows();
    }, [handleGetRows]);

    return (
        <Container title="Planos" type="app">
            <Flex direction="column" gridGap="8">
                <Heading fontSize="2xl">Check Edition</Heading>
                <TransactionForm
                    editing={editing}
                    setEditing={setEditing}
                    handleCreate={handleCreate}
                    handleUpdate={handleUpdate}
                />
            </Flex>
            <Heading fontSize="2xl">Check List</Heading>
            <Table<TransactionFormPreloadData>
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                columns={['user.name', 'description', 'date', 'amount']}
                data={rows}
                onClickEdit={(row) => setEditing(row)}
                onClickDelete={({ id }) => handleDelete(id)}
                paginationProps={{ total: 0, current: 1 }}
                customRenderers={{
                    // amount: (value) => (
                    //     <Text as="span" fontWeight="normal">
                    //         {`$ ${value}`}
                    //     </Text>
                    // ),
                }}
            />
        </Container>
    );
};
