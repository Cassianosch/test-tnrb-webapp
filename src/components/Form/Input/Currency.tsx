import { forwardRef, ForwardRefRenderFunction, useMemo } from 'react';
import {
    Input,
    FormControl,
    FormLabel,
    InputProps,
    FormErrorMessage,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';
import InputCurrency from 'react-number-format';

interface FormInputProps extends InputProps {
    name: string;
    label?: string;
    error?: FieldError;
}

const InputCurrencyBase: ForwardRefRenderFunction<
    HTMLInputElement,
    FormInputProps
> = (props, ref) => {
    const { name, label, error = null, ...rest } = props;

    const commonInputProps = useMemo(
        () => ({
            id: name,
            name,
            variant: 'filled',
            borderColor: 'tnrb.variants.inputBorderGrey',
            focusBorderColor: 'tnrb.variants.grey',
            bgColor: 'white',
            height: '42px',
            fontWeight: 'light',
            fontSize: '0.875rem',
            'data-testid': `form-input-${name}`,
            borderWidth: 1,
            _hover: {
                bgColor: 'white',
                borderColor: 'tnrb.variants.grey',
            },
            _focus: {
                bgColor: 'white',
                borderColor: 'tnrb.variants.grey',
            },
        }),
        [name],
    );

    return (
        <FormControl isInvalid={!!error} data-testid="form-control-input">
            {!!label && (
                <FormLabel htmlFor={name} fontSize="sm" fontWeight="normal">
                    {label}
                </FormLabel>
            )}
            <Input
                as={InputCurrency}
                placeholder="$ 0,00"
                prefix="$ "
                decimalScale={2}
                fixedDecimalScale
                thousandSeparator="."
                decimalSeparator=","
                {...commonInputProps}
                ref={ref}
                {...rest}
            />
            {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
    );
};

export const FormInputCurrency = forwardRef(InputCurrencyBase);
