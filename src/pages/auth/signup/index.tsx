import React, { useCallback } from 'react';
import { Button, Flex, Heading, Text, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignupFormData } from '../../../interfaces/auth';
import { FormInput } from '../../../components/Form/Input';
import { Container } from '../../../components/Layout';
import { sessionServices } from '../../../services/session';
import useSession from '../../../hooks/useSession';

const signupFormSchema: yup.SchemaOf<SignupFormData> = yup.object().shape({
    name: yup.string().required('Name is mandatory'),
    email: yup
        .string()
        .required('E-mail is mandatory')
        .email('Shpuld be an valid email'),
    password: yup
        .string()
        .required('Password is mandatory')
        .min(8, 'At least 8 characters'),
});

export const SignupPage = (): JSX.Element => {
    const toast = useToast();

    const { handleSignin } = useSession();

    const { _signup, _login } = sessionServices();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormData>({
        resolver: yupResolver(signupFormSchema),
    });

    const onSubmit = useCallback<SubmitHandler<SignupFormData>>(
        async (data) => {
            try {
                await _signup(data);
                const session = await _login(data);
                handleSignin(session);
            } catch (err) {
                toast({
                    status: 'error',
                    title: 'Something goes wrong',
                    description: err?.message ? err.message : err,
                });
            }
        },
        [_login, _signup, handleSignin, toast],
    );

    return (
        <Container title="Login" type="auth">
            <Heading>Signup</Heading>
            <Flex
                w="full"
                p="4"
                bgColor="gray.200"
                borderRadius="lg"
                boxShadow="xl"
                direction="column"
                gridGap="4"
                as="form"
                onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    name="name"
                    label="Name"
                    error={errors.name}
                    type="text"
                    {...register('name')}
                />
                <FormInput
                    name="email"
                    label="E-mail"
                    error={errors.email}
                    type="email"
                    autoComplete="email"
                    {...register('email')}
                />
                <FormInput
                    name="password"
                    label="Password"
                    error={errors.password}
                    type="password"
                    autoComplete="current-password"
                    {...register('password')}
                />
                <Button
                    type="submit"
                    variant="form-submit"
                    size="lg"
                    isLoading={isSubmitting}>
                    <Text>Entrar</Text>
                </Button>
            </Flex>
            <Link to="/login">
                <Text fontSize="xl">Login</Text>
            </Link>
        </Container>
    );
};
