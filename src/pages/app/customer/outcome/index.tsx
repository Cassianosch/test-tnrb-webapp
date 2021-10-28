import React, { useState } from 'react';
import { Container } from '../../../../components/Layout';

export const OutcomePage = (): JSX.Element => {
    const [editing, setEditing] = useState();

    return (
        <Container title="Expenses" type="app">
            expenses
        </Container>
    );
};
