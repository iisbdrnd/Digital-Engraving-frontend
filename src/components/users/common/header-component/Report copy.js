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

    // console.log('usermenu',mainmenu, MENUITEMS);

    return (
        <>
            <ul class="dropdown">
                {
                    MENUITEMS?.map( (menu) => (
                        <li key={menu.title}>
                            {
                                menu.type === 'link' ? (
                                    <Link 
                                        className='d-flex align-items-center' 
                                        to={{
                                                pathname: process.env.PUBLIC_URL+menu.path,
                                                state: { params: {menuId: menu.menuId} },
                                                menuId: menu.menuId
                                            }}
                                        params={ menu.menuId }
                                    >{menu.title}</Link>
                                ) : (
                                    <>
                                        <a href="#"
                                            // className='d-flex align-items-center' 
                                        > 

                                        <div className="d-flex align-items-center">
                                            <span className="menutitle">{menu.title}</span> 
                                        </div>
                                        </a>
                                        <ul>
                                            {
                                                menu?.children?.map( (subMenu) => (
                                                    subMenu.type === 'sub' ? (
                                                            <li key={subMenu?.title}>
                                                                <a href="#"
                                                                    // className='d-flex align-items-center' 
                                                                > 
                                                                <div className="d-flex align-items-center">
                                                                    <span className="menutitle">{subMenu.title}</span> <ArrowRight style={ {marginTop : '0px'}}  color="black" size={10}/>
                                                                </div> 
                                                                </a>
                                                                <ul>
                                                                    <div>
                                                                        {
                                                                        subMenu?.children?.map( (submultiMenu) => (
                                                                            <li key={submultiMenu.title}>
                                                                                {
                                                                                    submultiMenu.title && (
                                                                                        <Link 
                                                                                            className='d-flex align-items-center' 
                                                                                            to={{
                                                                                                    pathname: process.env.PUBLIC_URL+submultiMenu.path,
                                                                                                    state: { params: {menuId: submultiMenu.menuId} },
                                                                                                    menuId: submultiMenu.menuId
                                                                                                }}
                                                                                            params={ submultiMenu.menuId }
                                                                                        >{submultiMenu.title}</Link>
                                                                                    )
                                                                                }
                                                                            </li>
                                                                        ))
                                                                    }
                                                                    </div>
                                                                </ul>
                                                                
                                                                {/* if another dropdown here then ul > li > a */}
                                                            </li>
                                                        ) : (
                                                            subMenu.title && (
                                                                <li key={subMenu.title}>
                                                                    <Link 
                                                                        className='d-flex align-items-center' 
                                                                        to={{
                                                                                pathname: process.env.PUBLIC_URL+subMenu.path,
                                                                                state: { params: {menuId: subMenu.menuId} },
                                                                                menuId: subMenu.menuId
                                                                            }}
                                                                        params={ subMenu.menuId }
                                                                    >{subMenu.title}</Link>
                                                                </li>
                                                            ) 
                                                        )
                                                ))
                                            }
                                        </ul>
                                    </>
                                )
                            }
                            
                        </li>
                    ))
                }
                
            </ul>
        </>
    );
};

export default Report;