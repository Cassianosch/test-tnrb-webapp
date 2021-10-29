import React from 'react';
import { Image, ImageProps } from '@chakra-ui/react';
import logoSource from '../../../assets/images/ic-logo.png';

export const Logo = (props: ImageProps): JSX.Element => (
    <Image
        src={logoSource}
        alt="logo"
        w={{ xs: '12', sm: '16' }}
        h={{ xs: '16', sm: '20' }}
        transition="all 0.4s ease"
        opacity=".4"
        filter="drop-shadow(1px 1px 0.25px #000000)"
        {...props}
    />
);
