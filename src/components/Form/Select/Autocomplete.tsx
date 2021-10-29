import { useMemo } from 'react';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import {
    CUIAutoComplete as AutoComplete,
    CUIAutoCompleteProps,
    Item,
} from 'chakra-ui-autocomplete';
import { FieldError } from 'react-hook-form';

export interface OptionsData {
    value: string | number;
    label: string;
}

interface FormAutoCompleteProps<T extends Item>
    extends CUIAutoCompleteProps<T> {
    name: string;
    error?: FieldError;
}

export const FormAutoComplete = ({
    name,
    error = null,
    ...rest
}: FormAutoCompleteProps<Item>) => {
    const commonInputProps = useMemo(
        () => ({
            id: name,
            name,
            'data-testid': `form-input-${name}`,
            labelStyleProps: {
                fontWeight: 'normal',
                fontSize: '0.875rem',
                marginBottom: '-2',
            },
            inputStyleProps: {
                mt: '0',
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
                borderWidth: 1,
            },
            tagStyleProps: {
                display: 'none',
            },
        }),
        [name],
    );

    return (
        <FormControl isInvalid={!!error} data-testid="form-control-input">
            {/* {!!label && (
                    <FormLabel
                        htmlFor={name}
                        fontWeight="normal"
                        fontSize="0.875rem">
                        {label}
                    </FormLabel>
                )} */}
            <AutoComplete {...commonInputProps} {...rest} />
            {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
    );
};
