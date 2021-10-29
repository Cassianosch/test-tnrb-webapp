import React, { useState, useEffect } from 'react';
import {
    Flex,
    Heading,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Text,
} from '@chakra-ui/react';
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

export const IncomePage = (): JSX.Element => {
    const [editing, setEditing] = useState<TransactionFormPreloadData | null>(
        null,
    );

    const {
        incomes,
        handleGetRowsIncome,
        handleCreateIncome,
        handleUpdate,
        handleDelete,
    } = useAdministrationCheck();

    useEffect(() => {
        handleGetRowsIncome(currentDateToFilter());
    }, [handleGetRowsIncome]);

    const handleFilter = (e) => {
        if (e.target.value === '') {
            handleGetRowsIncome(currentDateToFilter());
            return;
        }
        handleGetRowsIncome(e.target.value);
    };

    return (
        <Container title="Income" type="app">
            <Flex direction="column" gridGap="8">
                <Heading fontSize="2xl">Income Edition</Heading>
                <TransactionForm
                    editing={editing}
                    setEditing={setEditing}
                    handleCreate={handleCreateIncome}
                    handleUpdate={handleUpdate}
                />
            </Flex>
            {incomes?.pending && (
                <>
                    <Heading fontSize="2xl">Income List</Heading>
                    <FormInput
                        name="month"
                        label="Filter"
                        type="month"
                        defaultValue={currentDateToFilter()}
                        onChange={handleFilter}
                    />
                    <Tabs variant="soft-rounded" defaultIndex={1}>
                        <TabList>
                            <Tab>
                                Pending
                                {incomes?.pending.length
                                    ? ` - ${incomes?.pending.length}`
                                    : null}
                            </Tab>
                            <Tab>
                                Accepted
                                {incomes?.accepted.length
                                    ? ` - ${incomes?.accepted.length}`
                                    : null}
                            </Tab>
                            <Tab>
                                Rejected
                                {incomes?.rejected.length
                                    ? ` - ${incomes?.rejected.length}`
                                    : null}
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Table<TransactionFormPreloadData>
                                    columns={['description', 'date', 'amount']}
                                    data={incomes?.pending}
                                    onClickEdit={(row) => setEditing(row)}
                                    onClickDelete={({ id }) =>
                                        handleDelete(id, 'in')
                                    }
                                    paginationProps={{ total: 0, current: 1 }}
                                    customRenderers={{
                                        date: (value) => (
                                            <Text as="span" fontWeight="normal">
                                                {formatterDate.format(
                                                    new Date(value),
                                                )}
                                            </Text>
                                        ),
                                        amount: (value) => (
                                            <Text as="span" fontWeight="normal">
                                                {formatterCurrencyDolar.format(
                                                    value,
                                                )}
                                            </Text>
                                        ),
                                    }}
                                />
                            </TabPanel>
                            <TabPanel>
                                <Table<TransactionFormPreloadData>
                                    columns={['description', 'date', 'amount']}
                                    data={incomes?.accepted}
                                    onClickEdit={(row) => setEditing(row)}
                                    onClickDelete={({ id }) =>
                                        handleDelete(id, 'in')
                                    }
                                    paginationProps={{ total: 0, current: 1 }}
                                    customRenderers={{
                                        date: (value) => (
                                            <Text as="span" fontWeight="normal">
                                                {formatterDate.format(
                                                    new Date(value),
                                                )}
                                            </Text>
                                        ),
                                        amount: (value) => (
                                            <Text as="span" fontWeight="normal">
                                                {formatterCurrencyDolar.format(
                                                    value,
                                                )}
                                            </Text>
                                        ),
                                    }}
                                />
                            </TabPanel>
                            <TabPanel>
                                <Table<TransactionFormPreloadData>
                                    columns={['description', 'date', 'amount']}
                                    data={incomes?.rejected}
                                    onClickEdit={(row) => setEditing(row)}
                                    onClickDelete={({ id }) =>
                                        handleDelete(id, 'in')
                                    }
                                    paginationProps={{ total: 0, current: 1 }}
                                    customRenderers={{
                                        date: (value) => (
                                            <Text as="span" fontWeight="normal">
                                                {formatterDate.format(
                                                    new Date(value),
                                                )}
                                            </Text>
                                        ),
                                        amount: (value) => (
                                            <Text as="span" fontWeight="normal">
                                                {formatterCurrencyDolar.format(
                                                    value,
                                                )}
                                            </Text>
                                        ),
                                    }}
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    {/* <Table<TransactionFormPreloadData>
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
                                    {formatterCurrencyDolar.format(value)}
                                </Text>
                            ),
                        }}
                    /> */}
                </>
            )}
        </Container>
    );
};
