import { forwardRef, ForwardRefRenderFunction, useMemo } from 'react';
import {
    Input,
    FormControl,
    FormLabel,
    InputProps,
    FormErrorMessage,
    InputGroup,
    InputRightAddon,
    InputLeftAddon,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

interface FormInputProps extends InputProps {
    name: string;
    label?: string;
    error?: FieldError;
    leftContent?: string;
    rightContent?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, FormInputProps> = (
    { name, label, error = null, leftContent, rightContent, ...rest },
    ref,
) => {
    const commonInputProps = useMemo(
        () => ({
            id: name,
            name,
            variant: 'filled',
            borderColor: 'tnrb.variants.inputBorderGrey',
            focusBorderColor: 'tnrb.variants.grey',
            bgColor: 'white',
            _hover: {
                bgColor: 'white',
                borderColor: 'tnrb.variants.grey',
            },
            _focus: {
                bgColor: 'white',
                borderColor: 'tnrb.variants.grey',
            },
            height: '42px',
            fontWeight: 'light',
            fontSize: '0.875rem',
            ref,
            'data-testid': `form-input-${name}`,
            borderWidth: 1,
        }),
        [name, ref],
    );

    return (
        <FormControl isInvalid={!!error} data-testid="form-control-input">
            {!!label && (
                <FormLabel
                    htmlFor={name}
                    fontWeight="normal"
                    fontSize="0.875rem">
                    {label}
                </FormLabel>
            )}
            <InputGroup size="lg">
                {leftContent && (
                    <InputLeftAddon height="42px" fontSize="sm">
                        {leftContent}
                    </InputLeftAddon>
                )}
                <Input {...commonInputProps} {...rest} height="42px" />
                {rightContent && (
                    <InputRightAddon height="42px" fontSize="sm">
                        {rightContent}
                    </InputRightAddon>
                )}
            </InputGroup>
            {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
    );
};

export const FormInput = forwardRef(InputBase);
