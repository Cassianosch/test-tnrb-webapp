import { useCallback, useEffect } from 'react';
import useSession from './useSession';
import api from '../services/api';

export default (): void => {
    const { handleSignout } = useSession();

    const handleStartInterceptors = useCallback(() => {
        api.interceptors.response.use(
            async (res) => res,
            async (err) => {
                const { response, config } = err;

                if (
                    response?.status === 401 &&
                    config.url !== 'session/refresh-token'
                ) {
                    handleSignout();
                }

                return Promise.reject(err);
            },
        );
    }, [handleSignout]);

    useEffect(() => {
        handleStartInterceptors();
    }, [handleStartInterceptors]);
};
