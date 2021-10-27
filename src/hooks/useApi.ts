import { useCallback, useEffect } from 'react';
import useSession from './useSession';
import { sessionServices } from '../services/session';
import api from '../services/api';

export default (): void => {
    const { session, handleSignin, handleSignout } = useSession();

    const { _refreshAuth } = sessionServices();

    const handleStartInterceptors = useCallback(() => {
        api.interceptors.response.use(
            async (res) => res,
            async (err) => {
                const { response, config } = err;

                if (
                    response?.status === 401 &&
                    config.url !== 'session/refresh-token'
                ) {
                    if (session?.access_token) {
                        if (!config._retry) {
                            config._retry = true;

                            const res = await _refreshAuth(
                                session.access_token,
                            );

                            handleSignin(res);

                            return api(config);
                        }
                    } else {
                        handleSignout();
                    }
                }

                return Promise.reject(err);
            },
        );
    }, [session?.access_token, _refreshAuth, handleSignin, handleSignout]);

    useEffect(() => {
        handleStartInterceptors();
    }, [handleStartInterceptors]);
};
