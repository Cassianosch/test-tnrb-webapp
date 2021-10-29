import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';
import NotFoundSvg from '../../assets/svg/not-found.svg';

export const EmptyComponent = (): JSX.Element => (
    <Flex
        w="full"
        direction="column"
        alignItems="center"
        justifyContent="center"
        minH="64">
        <Image
            src={NotFoundSvg}
            alt="not-found"
            width="96px"
            height="96px"
            fill="#91908F"
        />
        <Text color="#91908F" fontSize="xl" mt="-4">
            Nenhum registro encontrado
        </Text>
    </Flex>
);
