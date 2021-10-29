import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

interface useCustomToastHookData {
    showErrorToast(err: string): void;
    showSuccessToast(msg: string): void;
}

export default (): useCustomToastHookData => {
    const toast = useToast();

    const showErrorToast = useCallback(
        (err: string) => {
            toast({
                status: 'error',
                title: 'Something went wront',
                description: err,
                isClosable: true,
            });
        },
        [toast],
    );

    const showSuccessToast = useCallback(
        (msg: string) => {
            toast({
                status: 'success',
                title: 'Success',
                description: msg,
                isClosable: true,
            });
        },
        [toast],
    );

    return {
        showErrorToast,
        showSuccessToast,
    };
};
