import {
    Home,
    Settings,
    Slack,
} from 'react-feather';


export const MENUITEMS = [
    {
        title: 'Welcome', icon: Home, type: 'link', path: '/admin/welcome', active: false
    },
    {
        title: 'Back Office Setup', icon: Settings, type: 'sub', active: false, children: [
            { type: 'link', icon: Slack, path: '/user/company-profile', title: 'Company Profile' },
        ]
    },
]
