import { IconType } from 'react-icons/lib';
import {
    GoHome,
    GoLaw,
    GoPerson,
    GoArrowUp,
    GoArrowDown,
    GoGithubAction,
    GoBell,
    GoGear,
    GoBook,
} from 'react-icons/go';

export interface MenuData {
    id: number;
    to: string;
    label: string;
    icon: IconType;
}

export const sidebarMenusCustomer: MenuData[] = [
    {
        id: 0,
        to: '/',
        label: 'Home',
        icon: GoHome,
    },
    {
        id: 1,
        to: '/balance',
        label: 'Balance',
        icon: GoLaw,
    },
    {
        id: 1,
        to: '/inicomes',
        label: 'Incomes',
        icon: GoArrowDown,
    },
    {
        id: 2,
        to: '/expenses',
        label: 'Expenses',
        icon: GoArrowUp,
    },
    {
        id: 3,
        to: '/checks',
        label: 'Checks',
        icon: GoGithubAction,
    },
    {
        id: 4,
        to: '/notifications',
        label: 'Notifications',
        icon: GoBell,
    },
    {
        id: 5,
        to: '/profile',
        label: 'Profile',
        icon: GoPerson,
    },
    {
        id: 6,
        to: '/settings',
        label: 'Settings',
        icon: GoGear,
    },
    {
        id: 7,
        to: '/hepl',
        label: 'Help',
        icon: GoBook,
    },
];
export const sidebarMenusAdmin: MenuData[] = [
    {
        id: 0,
        to: '/',
        label: 'Home',
        icon: GoHome,
    },
    {
        id: 1,
        to: '/administration-checks',
        label: 'Manage Checks',
        icon: GoPerson,
    },
];
