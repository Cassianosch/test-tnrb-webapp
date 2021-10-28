import React, { useState } from 'react';
import { Container } from '../../../../components/Layout';

export const ProfilePage = (): JSX.Element => {
    const [editing, setEditing] = useState();

    return (
        <Container title="Profile" type="app">
            profile
        </Container>
    );
};
