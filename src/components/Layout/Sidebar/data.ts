import { IconType } from 'react-icons/lib';
import {
    GoHome,
    GoPerson,
    GoArrowUp,
    GoArrowDown,
    GoGithubAction,
    GoBell,
    GoGear,
    GoInbox
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
        icon: GoInbox,
    },
    // {
    //     id: 1,
    //     to: '/balance',
    //     label: 'Balance',
    //     icon: GoArrowDown,
    // },
    // {
    //     id: 2,
    //     to: '/coupons-plan',
    //     label: 'Expenses',
    //     icon: GoArrowUp,
    // },
    // {
    //     id: 3,
    //     to: '/customers',
    //     label: 'Checks',
    //     icon: GoGithubAction,
    // },
    // {
    //     id: 4,
    //     to: '/announcers',
    //     label: 'Notifications',
    //     icon: GoBell,
    // },
    // {
    //     id: 5,
    //     to: '/announcements',
    //     label: 'Profile',
    //     icon: GoPerson,
    // },
    // {
    //     id: 6,
    //     to: '/masters',
    //     label: 'Settings',
    //     icon: GoGear,
    // },
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
    // {
    //     id: 2,
    //     to: '/profile',
    //     label: 'Profile',
    //     icon: GoPerson,
    // },
    // {
    //     id: 3,
    //     to: '/masters',
    //     label: 'Settings',
    //     icon: GoGear,
    // },
];
