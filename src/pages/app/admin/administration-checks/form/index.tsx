import React, { useCallback, useEffect, useState } from 'react';
import {
    Button,
    Flex,
    Grid,
    GridItem,
    Text,
    useToast,
    Image,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import api from '../services/api';
import api from '../../../../../services/api';
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
} from '../../../../../utils/helpers';
import { typeOptions, statusOptions } from './data';
import useSession from '../../../../../hooks/useSession';

const TransactionFormSchema: yup.SchemaOf<TransactionFormData> = yup
    .object()
    .shape({
        amount: yup.number().required('Resolução obrigatória'),
        date: yup.string().nullable(),
        description: yup.string().required('Descrição obrigatória'),
        type: yup.mixed(),
        status: yup.mixed(),
        image: yup.mixed(),
    });

interface PlanFormProps {
    editing: TransactionData | null;
    setEditing: React.Dispatch<React.SetStateAction<TransactionData | null>>;
    handleCreate(values: TransactionFormData): Promise<void>;
    handleUpdate(id_master: number, values: TransactionFormData): Promise<void>;
}

export const TransactionForm = (props: PlanFormProps): JSX.Element => {
    const [photoURL, setPhotoURL] = useState<string>('');
    const { editing, setEditing, handleCreate, handleUpdate } = props;

    const { session } = useSession();

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
                if (editing) await handleUpdate(editing.id, data);
                else await handleCreate(data);

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

    const handlePhoto = useCallback(
        (id: number) => {
            setPhotoURL(
                `${api.defaults.baseURL}transactions-image/${id}/${session.access_token}`,
            );
        },
        [session.access_token],
    );
    useEffect(() => {
        if (editing) {
            Object.keys(editing).forEach((key: keyof TransactionFormData) => {
                if (key in TransactionFormSchema.fields) {
                    if (key === 'date') {
                        setValue(key, dateToInputValue(editing[key]));
                    }
                    if (key === 'image') {
                        handlePhoto(editing.id);
                    } else {
                        setValue(key, editing[key]);
                    }
                }
            });
        } else reset();
    }, [editing, setValue, reset, handlePhoto]);

    const handleChangePrice = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setValue('amount', extractCurrencyInputValue(event.target.value));
        },
        [setValue],
    );

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
            <GridItem colSpan={{ base: 6, md: 3 }}>
                <FormSelect
                    name="status"
                    label="Status"
                    error={errors.status}
                    options={statusOptions}
                    {...register('status')}
                />
            </GridItem>
            {editing && (
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
            )}
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
                            onClick={() => setEditing(null)}>
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
