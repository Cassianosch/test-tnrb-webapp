import React, { useCallback } from 'react';
import { Button, Flex, Heading, Text, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginFormData } from '../../../interfaces/auth';
import { FormInput } from '../../../components/Form/Input';
import { Container } from '../../../components/Layout';
import { sessionServices } from '../../../services/session';
import useSession from '../../../hooks/useSession';

const loginFormSchema: yup.SchemaOf<LoginFormData> = yup.object().shape({
    email: yup
        .string()
        .required('E-mail obrigatório')
        .email('Deve ser um e-mail válido'),
    password: yup.string().required('Senha obrigatória'),
});

export const LoginPage = (): JSX.Element => {
    const toast = useToast();

    const { handleSignin } = useSession();

    const { _login } = sessionServices();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginFormSchema),
    });

    const onSubmit = useCallback<SubmitHandler<LoginFormData>>(
        async (data) => {
            try {
                const session = await _login(data);
                handleSignin(session);
            } catch (err) {
                toast({
                    status: 'error',
                    title: 'Algo deu errado',
                    description: err?.message ? err.message : err,
                });
            }
        },
        [_login, handleSignin, toast],
    );

    return (
        <Container title="Login" type="auth">
            <Heading>Login</Heading>
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
                    name="email"
                    label="E-mail"
                    error={errors.email}
                    type="email"
                    autoComplete="email"
                    {...register('email')}
                />
                <FormInput
                    name="password"
                    label="Senha"
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
            <Link to="/signup">
                <Text fontSize="xl">Signup</Text>
            </Link>
        </Container>
    );
};
