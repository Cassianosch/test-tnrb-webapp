import React, { useState } from 'react';
import { Container } from '../../../../components/Layout';

export const IncomePage = (): JSX.Element => {
    const [editing, setEditing] = useState();

    return (
        <Container title="Income" type="app">
            income
        </Container>
    );
};
