import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { SessionData } from '../interfaces/session';
import api from '../services/api';
import { sessionServices } from '../services/session';
import { sessionState } from '../store/session';

interface useSessionHookData {
    session: SessionData | null;
    handleSignin(data: SessionData): void;
    handleSignout(): void;
    handleCheckLogged(): void;
}

export default (): useSessionHookData => {
    const [session, setSession] = useRecoilState(sessionState);

    const { _getCurrent } = sessionServices();

    const handleSignin = useCallback(
        (data: SessionData) => {
            setSession(data);

            localStorage.setItem('tnrb.access_token', data.access_token);

            api.defaults.headers.authorization = `Bearer ${data.access_token}`;
        },
        [setSession],
    );

    const handleSignout = useCallback(() => {
        setSession(null);

        localStorage.removeItem('tnrb.access_token');
    }, [setSession]);

    const handleCheckLogged = useCallback(async () => {
        if (localStorage.getItem('tnrb.access_token')) {
            const data = await _getCurrent();

            handleSignin(data);
        }
    }, [_getCurrent, handleSignin]);

    return {
        session,
        handleSignin,
        handleSignout,
        handleCheckLogged,
    };
};
