/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { userGetMethod } from '../../../../api/userAction';
import { softWareMenus } from '../../../../api/userUrl';
// import "./reportDropdown.css";
import './report.css';
import {
    Home,
    ArrowRightCircle,
    ArrowDown
} from 'react-feather';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const Report = () => {

    const dropDownRef = useRef(null);
    const [MENUITEMS, setMENUITEMS] = useState([]);
    const [mainmenu, setMainMenu] = useState([]);
     const menuObject = [];
     const [clicked, setClicked] = useState("0");
     const [showDropdown, setShowDropdown] = useState(false);

     const handleShowDropdown = () => {
        setShowDropdown( prevState => !prevState)
     }

      const handleToggle = (index) => {

            if (clicked === index) {
            return setClicked("0");
            }
            setClicked(index);
        };

     const handleCloseDropDown = () => {
        setShowDropdown(false);
     }

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

    // useEffect( () => {

    //     const closeDropDown = e => {
    //         if(e.path[0] !== dropDownRef.current){
    //             setShowDropdown(false);
    //         }
    //     }

    //     document.body.addEventListener('click', closeDropDown)

    //     return () => document.body.removeEventListener('click', closeDropDown)

    // } , [])



    console.log('usermenu',mainmenu, MENUITEMS);



    return (
        <>


            <div class="dropdown">
                {
                    MENUITEMS?.map( (menu) => (
                        menu.type === 'link' ? (
                            <Link 
                                className='d-flex align-items-center' 
                                onClick={handleCloseDropDown}
                                to={{
                                        pathname: process.env.PUBLIC_URL+menu.path,
                                        state: { params: {menuId: menu.menuId} },
                                        menuId: menu.menuId
                                    }}
                                params={ menu.menuId }
                            >{menu.title}</Link>
                        ) : (
                            <>
                                <button  ref={dropDownRef} onClick={handleShowDropdown}>
                                    {menu.title}
                                </button>
                                <div class={`dropdown-menu ${showDropdown && 'show' }`} aria-labelledby="dropdownMenuButton">
                                    <div className={menu?.children.length > 15 ? `dropdown-container long` : 'dropdown-container'}>
                                        {
                                            menu?.children?.map( (dropdown , index) => (
                                                dropdown.type === 'sub' ? (
                                                    <li>
                                                        <div className="d-flex align-items-center justify-content-between dropdown-item"  onClick={ () => handleToggle(index)}>
                                                            <span >{dropdown.title}</span> <ArrowDown style={ {marginTop : '0px'}}  color="black" size={10}/>
                                                        </div>
                                                        <div className={`children ${ clicked === index ? "active" : ""}`}>
                                                            <ul className='subDropdown'>
                                                                {
                                                                    dropdown?.children?.map( (submultiMenu) => (
                                                                        <li key={submultiMenu.title}>
                                                                            {
                                                                                submultiMenu.title && (
                                                                                    <Link 
                                                                                        className='d-flex align-items-center' 
                                                                                        onClick={handleCloseDropDown}
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
                                                                
                                                            </ul>
                                                        </div>
                                                    </li>
                                                ) : (
                                                    dropdown.title && (
                                                        <li key={dropdown.title}>
                                                            <Link 
                                                                className='d-flex align-items-center dropdown-item' 
                                                                onClick={handleCloseDropDown}
                                                                to={{
                                                                        pathname: process.env.PUBLIC_URL+dropdown.path,
                                                                        state: { params: {menuId: dropdown.menuId} },
                                                                        menuId: dropdown.menuId
                                                                    }}
                                                                params={ dropdown.menuId }
                                                            >{dropdown.title}</Link>
                                                        </li>
                                                    )
                                                )) 
                                            )
                                        }
                                    </div>
                                </div>
                            </>
                        )
                    ))
                }

            </div>

        </>
    );
};

export default Report;