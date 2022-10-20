/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { userGetMethod } from '../../../../api/userAction';
import { softWareMenus } from '../../../../api/userUrl';
// import "./reportDropdown.css";
import './report.css';
import {
    Home,
    ArrowRightCircle,
    ArrowRight
} from 'react-feather';
import { Link } from 'react-router-dom';

const Report = () => {

    const [MENUITEMS, setMENUITEMS] = useState([]);
    const [mainmenu, setMainMenu] = useState([]);
     const menuObject = [];

    useEffect(() => {
        let moduleId = localStorage.getItem('moduleId');
        // Start Dynamic Menu Processing
         const softWareMenusWithoutReport = 'api/user/software-report-menus' ;
        userGetMethod(`${softWareMenusWithoutReport}/${moduleId}`)
        .then(response => {
            
            response.data.software_menus.map((menu, i) => (
                (menu.parent_id == 0 && menu.route == "#") ? (
                    menuObject.push({
                        title: menu.menu_name,
                        icon : Home,
                        type : 'sub',
                        path : '/',
                        active: false,
                        children: 
                        response.data.software_menus.map((menu2, i) => (
                            (menu2.parent_id > 0) ? (
                                (menu2.parent_id == menu.id && menu2.route == "#") ? 
                                {
                                    title: menu2.menu_name,
                                    type : 'sub',
                                    active: false,
                                    children: response.data.software_menus.map((menu3, i) => (
                                        (menu3.parent_id == menu2.id) ?
                                        {
                                            title: menu3.menu_name,
                                            icon : ArrowRightCircle,
                                            type : 'link',
                                            path : '/'+menu3.route.replace(".", "/"),
                                            menuId: menu3.id,
                                            active: false,
                                        } : {}  
                                    ))
                                }
                                : 
                                (menu2.parent_id == menu.id) ?
                                (
                                    {
                                        title: menu2.menu_name,
                                        type : 'link',
                                        path : '/'+menu2.route.replace(".", "/"),
                                        menuId: menu2.id
                                    }
                                ) : {}
                            ) 
                            : {}
                        ))
                    })
                )
                : (menu.route != "#" && menu.parent_id == 0) ? (
                    menuObject.push({
                        title: menu.menu_name,
                        icon : ArrowRightCircle,
                        type : 'link',
                        path : '/'+menu.route.replace(".", "/"),
                        menuId: menu.id,
                        active: false,
                    })

                ): {}
            
            ));

            setMENUITEMS(menuObject);
            setMainMenu(menuObject);
        });


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log('usermenu',mainmenu, MENUITEMS);

    return (
        <>
            <div class="dropdown">
                <button class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown button
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div className="dropdown-container">
                        <li>
                            <a class="dropdown-item" href="#">Submenu item 1</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">Submenu item 2</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">Submenu item 3 &raquo; </a>
                            <ul class="dropdown-menu dropdown-submenu">
                            <li>
                                <a class="dropdown-item" href="#">Multi level 1</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">Multi level 2</a>
                            </li>
                            </ul>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">Submenu item 4</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">Submenu item 5</a>
                        </li>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Report;