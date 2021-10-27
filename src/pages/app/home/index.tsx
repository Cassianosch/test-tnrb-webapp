import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import { Container } from '../../../components/Layout';
import { Logo } from '../../../components/Layout/Logo';

export const HomePage = (): JSX.Element => (
    <Container title="Home" type="app">
        <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            my="16"
            gridGap="8">
            <Logo
                w="40"
                h="80"
                filter="drop-shadow(2px 2px 1px #000)"
                ml="-72px"
            />
            <Heading style={{ fontVariant: 'small-caps' }}>TNRB - Bank System</Heading>
        </Flex>
    </Container>
);
