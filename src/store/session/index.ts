import { atom } from 'recoil';
import { SessionData } from '../../interfaces/session';

export const sessionState = atom<SessionData | null>({
    key: 'sessionState',
    default: null,
});
