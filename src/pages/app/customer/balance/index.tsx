import React, { useEffect } from 'react';
import { Heading, Text, GridItem, Grid, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Container } from '../../../../components/Layout';
import { Table } from '../../../../components/Table';
import { TransactionFormPreloadData } from '../../../../interfaces/transaction';
import useAdministrationCheck from '../../../../hooks/useTransaction';
import {
    formatterCurrencyDolar,
    formatterDate,
    currentDateToFilter,
    statusOnTableImage,
} from '../../../../utils/helpers';
import { FormInput } from '../../../../components/Form/Input';

export const BalancePage = (): JSX.Element => {
    const { balance, handleGetRowsBalance } = useAdministrationCheck();

    useEffect(() => {
        handleGetRowsBalance(currentDateToFilter(), 'inout');
    }, [handleGetRowsBalance]);

    const handleFilter = (e) => {
        if (e.target.value === '') {
            handleGetRowsBalance(currentDateToFilter(), 'inout');
            return;
        }
        handleGetRowsBalance(e.target.value, 'inout');
    };

    return (
        <Container title="Income" type="app">
            {balance?.transactions && (
                <>
                    <Grid
                        as="form"
                        templateColumns="repeat(6, 1fr)"
                        gridColumnGap="4"
                        gridGap="4">
                        <GridItem colSpan={{ base: 6 }}>
                            <FormInput
                                name="month"
                                label="Filter"
                                type="month"
                                defaultValue={currentDateToFilter()}
                                onChange={handleFilter}
                            />
                        </GridItem>
                        <GridItem colSpan={{ base: 6, md: 2 }}>
                            <Text fontSize="xl">
                                Current balance:{' '}
                                {formatterCurrencyDolar.format(balance.balance)}
                            </Text>
                        </GridItem>
                        <GridItem colSpan={{ base: 6, md: 2 }}>
                            <Text fontSize="xl">
                                Incomes:{' '}
                                {formatterCurrencyDolar.format(
                                    balance.positive,
                                )}
                            </Text>
                            <Link to="/income">
                                <Button variant="form-submit">
                                    <Text>Deposit a Check</Text>
                                </Button>
                            </Link>
                        </GridItem>
                        <GridItem colSpan={{ base: 6, md: 2 }}>
                            <Text fontSize="xl">
                                Expenses:{' '}
                                {formatterCurrencyDolar.format(
                                    balance.negative === 0
                                        ? balance.negative
                                        : balance.negative * -1,
                                )}
                            </Text>
                            <Link to="/outcome">
                                <Button variant="form-submit">
                                    <Text>Purchase</Text>
                                </Button>
                            </Link>
                        </GridItem>
                    </Grid>
                    <Heading fontSize="2xl">Transactions</Heading>
                    <Table<TransactionFormPreloadData>
                        columns={['description', 'date', 'amount', 'status']}
                        data={balance?.transactions}
                        paginationProps={{ total: 0, current: 1 }}
                        customRenderers={{
                            date: (value) => (
                                <Text as="span" fontWeight="normal">
                                    {formatterDate.format(new Date(value))}
                                </Text>
                            ),
                            amount: (value, column) => (
                                <Text
                                    as="span"
                                    fontWeight="normal"
                                    textColor={
                                        column?.type === 'out' ? 'red' : ''
                                    }>
                                    {formatterCurrencyDolar.format(
                                        column?.type === 'out'
                                            ? value * -1
                                            : value,
                                    )}
                                </Text>
                            ),
                            status: (value, column) => (
                                <Text as="span" fontWeight="normal">
                                    {statusOnTableImage(value, column)}
                                </Text>
                            ),
                        }}
                    />
                </>
            )}
        </Container>
    );
};
