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
                title: 'Algo deu errado',
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
                title: 'Sucesso',
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
