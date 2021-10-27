import * as React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import { Router } from './router';
import theme from './styles/theme';

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <RecoilRoot>
                <Router />
            </RecoilRoot>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
