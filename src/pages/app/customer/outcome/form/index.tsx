import React, { useCallback, useEffect } from 'react';
import { Button, Flex, Grid, GridItem, Text, useToast } from '@chakra-ui/react';
import * as yup from 'yup';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    TransactionData,
    TransactionFormData,
} from '../../../../../interfaces/transaction';
import { FormInput } from '../../../../../components/Form/Input';
import { FormInputCurrency } from '../../../../../components/Form/Input/Currency';
import { FormSelect } from '../../../../../components/Form/Select';
import {
    extractCurrencyInputValue,
    dateToInputValue,
    inputValueToDate,
} from '../../../../../utils/helpers';
import { typeOptions } from './data';

const TransactionFormSchema: yup.SchemaOf<TransactionFormData> = yup
    .object()
    .shape({
        amount: yup
            .number()
            .min(0.01, 'Minimun $ 0,01')
            .required('Amount is mandatory'),
        date: yup.string().required('Date is mandatory'),
        description: yup.string().required('Description is mandatory'),
        type: yup.mixed(),
        status: yup.mixed(),
    });

interface TransactionFormProps {
    editing: TransactionData | null;
    setEditing: React.Dispatch<React.SetStateAction<TransactionData | null>>;
    handleCreate(values: TransactionFormData, type: string): Promise<void>;
    handleUpdate(
        id_master: number,
        values: TransactionFormData,
        type: string,
    ): Promise<void>;
}

export const TransactionForm = (props: TransactionFormProps): JSX.Element => {
    const { editing, setEditing, handleCreate, handleUpdate } = props;

    const toast = useToast();

    const {
        register,
        control,
        setValue,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TransactionFormData>({
        resolver: yupResolver(TransactionFormSchema),
    });
    const onSubmit = useCallback<SubmitHandler<TransactionFormData>>(
        async (data) => {
            try {
                const reasambleDate = data;
                reasambleDate.date = inputValueToDate(data.date);

                if (editing)
                    await handleUpdate(editing.id, reasambleDate, 'out');
                else await handleCreate(reasambleDate, 'out');

                setEditing(null);

                setValue('amount', 0);
                reset();
            } catch (err) {
                toast({
                    status: 'error',
                    title: `Erro`,
                    description: err,
                    isClosable: true,
                });
            }
        },
        [
            editing,
            handleCreate,
            handleUpdate,
            reset,
            setEditing,
            setValue,
            toast,
        ],
    );

    useEffect(() => {
        if (editing) {
            Object.keys(editing).forEach((key: keyof TransactionFormData) => {
                if (key in TransactionFormSchema.fields) {
                    switch (key) {
                        case 'date':
                            setValue(key, dateToInputValue(editing[key]));
                            break;
                        default:
                            setValue(key, editing[key]);
                            break;
                    }
                }
            });
        } else reset();
    }, [editing, setValue, reset]);

    const handleChangePrice = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setValue('amount', extractCurrencyInputValue(event.target.value));
        },
        [setValue],
    );
    const handleCancelEdit = useCallback(() => {
        setEditing(null);
        setValue('amount', 0);
    }, [setEditing, setValue]);

    return (
        <Grid
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            templateColumns="repeat(6, 1fr)"
            gridColumnGap="4"
            gridGap="4">
            <GridItem colSpan={{ base: 6, sm: 3 }}>
                <Controller
                    render={({ field }) => (
                        <FormInputCurrency
                            name="amount"
                            label="Amount"
                            error={errors.amount}
                            autoComplete="off"
                            {...field}
                            onChange={handleChangePrice}
                        />
                    )}
                    control={control}
                    name="amount"
                />
            </GridItem>
            <GridItem colSpan={{ base: 6, sm: 3 }}>
                <FormInput
                    name="date"
                    label="Date"
                    type="datetime-local"
                    error={errors.date}
                    placeholder="date"
                    {...register('date')}
                />
            </GridItem>
            <GridItem colSpan={6}>
                <FormInput
                    name="description"
                    label="Description"
                    error={errors.description}
                    placeholder="Description"
                    {...register('description')}
                />
            </GridItem>
            <GridItem colSpan={{ base: 6, md: 3 }}>
                <FormSelect
                    name="type"
                    label="Type"
                    error={errors.type}
                    options={typeOptions}
                    {...register('type')}
                />
            </GridItem>
            {/* {editing && (
                <GridItem colSpan={{ base: 6, md: 4, lg: 3 }}>
                    <Flex
                        direction={{ base: 'column', sm: 'row' }}
                        h={{ base: 'unset', sm: '40', md: '48', lg: '64' }}
                        gridGap="4">
                        <Image
                            src={photoURL}
                            fallbackSrc="https://via.placeholder.com/1024x768"
                            alt="Frente"
                            w="100%"
                            h="100%"
                        />
                    </Flex>
                </GridItem>
            )} */}
            <GridItem colSpan={6}>
                <Flex
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    gridGap="4">
                    {editing && (
                        <Button
                            type="button"
                            colorScheme="blue"
                            variant="ghost"
                            onClick={handleCancelEdit}>
                            <Text fontSize="sm" fontWeight="normal">
                                Cancel Edit
                            </Text>
                        </Button>
                    )}
                    <Button
                        type="submit"
                        variant="form-submit"
                        isLoading={isSubmitting}>
                        <Text>Save</Text>
                    </Button>
                </Flex>
            </GridItem>
        </Grid>
    );
};
