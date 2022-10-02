/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { userGetMethod } from '../../../../api/userAction';
import { softWareMenus } from '../../../../api/userUrl';
import "./reportDropdown.css";
import {
    Home,
    ArrowRightCircle,
    ArrowRight
} from 'react-feather';

const Report = () => {

    const [MENUITEMS, setMENUITEMS] = useState([]);
    const [mainmenu, setMainMenu] = useState([]);
     const menuObject = [];

    useEffect(() => {
        let moduleId = localStorage.getItem('moduleId');
        // Start Dynamic Menu Processing
        userGetMethod(`${softWareMenus}/${moduleId}`)
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
            <ul class="dropdown">
                <li><a href="#">Report</a>
                    <ul>
                        {
                            MENUITEMS?.map( (menu) => (
                                <li key={menu.title}><a className='d-flex align-items-center' href="">{menu.title} {menu.type === 'sub' && <div className="ml-1"><ArrowRight  color="black" size={15}/></div> }  </a>
                                    {
                                        menu.type === 'sub' && (
                                            <ul>
                                                {
                                                    menu?.children?.map( (subMenu) => (
                                                        subMenu.title && (
                                                                <li key={subMenu?.title}><a href="">{subMenu?.title}</a></li>
                                                            )
                                                    ))
                                                }
                                            </ul>
                                        )
                                    }
                                </li>
                            ))
                        }
                        {/* <li><a href="">Nice Dropdown Menu</a></li>
                        <li><a href="">Submenu - 1</a></li>
                        <li><a href="#">Dropdown</a>
                            <ul>
                                <li><a href="">Submenu - 1</a></li>
                                <li><a href="">Submenu - 2</a></li>
                                <li><a href="#">Dropdown</a>
                                    <ul>
                                        <li><a href="">Submenu - 1</a></li>
                                        <li><a href="">Submenu - 2</a></li>
                                        <li><a href="">Submenu - 3</a></li>
                                    </ul>
                                </li>
                                <li><a href="">Submenu - 3</a></li>
                            </ul>
                        </li>
                        <li><a href="">Submenu - 2</a></li> */}
                    </ul>
                </li>
            </ul>
        </>
    );
};

export default Report;