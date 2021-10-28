import React, { useState } from 'react';
import { Container } from '../../../../components/Layout';

export const SettingPage = (): JSX.Element => {
    const [editing, setEditing] = useState();

    return (
        <Container title="Setting" type="app">
            Setting
        </Container>
    );
};
