import { LoginFormData } from '../../interfaces/auth';
import { SessionData } from '../../interfaces/session';
import { serviceErrorHandler } from '../../utils/helpers';
import api from '../api';

interface sessionServicesData {
    _login(data: LoginFormData): Promise<SessionData>;
    _getCurrent(): Promise<SessionData>;
    _refreshAuth(refresh_token: string): Promise<SessionData>;
}

const _login = async (values: LoginFormData): Promise<SessionData> => {
    try {
        const { data } = await api.post<SessionData>('login', values);

        return data;
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _getCurrent = async (): Promise<SessionData> => {
    try {
        const access_token = localStorage.getItem('tnrb.access_token');

        const { data: user } = await api.get<SessionData['user']>(
            'me',
            {
                headers: { Authorization: `Bearer ${access_token}` },
            },
        );

        const obj: SessionData = {
            user,
            access_token,
        };

        return obj;
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _refreshAuth = async (refresh_token: string): Promise<SessionData> => {
    try {
        const { data } = await api.get('session/refresh-token', {
            headers: { authorization: `Bearer ${refresh_token}` },
        });

        return data;
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

export const sessionServices = (): sessionServicesData => ({
    _login,
    _getCurrent,
    _refreshAuth,
});
