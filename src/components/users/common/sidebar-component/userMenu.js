import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';

import {
    Home,
    Box,
    DollarSign,
    UserPlus,
    Users,
    Chrome,
    Settings,
    Airplay,
    Slack,
    FolderPlus,
    File,
    Command, Cloud, Book, FileText, Server, Image, Sliders, Map, GitPullRequest, Calendar, Edit, Mail, MessageSquare, UserCheck, Layers, HelpCircle, Database, Headphones, Mic, ShoppingBag, Search, AlertOctagon, Lock, Briefcase, BarChart, Star
} from 'react-feather';


export const MENUITEMS = [
    {
        title: 'Welcome', icon: Home, type: 'link', path: '/welcome', active: false
    },
    {
        title: 'Service Category', icon: Box, type: 'link', path: '/service-category/list', active: false
    },
    {
        title: 'Employee', icon: Box, type: 'link', path: '/user-employee/list', active: false
    },
    {
        title: 'Layouts', icon: Box, type: 'link', path: '/layouts/add', active: false
    },
    {
        title: 'Base Receive', icon: Box, type: 'link', path: '/base-receive/add', active: false
    },
    {
        title: 'Base Order', icon: Box, type: 'link', path: '/base-order/add', active: false
    },
    {
        title: 'Chain', icon: Box, type: 'link', path: '/chain/list', active: false
    },
    // {
    //     title: 'Configuration', icon: FileText, type: 'sub', active: false, children: [
    //         {
    //             title: 'Admin Panel', type: 'sub', children: [
    //                 { title: 'Menu', type: 'link', path: '/admin/menu/list' },
    //                 { title: 'Internal Link', type: 'link', path: '/admin/internalLink/list' },
    //                 { title: 'Menu Shorting', type: 'link', path: '/admin/menu-shorting/list' },
    //             ]
    //         }
            
    //     ]
    // },
    {
        title: 'Back Office Setup', icon: Settings, type: 'sub', active: false, children: [
            { type: 'link', icon: Slack, path: '/company-profile', title: 'Company Profile' },
            { type: 'link', icon: Slack, path: '/user-designation/list', title: 'Designaiton' },
            { type: 'link', icon: Slack, path: '/user-department/list', title: 'Department' },
        ]
    },
]
