import {
    Home,
    UserPlus,
    Users,
    Settings,
    Slack,
    FolderPlus,  
    Star
} from 'react-feather';

export const MENUITEMS = [
    {
        title: 'Welcome', icon: Home, type: 'link', path: '/welcome', active: false
    },
    {
        title: 'Project Registration', icon: Star, type: 'link', path: '/projectRegister/list', active: false
    },
    {
        title: 'Admin', icon: Users, type: 'link', path: '/softAdmin/list', active: false
    },
    {
        title: 'Users', icon: UserPlus, type: 'link', path: '/users/list', active: false
    },
    
    {
        title: 'Configuration', icon: FolderPlus, type: 'sub', active: false, children: [
            {
                title: 'Admin Panel', type: 'sub', children: [
                    { title: 'Menu', type: 'link', path: '/menu/list' },
                    { title: 'Internal Link', type: 'link', path: '/internalLink/list' },
                    { title: 'Menu Shorting', type: 'link', path: '/menu-shorting/list' },
                ]
            },
            {
                title: 'Software', type: 'sub', children: [
                    { title: 'Module', type: 'link', path: '/softwareModule/list' },
                    {
                        title: 'Software Menu', type: 'sub', children: [
                            { title: 'Menu', type: 'link', path: '/softMenu/list' },
                            { title: 'Internal Link', type: 'link', path: '/softInternalLink/list' },
                            { title: 'Menu Sorting', type: 'link', path: '/softMenu/sorting' },
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: 'Back Office Setup', icon: Settings, type: 'sub', active: false, children: [
            { type: 'link', icon: Slack, path: '/designations/list', title: 'Designation' },
            { type: 'link', icon: Slack, path: '/polishing/add', title: 'Polishing' },
            { type: 'link', icon: Slack, path: '/jobagreement/add', title: 'JobAgreement' },
            { type: 'link', icon: Slack, path: '/designtofactory/add', title: 'DesignToFactory' },
            { type: 'link', icon: Star, path: '/grinding/List', title: 'Grinding' },
            { type: 'link', icon: Star, path: '/designToDesign/List', title: 'Design' },
            { type: 'link', icon: Star, path: '/department/List', title: 'department' },
        ]
    },
]
