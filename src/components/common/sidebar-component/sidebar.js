import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import logo from '../../../assets/images/logo.png';
import logo_compact from '../../../assets/images/logo/compact-logo.png';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router";

import UserPanel from './userPanel';
import { MENUITEMS } from '../../../constant/userMenu';
import { Link } from 'react-router-dom';
import { translate } from 'react-switch-lang';

function useWindowSize(wrapper) {
    const [size, setSize] = useState([0, 0]);

    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    if (wrapper === "horizontal_sidebar") {
        if (size[0] > 100 && size[0] < 991) {
            document.querySelector(".page-wrapper").className = 'page-wrapper default';
            document.querySelector(".page-body-wrapper").className = 'page-body-wrapper default';
        } else {
            document.querySelector(".page-wrapper").className = 'page-wrapper horizontal_sidebar';
            document.querySelector(".page-body-wrapper").className = 'page-body-wrapper horizontal_sidebar';
        }

    }

    return size;
}

const Sidebar = (props) => {
    const [margin, setMargin] = useState(0);
    const [hideRightArrow, setHideRightArrow] = useState(false);
    const [hideLeftArrow, setHideLeftArrow] = useState(true);
    const [mainmenu, setMainMenu] = useState(MENUITEMS);
    const [hideLeftArrowRTL, setHideLeftArrowRTL] = useState(false);
    const [hideRightArrowRTL, setHideRightArrowRTL] = useState(true);
    const configDB = useSelector(content => content.Customizer.sidebar_types);
    const layout = useSelector(content => content.Customizer.layout);
    const [width, height] = useWindowSize(configDB.wrapper);
    let location = useLocation();

    useEffect(() => {
        const currentUrl = location.pathname;
        mainmenu.filter(items => {
            if (items.path === currentUrl)
                setNavActive(items)
            if (!items.children) return false
            items.children.filter(subItems => {
                if (subItems.path === currentUrl)
                    setNavActive(subItems)
                if (!subItems.children) return false
                subItems.children.filter(subSubItems => {
                    if (subSubItems.path === currentUrl)
                        setNavActive(subSubItems)
                })
            })
        })
    }, []);

    // Click menu active
    const setNavActive = (item) => {
        MENUITEMS.filter(menuItem => {
            if (menuItem != item)
                menuItem.active = false
            if (menuItem.children && menuItem.children.includes(item))
                menuItem.active = true
            if (menuItem.children) {
                menuItem.children.filter(submenuItems => {
                    if (submenuItems.children && submenuItems.children.includes(item)) {
                        menuItem.active = true
                        submenuItems.active = true
                    }
                })
            }
        })
        item.active = !item.active
        setMainMenu({ mainmenu: MENUITEMS })

    }

    // Click Toggle menu
    const toggletNavActive = (item) => {
        if (!item.active) {
            MENUITEMS.forEach(a => {
                if (MENUITEMS.includes(item))
                    a.active = false
                if (!a.children) return false
                a.children.forEach(b => {
                    if (a.children.includes(item)) {
                        b.active = false
                    }
                    if (!b.children) return false
                    b.children.forEach(c => {
                        if (b.children.includes(item)) {
                            c.active = false
                        }
                    })
                })
            });
        }
        item.active = !item.active
        setMainMenu({ mainmenu: MENUITEMS })
    }

    const scrollToRight = () => {
        const elmnt = document.getElementById("myDIV");
        const menuWidth = elmnt.offsetWidth;
        const temp = menuWidth + margin
        // Checking condition for remaing margin 
        if (temp < menuWidth) {
            setMargin(-temp);
            setHideRightArrow(true);
        }
        else {
            setMargin(margin => margin += -width);
            setHideLeftArrow(false);
        }

    }

    const scrollToLeft = () => {
        // If Margin is reach between screen resolution
        if (margin >= -width) {
            setMargin(0)
            setHideLeftArrow(true);
        }
        else {
            setMargin(margin => margin += width);
            setHideRightArrow(false);
        }
    }

    const scrollToLeftRTL = () => {
        if (margin <= -width) {
            setMargin(margin => margin += -width);
            setHideLeftArrowRTL(true);
        }
        else {
            setMargin(margin => margin += -width);
            setHideRightArrowRTL(false);
        }
    }

    const scrollToRightRTL = () => {
        const temp = width + margin
        // Checking condition for remaing margin
        if (temp === 0) {
            setMargin(temp);
            setHideRightArrowRTL(true);
        }
        else {
            setMargin(margin => margin += width);
            setHideRightArrowRTL(false);
            setHideLeftArrowRTL(false);
        }
    }

    return (
        <Fragment>
            <div className="page-sidebar">
                <div className="main-header-left d-none d-lg-block">
                    <div className="logo-wrapper compactLogo">
                        <Link to={`${process.env.PUBLIC_URL}/dashboard/default`}>
                            <img className="blur-up lazyloaded" src={logo_compact} alt="" />
                            <img className="blur-up lazyloaded" src={logo} alt="" />
                        </Link>
                    </div>
                </div>
                <div className="sidebar custom-scrollbar">
                    <UserPanel />
                    <ul
                        className="sidebar-menu"
                        id="myDIV"
                        style={configDB.wrapper === 'horizontal_sidebar' ? layout === 'rtl' ?
                            { 'marginRight': margin + 'px' } : { 'marginLeft': margin + 'px' } : { margin: '0px' }}
                    >
                        <li className={`left-arrow ${layout == 'rtl' ? hideLeftArrowRTL ? 'd-none' : 'hideLeftArrowRTL' : hideLeftArrow ? 'd-none' : 'hideLeftArrow'}`}
                            onClick={(configDB.wrapper === 'horizontal_sidebar' && layout === 'rtl') ? scrollToLeftRTL : scrollToLeft}><i className="fa fa-angle-left"></i></li>
                        {
                            MENUITEMS.map((menuItem, i) =>
                                <li className={`${menuItem.active ? 'active' : ''}`} key={i}>
                                    {(menuItem.sidebartitle) ?
                                        <div className="sidebar-title">{menuItem.sidebartitle}</div>
                                        : ''}
                                    {(menuItem.type === 'sub') ?
                                        <a className="sidebar-header" href="#javascript" onClick={() => toggletNavActive(menuItem)}>
                                            <menuItem.icon />
                                            <span>{props.t(menuItem.title)}</span>
                                            <i className="fa fa-angle-right pull-right"></i>
                                        </a>
                                        : ''}
                                    {(menuItem.type === 'link') ?
                                        <Link
                                            // to={`${process.env.PUBLIC_URL}${menuItem.path}`}
                                            className={`sidebar-header ${menuItem.active ? 'active' : ''}`}

                                            onClick={() => toggletNavActive(menuItem)}
                                        >
                                            <menuItem.icon /><span>{props.t(menuItem.title)}</span>
                                            {menuItem.children ?
                                                <i className="fa fa-angle-right pull-right"></i> : ''}
                                        </Link>
                                        : ''}
                                    {menuItem.children ?
                                        <ul
                                            className={`sidebar-submenu ${menuItem.active ? 'menu-open' : ''}`}
                                            style={menuItem.active ? { opacity: 1, transition: 'opacity 500ms ease-in' } : {}}
                                        >
                                            {menuItem.children.map((childrenItem, index) =>
                                                <li key={index} className={childrenItem.children ? childrenItem.active ? 'active' : '' : ''}>
                                                    {(childrenItem.type === 'sub') ?
                                                        <a href="#javascript" onClick={() => toggletNavActive(childrenItem)} >
                                                            <i className="fa fa-circle"></i>{props.t(childrenItem.title)} <i className="fa fa-angle-right pull-right"></i></a>
                                                        : ''}

                                                    {(childrenItem.type === 'link') ?
                                                        <Link
                                                            to={`${process.env.PUBLIC_URL}${childrenItem.path}`}
                                                            className={childrenItem.active ? 'active' : ''}
                                                            onClick={() => toggletNavActive(childrenItem)}
                                                        >
                                                            <i className="fa fa-circle"></i>{props.t(childrenItem.title)} </Link>
                                                        : ''}
                                                    {childrenItem.children ?
                                                        <ul className={`sidebar-submenu ${childrenItem.active ? 'menu-open' : 'active'}`}>
                                                            {childrenItem.children.map((childrenSubItem, key) =>
                                                                <li className={childrenSubItem.active ? 'active' : ''} key={key}>
                                                                    {(childrenSubItem.type === 'link') ?
                                                                        <Link
                                                                            to={`${process.env.PUBLIC_URL}${childrenSubItem.path}`}
                                                                            className={childrenSubItem.active ? 'active' : ''}
                                                                            onClick={() => toggletNavActive(childrenSubItem)}
                                                                        >
                                                                            <i className="fa fa-circle"></i>{props.t(childrenSubItem.title)}</Link>
                                                                        : ''}
                                                                    
                                                                    {/* Customs Start */}
                                                                    {(childrenSubItem.type === 'sub') ?
                                                                    <a href="#javascript" onClick={() => toggletNavActive(childrenSubItem)} >
                                                                        <i className="fa fa-circle"></i>{props.t(childrenSubItem.title)} <i className="fa fa-angle-right pull-right"></i></a>
                                                                    : ''}

                                                                    {childrenSubItem.children ?
                                                                        <ul
                                                                            className={`sidebar-submenu ${childrenSubItem.active ? 'menu-open' : ''}`}
                                                                            style={childrenSubItem.active ? { opacity: 1, transition: 'opacity 500ms ease-in' } : {}}
                                                                        >
                                                                            {childrenSubItem.children.map((childrenMiniSubItem, key) =>
                                                                                <li className={childrenMiniSubItem.active ? 'active' : ''} key={key}>
                                                                                    {(childrenMiniSubItem.type === 'link') ?
                                                                                        <Link
                                                                                            to={`${process.env.PUBLIC_URL}${childrenMiniSubItem.path}`}
                                                                                            className={childrenMiniSubItem.active ? 'active' : ''}
                                                                                            onClick={() => toggletNavActive(childrenMiniSubItem)}
                                                                                        >
                                                                                        <i className="fa fa-circle"></i>{props.t(childrenMiniSubItem.title)}</Link>
                                                                                    : ''}
                                                                                </li>
                                                                            )}
                                                                        </ul>
                                                                    : ''}
                                                                    {/* Customs End */}
                                                                    
                                                                </li>
                                                            )}
                                                        </ul>
                                                        : ''}
                                                </li>
                                            )}
                                        </ul>
                                        : ''}
                                </li>
                            )
                        }
                        <li className={`right-arrow ${layout == 'rtl' ? hideRightArrowRTL ? 'd-none' : 'hideRightArrowRTL' : hideRightArrow ? 'd-none' : 'hideRightArrow'}`}
                            onClick={(configDB.wrapper == 'horizontal_sidebar' && layout == 'rtl') ? scrollToRightRTL : scrollToRight}><i className="fa fa-angle-right"></i></li>
                    </ul>
                </div>
            </div>
        </Fragment>
    );
};

export default translate(Sidebar);

