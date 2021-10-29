import { forwardRef, ForwardRefRenderFunction, useMemo } from 'react';
import {
    Input,
    FormControl,
    FormLabel,
    InputProps,
    FormErrorMessage,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';
import InputMask from 'react-input-mask';

interface FormInputProps extends InputProps {
    name: string;
    label?: string;
    error?: FieldError;
    mask: string | RegExp | RegExp[];
    maskChar: string | null;
}

const InputMaskBase: ForwardRefRenderFunction<
    HTMLInputElement,
    FormInputProps
> = ({ name, label, error = null, mask, maskChar, ...rest }, ref) => {
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
                <FormLabel htmlFor={name} fontSize="sm" fontWeight="normal">
                    {label}
                </FormLabel>
            )}
            <Input
                as={InputMask}
                mask={mask}
                maskChar={maskChar}
                {...commonInputProps}
                {...rest}
            />
            {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
    );
};

export const FormInputMask = forwardRef(InputMaskBase);
