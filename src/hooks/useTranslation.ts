import { useCallback, useEffect, useState } from 'react';

type TranslationType = Record<string, string>;

interface useTranslationHookData {
    translate(key: string): string;
}

export default (): useTranslationHookData => {
    const [translations, setTranslations] = useState<TranslationType[]>([]);

    const handleInitialize = useCallback(async () => {
        const res = await fetch('./translations/main.json', {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            cache: 'force-cache',
        });

        const data = await res.json();

        setTranslations(data);
    }, []);

    useEffect(() => {
        handleInitialize();
    }, [handleInitialize]);

    const translate = useCallback(
        (key: string): string => {
            if (key in translations) return translations[key].toUpperCase();

            return key.toUpperCase();
        },
        [translations],
    );

    return { translate };
};
