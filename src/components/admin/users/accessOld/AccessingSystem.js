import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { adminGetMethod, adminPutMethod, adminPostMethod } from '../../../../api/action';
import { GET_USER_MODULE, GET_USER_MENUS_FOR_MODULE, STORE_USER_ACCESSING } from '../../../../api/adminUrl';
import Module from "./Module";
import { Tag } from 'react-feather';
import MultiMenu from "./MultiMenu";
import { SubmitButton } from '../../../common/GlobalButton';
import useForm from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AccessingSystem = (props) => {
    const [softModule, setSoftModule] = useState();
    const [menuAndInternalLinks, setMenuAndInternalLinks] = useState({menuAndLink : [], defaultMenu: 0});
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState();
    const { handleSubmit } = useForm();
    
    const [selectMenu,setSelectMenu] = useState([]);
    const [checkMenu,setCheckMenu] = useState([0]);
    const [internalLinkState,setInternalLinkState] = useState([]);
    
    const userId = props.match.params.userId;
    
    // With DOM Load
    useEffect(()=>{
        adminGetMethod(`${GET_USER_MODULE}/${userId}`)
        .then(response => {
            setSoftModule(response.data.modules);
            setIsLoading(false);
        });
    }, []);

    const changeModule = (moduleId)=>{
        setIsLoading2(true);
        // setMenuAndInternalLinks([]);
        if (moduleId) {
            window.topicText = moduleId; //moduleId set up globaly
            adminGetMethod(`${GET_USER_MENUS_FOR_MODULE}/${userId}/${moduleId}`)
            .then(response => {
                // console.log('menu',response.data.software_menus.length);
                setMenuAndInternalLinks({menuAndLink: response.data.software_menus, defaultMenu: response.data.software_menus.length});
                setIsLoading2(false);
            })
        }
    }

    function submitHandler(e){
        console.log('final_menu', selectMenu);
        var data = {
            userId: userId,
            module: parseInt(window.topicText), //parseInt for string to number conversion
            menu: selectMenu
        }

        // adminPostMethod(STORE_USER_ACCESSING, data)
        //     .then(response => {
        //         if (response.data.status == 1) {
        //             toast.success(response.data.message)
        //         } else {
        //             toast.error(response.data.message)
        //         }
                
        //         // setMenuAndInternalLinks([]);
        //         // window.location.reload();
        //     })
        // .catch(error => toast.error(error))
    }
    
    // Array Map
    let allModules = null;
    if (softModule) {
        allModules = softModule.map((module, key) => {
            return (
                <div className="col-md-2 chart-widget" style={{ cursor:"pointer", marginTop: "15px"}} onClick={() => changeModule(module.id)} key={key}>
                    <div className="media">
                        <div className="media-body">
                            <p>{module.module_name}</p>
                        </div>
                        <Tag />
                    </div>
                </div>
            )
        }); 
    }
    
    const allMenus = menuAndInternalLinks.menuAndLink.map((menuWithLink, key)=> {

        // console.log('menuwithlink', menuWithLink);

        // console.log('checkmenu', checkMenu.length);


        if (checkMenu.length <=  menuAndInternalLinks.defaultMenu) {
            if(menuWithLink.menu_access != null){
                if (!selectMenu.includes(menuWithLink.id)) {
                    selectMenu.push(menuWithLink.id);
                }
            }
            checkMenu.push(1);
        }


        // if(menuWithLink.menu_access != null){

        //     if (checkMenu.length <= 2 ) {
        //         if (!selectMenu.includes(menuWithLink.id)) {
                
        //                 selectMenu.push(menuWithLink.id);
        //         }
        //         checkMenu.push(1);
        //     }

        // }


        return (
            <MultiMenu menuWithLinks={menuWithLink} onChange={(value, selectId) => {

                if (selectId == 1) {
                    if (!selectMenu.includes(value)) {
                        selectMenu.push(value);
                    }
                }else{
                    //get only menu id
                    for(var i=0; i < selectMenu.length; i++) {
                        if(selectMenu[i] == value){
                            selectMenu.splice(i,1);
                        }
                    } 

                }
            }} 
            key={key}/>
        ) 


    });



    return (
        <Fragment>
            <Breadcrumb title="Project Accessing System" parent="Project Register" />

            <div className="card">
                <div className="card-header">
                    <h3>User Menu Access</h3>
                </div>
                {allModules}
            </div>
            
            <div className="card">
                <div className="card-body gggg">
                    <form className="theme-form" onSubmit={handleSubmit(submitHandler)}>
                        {/* Menu Card */}
                        {isLoading2 ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                        (
                            menuAndInternalLinks != [] ? allMenus : null 
                        )}

                        {menuAndInternalLinks != '' ? 
                            <SubmitButton link="admin/users/list" />
                        :''}
                        
                    </form>

                </div>
            </div>
        </Fragment>
    );
};

export default AccessingSystem;