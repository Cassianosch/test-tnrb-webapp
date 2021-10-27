import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Icon,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import useSession from '../../../hooks/useSession';
import { sidebarMenusCustomer, sidebarMenusAdmin } from './data';

interface SidebarProps {
    isOpen: boolean;
    onClose(): void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps): JSX.Element => {
    const [menu, setMenu] = useState([]);

    const { pathname } = useLocation();
    const { session } = useSession();

    const isMobile = useBreakpointValue({
        base: true,
        xs: true,
        xl: false,
    });

    useEffect(() => {
        if (session && session.user.admin === 1) {
            setMenu(sidebarMenusAdmin);
        } else {
            setMenu(sidebarMenusCustomer);
        }
    }, [session]);

    const Menus = useCallback(
        () => (
            <Flex direction="column" bgColor="white" borderWidth="0">
                {menu && menu.map((elMenu) => {
                    const isActive = pathname === elMenu.to;

                    return (
                        <Link key={`/menu-${elMenu.id}`} to={elMenu.to}>
                            <Flex
                                alignItems="center"
                                gridColumnGap="4"
                                px="4"
                                py="4"
                                color={
                                    isActive
                                        ? 'tnrb.variants.darkGrey'
                                        : 'tnrb.variants.grey'
                                }
                                borderLeft={isActive && '4px solid'}
                                borderLeftColor="tnrb.primary.500"
                                boxShadow={
                                    isActive &&
                                    'inset 19px 0 30px -22px #25a4ac'
                                }
                                _hover={{
                                    color: 'tnrb.variants.darkGrey',
                                }}>
                                <Icon
                                    as={elMenu.icon}
                                    w="6"
                                    h="6"
                                    fill={
                                        isActive
                                            ? 'tnrb.primary.500'
                                            : 'tnrb.variants.iconGrey'
                                    }
                                />
                                <Text
                                    fontSize="xs"
                                    textTransform="uppercase"
                                    fontWeight="bold">
                                    {elMenu.label}
                                </Text>
                            </Flex>
                        </Link>
                    );
                })}
            </Flex>
        ),
        [menu, pathname],
    );

    if (isMobile) {
        return (
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                placement="left"
                size="xs">
                {isMobile && <DrawerOverlay />}
                <DrawerContent>
                    {isMobile && <DrawerCloseButton />}
                    <DrawerBody p="0">
                        <Menus />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Flex
            direction="column"
            w="320px"
            bgColor="white"
            position="fixed"
            top="0"
            height="100vh"
            boxShadow="lg"
            borderWidth="0">
            <Menus />
        </Flex>
    );
};
