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
        id: 2,
        to: '/income/accepted',
        label: 'Incomes',
        icon: GoArrowDown,
    },
    {
        id: 3,
        to: '/outcome',
        label: 'Expenses',
        icon: GoArrowUp,
    },
    {
        id: 4,
        to: '/income/pending',
        label: 'Checks',
        icon: GoGithubAction,
    },
    {
        id: 5,
        to: '/notification',
        label: 'Notifications',
        icon: GoBell,
    },
    {
        id: 6,
        to: '/profile',
        label: 'Profile',
        icon: GoPerson,
    },
    {
        id: 7,
        to: '/setting',
        label: 'Settings',
        icon: GoGear,
    },
    {
        id: 8,
        to: '/help',
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
