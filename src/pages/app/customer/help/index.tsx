import React, { useState } from 'react';
import { Container } from '../../../../components/Layout';

export const HelpPage = (): JSX.Element => {
    const [editing, setEditing] = useState();

    return (
        <Container title="Help" type="app">
            Help
        </Container>
    );
};
