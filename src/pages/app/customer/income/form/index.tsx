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
import api from '../../../../../services/api';
import {
    TransactionData,
    TransactionFormImageData,
    TransactionFormData,
} from '../../../../../interfaces/transaction';
import { FormInput } from '../../../../../components/Form/Input';
import { FormInputCurrency } from '../../../../../components/Form/Input/Currency';
import { FormSelect } from '../../../../../components/Form/Select';
import {
    extractCurrencyInputValue,
    dateToInputValue,
    convertCurrencyNumber,
    inputValueToDate,
} from '../../../../../utils/helpers';
import { typeOptions } from './data';
import useSession from '../../../../../hooks/useSession';

const TransactionFormSchema: yup.SchemaOf<TransactionFormImageData> = yup
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
        image: (() => {
            const validation = yup
                .mixed()
                .test(
                    'fileExists',
                    'File is mandatory',
                    (value) => value.length > 0,
                )
                .test('fileSize', 'File too large', (value) => {
                    if (value.length > 0) {
                        return value[0].size <= 4000000;
                    }
                    return true;
                })
                .test('fileFormat', 'Unsupported file type', (value) => {
                    if (value.length > 0) {
                        return [
                            'image/jpg',
                            'image/jpeg',
                            'image/png',
                        ].includes(value[0].type);
                    }
                    return false;
                });
            // if (editing) validation = yup.mixed();
            return validation;
        })(),
    });

interface TransactionFormProps {
    editing: TransactionData | null;
    setEditing: React.Dispatch<React.SetStateAction<TransactionData | null>>;
    handleCreate(values: unknown, type: string): Promise<void>;
    handleUpdate(
        id_master: number,
        values: TransactionFormData,
        type: string,
    ): Promise<void>;
}

export const TransactionForm = (props: TransactionFormProps): JSX.Element => {
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
    } = useForm<TransactionFormImageData>({
        resolver: yupResolver(TransactionFormSchema),
    });

    useEffect(() => {
        if (editing) {
            TransactionFormSchema.fields.image = yup.mixed();
        }
    }, [editing]);

    const handleEditFormConstruct = (data: TransactionFormImageData) => {
        const newData = data;
        delete newData.image;
        return newData;
    };

    const handleMultipartConstruct = (data: TransactionFormImageData) => {
        const formData = new FormData();
        formData.append('image', data.image[0]);
        formData.append('amount', convertCurrencyNumber(data.amount));
        formData.append('date', data.date);
        formData.append('description', data.description);
        formData.append('type', data.type);
        return formData;
    };
    const onSubmit = useCallback<SubmitHandler<TransactionFormImageData>>(
        async (data) => {
            try {
                const reasambleDate = data;
                reasambleDate.date = inputValueToDate(data.date);
                if (editing)
                    await handleUpdate(
                        editing.id,
                        handleEditFormConstruct(reasambleDate),
                        'in',
                    );
                else
                    await handleCreate(
                        handleMultipartConstruct(reasambleDate),
                        'in',
                    );

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

    // const handle;

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
            Object.keys(editing).forEach(
                (key: keyof TransactionFormImageData) => {
                    if (key in TransactionFormSchema.fields) {
                        switch (key) {
                            case 'date':
                                setValue(key, dateToInputValue(editing[key]));
                                break;
                            case 'image':
                                handlePhoto(editing.id);
                                break;

                            default:
                                setValue(key, editing[key]);
                                break;
                        }
                    }
                },
            );
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
            {!editing && (
                <GridItem colSpan={{ base: 6, md: 3 }}>
                    <FormInput
                        name="image"
                        label="Image"
                        type="file"
                        error={errors.image}
                        {...register('image')}
                    />
                </GridItem>
            )}
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
