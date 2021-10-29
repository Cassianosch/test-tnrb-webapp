import React from 'react';
import { Box, Flex, FlexProps, useDisclosure } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface ContainerProps extends FlexProps {
    title: string;
    type: 'auth' | 'app';
    children: React.ReactNode;
}

export const Container = (props: ContainerProps): JSX.Element => {
    const { title, type, children, ...rest } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Helmet>
                <title>{title} | TNRB Bank System</title>
            </Helmet>
            {type === 'auth' ? (
                <Flex
                    w={{
                        base: '90%',
                        sm: '50%',
                        md: '35%',
                        xl: '27.5%',
                        '2xl': '20%',
                    }}
                    mx="auto"
                    h="100vh"
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    gridGap="4"
                    transition="width 0.5s ease"
                    {...rest}>
                    {children}
                </Flex>
            ) : (
                <Flex
                    w="full"
                    minH="100vh"
                    direction="column"
                    bgColor="tnrb.variants.lightGrey">
                    <Header onOpen={onOpen} />
                    <Flex
                        direction="row"
                        alignItems="flex-start"
                        gridColumnGap="4">
                        <Sidebar isOpen={isOpen} onClose={onClose} />
                        <Box w="full" ml={{ xl: '320px' }}>
                            <Flex
                                maxW="container.xl"
                                mx="auto"
                                p="8"
                                direction="column"
                                gridGap="4"
                                {...rest}>
                                {children}
                            </Flex>
                        </Box>
                    </Flex>
                </Flex>
            )}
        </>
    );
};
