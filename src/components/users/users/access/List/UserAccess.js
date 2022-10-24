
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useParams } from 'react-router';
import UserAccessModules from './UserAccessModules';
import {  userGetMethod, userPostMethod } from '../../../../../api/userAction';
import { softwareMenuRearrange } from './ModulesAndLinks/utils';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

const UserAccess = () => {

    const [userAccessData , setUserAccessData] = useState();
    const [modulesData , setModulesData] = useState();
    const [menusForModuleId , setMenusForModuleId] = useState(null);
    const [loading,setLoading] = useState(false);
    const [modulesloading,setModulesLoading] = useState(false);
    const [ tab, setTab] = useState(0);
    const [ roleId, setRoleId] = useState(null);
    const {userId} = useParams();
    // let dummyData = data.slice(0,5);

    //get all user access module by using user id  .software_menus
    const userModuleURl = `api/user/software-modules`  //previous was ${userId}. Here 1 is folder id
    useEffect( () => {
        setLoading(true);
        userGetMethod(userModuleURl)
        .then( res => {
            setUserAccessData(res.data);
            // console.log('data',res.data)
            setLoading(false)
        })
    }, [userModuleURl])
    
    
    //get all user access single module by using user id and module menu id
    const userMenuForModuleURl = `api/user/getMenusForModule/1/${menusForModuleId}`  //previous was ${userId}. Here 1 is project id
    useEffect( () => {
        setModulesLoading(true);
        userGetMethod(userMenuForModuleURl)
        .then( res => {

            let menus;
            if (res?.data?.software_menus?.length > 0) {
                menus = softwareMenuRearrange(res.data.software_menus)
            }     
            
            const moduleData = {
                ...res.data,
                software_menus : menus
            }
            
            setModulesData(moduleData);
            setModulesLoading(false)
        })
    }, [userMenuForModuleURl])

    

    // eslint-disable-next-line no-unused-expressions
    //get and set what module menu see
    const openPopup = (id) => {
        setMenusForModuleId(id);
        setTab(1);
        setRoleId(null);
    }

    /**
     * When the user changes the role, set the roleId to the value of the role selected.
     * @param event - The event object
     */
    const handleRoleChange = (event) => {
        const roleIdStr = event.target.value;
        const getRoleId = parseInt(roleIdStr);
        setRoleId(getRoleId)
    }


    /* Fetching data from the server and setting it to the state by using role */
    useEffect(  () => {
        
        const userRoleMenuURL = `api/user/getModuleMenusForRole/${roleId}/${menusForModuleId}`

        setModulesLoading(true);
        userGetMethod(userRoleMenuURL)
        .then(  ( res) => {

            const roleModulesData = res.data;
            //copy module data
            let tempData= {
                software_module : roleModulesData?.software_module,
                checkAll: false
            }
           
            if(roleModulesData?.software_menus?.length > 0){

                userGetMethod(`api/user/getMenusForModule/1/${menusForModuleId}`)
                .then( (modulesRes) => {
                    let modulesData = modulesRes.data ;
                    
                    // get data whice check true
                    let modulesRoleCheckTrueData = [];
                    for (const menu of modulesData?.software_menus) {
                        for (const roleMenu of roleModulesData.software_menus ){
                            
                            if( menu.id === roleMenu.id){

                                let roleMenuData = {...menu , isTrue : true}

                                //change internal links object and give isTrue to true
                                const roleMenuInternalLinks =  roleMenuData?.internal_links?.map( internal_link => {
                                    return {
                                        ...internal_link,
                                        isTrue: true
                                    }
                                })
                                roleMenuData = {
                                    ...roleMenuData,
                                    internal_links : roleMenuInternalLinks
                                }
                                modulesRoleCheckTrueData.push(roleMenuData);
                                // console.log('data', menu , roleMenu);

                            }  

                        }
                    }

                    /* Filtering the menusWithOutCheck array and returning the menus that are not in the
                    modulesRoleCheckTrueData array. */
                    let menusWithOutCheck = modulesData?.software_menus?.filter(function(menu){
                        return !modulesRoleCheckTrueData.some(function(checkmenu){   
                            return menu.id === checkmenu.id;          
                        });
                    });

                    // if the array of object have isTrue True then remove
                    const menusWithOutCheckAllFalse =  menusWithOutCheck.map( (menu) => {
                        let newMenu = {
                            ...menu,
                            isTrue : false
                        }

                        if(menu.internal_links.length > 0){
                            const newMenuInternallinks = menu.internal_links.map( (links) => {
                                return { ...links , isTrue : false }
                            } )
                            newMenu = {
                                ...newMenu, 
                                internal_links : newMenuInternallinks
                            }
                            return newMenu;
                        } else{
                        return newMenu; 
                        }
                    })


                    /* Creating a new array from the two arrays. */
                    const newSoftwareMenus = [
                        ...modulesRoleCheckTrueData,
                        ...menusWithOutCheckAllFalse
                    ]


                    // software menu rearrange
                    const reArrangeMenus = softwareMenuRearrange(newSoftwareMenus);
                    //update module data
                    tempData = {
                        ...tempData,
                        software_menus : reArrangeMenus
                    }
                    //set module data to update data
                    setModulesData(tempData);
                    setModulesLoading(false);
                })

                

            } else {
                /* Making an API call to get the menus for the module. */
                const userMenuForModuleURl = `api/user/getMenusForModule/1/${menusForModuleId}`
                userGetMethod(userMenuForModuleURl)
                .then( res => {

                    // software menu rearrange
                    let reArrangeMenus;
                    if (res?.data?.software_menus?.length > 0) {
                        reArrangeMenus = softwareMenuRearrange(res.data.software_menus)
                    } 

                    tempData = {
                        ...tempData,
                        software_menus : reArrangeMenus
                    }

                    setModulesData(tempData);

                    setModulesLoading(false);
                })
                
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roleId, menusForModuleId, userMenuForModuleURl ])


    // when select all
    const allMenuAndResourceChecked = ( event ) => {
        const {checked} = event.target;

        //copy module data
        let moduleData= {
            software_module : modulesData?.software_module,
            checkAll: false
        }

        const allCheckedData = modulesData?.software_menus?.map( (menu) => {

            if (menu.children?.length < 1) {
                return {...menu , isTrue : checked}
            } else {
                // copy menu 
                const copyMenuObject = {
                    ...menu,
                    isTrue: checked
                }

                const checkedChildren = menu?.children?.map( (childrenMenu) => {

                    if(childrenMenu?.internal_links?.length < 1){
                        return { ...childrenMenu, isTrue: checked }
                    } else {
                        const childrenMenuWithInternalLinks = {
                             ...childrenMenu, 
                             isTrue: checked 
                        }
                       const internal_links =  childrenMenu?.internal_links?.map( (internalLink) => {
                                return { ...internalLink , isTrue: checked}
                        })
                        return { ...childrenMenuWithInternalLinks , internal_links: internal_links }
                    }
                    
                })

                return { ...copyMenuObject , children : checkedChildren }

            }
        })

        //update module data
        moduleData = {
            ...moduleData,
            software_menus : allCheckedData
        }
        //set module data to update data
        setModulesData(moduleData);

    }

    // when select menu
    const handleSelectMenu = (event , id ) => {

        const { checked } = event.target ;
        //copy module data
        let moduleData= {
            software_module : modulesData?.software_module,
            checkAll: false
        }

        const findMenus = modulesData?.software_menus?.find( menu => menu.id === id );

        let copyFindSelectedMenu = {
            ...findMenus , 
            isTrue : checked
        }

        const checkedChildren = findMenus?.children?.map( (childrenMenu) => {

            if(childrenMenu?.internal_links?.length < 1){
                return { ...childrenMenu, isTrue: checked }
            } else {
                const childrenMenuWithInternalLinks = {
                        ...childrenMenu, 
                        isTrue: checked 
                }
                const internal_links =  childrenMenu?.internal_links?.map( (internalLink) => {
                        return { ...internalLink , isTrue: checked}
                })
                return { ...childrenMenuWithInternalLinks , internal_links: internal_links }
            }
            
        })

        copyFindSelectedMenu = {
            ...copyFindSelectedMenu,
            children : checkedChildren
        }

        //set object to whice menu want to update and get all software menus array
        const finalSoftWareMenus  = modulesData?.software_menus?.map( menu => menu.id === id ? copyFindSelectedMenu : menu );

        
        const isParentMenuTrue = finalSoftWareMenus?.every( parentMenu => parentMenu.isTrue === true );

        //change module data object
        moduleData = {
            ...moduleData,
            isTrue : isParentMenuTrue,
            software_menus : finalSoftWareMenus
        }
        //set module data object
        setModulesData(moduleData);


        console.log(moduleData);
    }

    // when click childMenu
    const handleSelectChildMenu = ( event , parentId, menuChildId ) => {

        const { checked } = event.target;
        // copy softare module
        let moduleData= {
            software_module : modulesData?.software_module,
            checkAll: false
        }

        const findParentMenu = modulesData?.software_menus?.find( parentMenu => parentMenu.id === parentId );

        let parentMenu = {
            ...findParentMenu
        }

        const findChildMenu = findParentMenu.children?.find( childrenMenu => childrenMenu.id === menuChildId );

        let childMenu = {
            ...findChildMenu,
            isTrue : checked
        }

        let childInternalLinks;

        if(findChildMenu?.internal_links?.length > 0){
            childInternalLinks = findChildMenu?.internal_links?.map( ( internalLink) => {
                return { ...internalLink , isTrue: checked}
            } )
        }
        const isAllInternalLinksTrue = childInternalLinks?.every( internalLink => internalLink.isTrue === true );

        childMenu = {
            ...childMenu, 
            isTrue : isAllInternalLinksTrue,
            internal_links: childInternalLinks
        }

        const updateChildMenu = findParentMenu.children?.map( currentChildMenu => currentChildMenu.id === menuChildId ? childMenu : currentChildMenu )

        
        const isChildMenuTrue = updateChildMenu.some( childMenu => childMenu.isTrue === true );

        parentMenu  ={
            ...parentMenu,
            isTrue : isChildMenuTrue,
            children : updateChildMenu
        }

        const updateSoftwareMenu = modulesData?.software_menus?.map( currentParentMenu => currentParentMenu.id === parentId ? parentMenu : currentParentMenu );

        moduleData = {
            ...moduleData,
            software_menus : updateSoftwareMenu
        }
        //set all menus module data
        setModulesData(moduleData);


        console.log(updateSoftwareMenu);
    }
    
    // when click internalLink
    const handleSelectInternalLinks = ( event , parentId, menuChildId, internalLinksId ) => {

        const { checked } = event.target;
        // copy softare module
        let moduleData= {
            software_module : modulesData?.software_module,
            checkAll: false
        }

        const findParentMenu = modulesData?.software_menus?.find( parentMenu => parentMenu.id === parentId );

        let parentMenu = {
            ...findParentMenu
        }

        const findChildMenu = findParentMenu.children?.find( childrenMenu => childrenMenu.id === menuChildId );

        let childMenu = {
            ...findChildMenu,
        }

        const findInteranlLink = findChildMenu.internal_links.find( internalLink => internalLink.id === internalLinksId );


        const updateInternalLink = {
            ...findInteranlLink,
            isTrue : checked
        }

        const updatedNewInternalLinks = findChildMenu.internal_links.map( (internalLink) => {
           return  internalLink.id === internalLinksId ? updateInternalLink : internalLink
        })

        const isAllInternalLinksTrue = updatedNewInternalLinks?.some( internalLink => internalLink.isTrue === true );

        childMenu = {
            ...childMenu, 
            isTrue : isAllInternalLinksTrue,
            internal_links: updatedNewInternalLinks
        }

        const updateChildMenu = findParentMenu.children?.map( currentChildMenu => currentChildMenu.id === menuChildId ? childMenu : currentChildMenu );
        

        const isChildMenuTrue = updateChildMenu?.some( childMenu => childMenu.isTrue === true );

        parentMenu  ={
            ...parentMenu,
            isTrue: isChildMenuTrue,
            children : updateChildMenu
        }

        const updateSoftwareMenu = modulesData?.software_menus?.map( currentParentMenu => currentParentMenu.id === parentId ? parentMenu : currentParentMenu );

        moduleData = {
            ...moduleData,
            software_menus : updateSoftwareMenu
        }
        //set all menus module data
        setModulesData(moduleData);

    }

    // // if click save data button
    const saveData = () => {

        let menus = [];
        let internalLinks = [];

        
        for (const parentMenu of modulesData?.software_menus) {

            if(parentMenu.isTrue === true){
                const parentSelectedMenu = { id : parentMenu.id}
                menus.push(parentSelectedMenu)
            }

            if( parentMenu?.children?.length > 0){
                for (const childrenMenu of parentMenu.children) {
                    // check child have isTrue
                    if(childrenMenu.isTrue === true){
                        const childMenu = { id : childrenMenu.id}
                        menus.push(childMenu)
                    }
                    // check child have inernal links
                    if(childrenMenu?.internal_links?.length > 0){
                        for(const internal_link of childrenMenu.internal_links){
                            if(internal_link.isTrue === true){
                                const obj = {id: internal_link.id}
                                internalLinks.push(obj)
                            }
                        }
                    }

                }
            }

        }

        //create final post data
        const user_id = parseInt(userId);
        let data = {
            user_id,
            module_id : menusForModuleId,
            menus: menus,
            internal_links: internalLinks            
        } 

        // console.log('saveData',data);
    
        // post api call with data
        userPostMethod('api/user/userAccessingStore',data)
        .then( res => {
            // if data save successfull
            if(res.data.message){
                toast.success('User access added successfully');
            }
        })

    }
    
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                <h6>User Name</h6>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {
                                        loading ? <h5>Loading</h5> : (
                                            userAccessData?.modules?.map( (data,index) => (
                                                <div onClick={ () => openPopup(data.id)} className="col-md-3 cursor-pointer">
                                                    <d className={menusForModuleId === data.id ? "border d-flex flex-column py-3 justify-content-center align-items-center bg-secondary" : "border d-flex flex-column py-3 justify-content-center align-items-center" }
                                                    >
                                                        <i className="fa-solid fa-basket-shopping fa-2xl my-3 pb-2"></i>
                                                        <h6 className=''>{data.module_name}</h6>
                                                    </d>
                                                </div>
                                            ))
                                        )
                                        
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        
            {
                tab === 1 && (
                <UserAccessModules allMenuAndResourceChecked={allMenuAndResourceChecked} handleSelectMenu={handleSelectMenu} handleSelectChildMenu={handleSelectChildMenu} handleSelectInternalLinks={handleSelectInternalLinks} handleRoleChange={handleRoleChange} modulesData={modulesData} loading={modulesloading} saveData={saveData} />
                )
            }
            

        </>
    );
};

export default UserAccess;