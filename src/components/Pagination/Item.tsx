import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

interface PaginationItemProps {
    number: number;
    isCurrent?: boolean;
    handleChangePage(): void;
}

export const PaginationItem = (props: PaginationItemProps): JSX.Element => {
    const { number, isCurrent = false, handleChangePage, ...rest } = props;

    const buttonProps: ButtonProps = {
        isDisabled: isCurrent,
        bg: 'tnrb.primary.300',
        _disabled: isCurrent && {
            bg: 'tnrb.primary.500',
            cursor: 'default',
        },
        _hover: !isCurrent && {
            bg: 'tnrb.primary.700',
        },
    };

    return (
        <Button
            size="sm"
            fontSize="xs"
            width="4"
            onClick={handleChangePage}
            {...buttonProps}
            {...rest}>
            {number}
        </Button>
    );
};
