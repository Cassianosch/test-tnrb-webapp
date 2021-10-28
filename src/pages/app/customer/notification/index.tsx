import React, { useState } from 'react';
import { Container } from '../../../../components/Layout';

export const NotificationPage = (): JSX.Element => {
    const [editing, setEditing] = useState();

    return (
        <Container title="Notification" type="app">
            notification
        </Container>
    );
};
