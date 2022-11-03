
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useParams } from 'react-router';
import UserAccessModules from './UserAccessModules';
import { softwareMenuRearrange, setUserAlreadyMenuAccess } from './ModulesAndLinks/utils';
import { adminGetMethod, adminPostMethod } from '../../../../../api/action';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

const UserAccess = () => {

    const [userAccessData , setUserAccessData] = useState();
    const [modulesData , setModulesData] = useState();
    const [menusForModuleId , setMenusForModuleId] = useState(null);
    const [loading,setLoading] = useState(false);
    const [modulesloading,setModulesLoading] = useState(false);
    const [ tab, setTab] = useState(0);
    const {userId} = useParams();
    // let dummyData = data.slice(0,5);

    //get all user access module by using user id  .software_menus
    const userModuleURl = `api/admin/projects/getModule/1`  //previous was ${userId}. Here 1 is folder id
    useEffect( () => {
        setLoading(true);
        adminGetMethod(userModuleURl)
        .then( res => {
            setUserAccessData(res.data);
            // console.log('data',res.data)
            setLoading(false)
        })
    }, [userModuleURl])
    
    
    //get all user access single module by using user id and module menu id
    const userMenuForModuleURl = `api/admin/users/getMenusForModule/1/${menusForModuleId}`  //previous was ${userId}. Here 1 is project id
    useEffect( () => {
        setModulesLoading(true);
        adminGetMethod(userMenuForModuleURl)
        .then( res => {

            if (res?.data?.software_menus?.length > 0) {
                
                adminGetMethod(`api/admin/users/getMenusForModuleUserwise/${userId}/${menusForModuleId}`)
                .then( (modulesRes) => {
                    let currentAccessData = modulesRes.data ;

                    
                    if(currentAccessData.software_menus.length > 0){

                        let newSoftwareMenus = setUserAlreadyMenuAccess( res.data.software_menus, currentAccessData.software_menus)

                        // software menu rearrange
                        const reArrangeMenus = softwareMenuRearrange(newSoftwareMenus);

                        const moduleData = {
                            ...res.data,
                            software_menus : reArrangeMenus
                        }
                        
                        setModulesData(moduleData);
                        setModulesLoading(false)

                    } else {

                        let menus = softwareMenuRearrange(res.data.software_menus)

                        const moduleData = {
                            ...res.data,
                            software_menus : menus
                        }
                        
                        setModulesData(moduleData);
                        setModulesLoading(false)

                    }

                })
                
            }    
            
            
        })
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menusForModuleId, userId])

    

    // eslint-disable-next-line no-unused-expressions
    //get and set what module menu see
    const openPopup = (id) => {
        setMenusForModuleId(id);
        setTab(1);
    }

    // when set user role
    const handleRoleChange = (event) => {

        const roleIdStr = event.target.value;
        const roleId = parseInt(roleIdStr);

        const userRoleMenuURL = `api/admin/getModuleMenusForRole/${roleId}/${menusForModuleId}`

        setModulesLoading(true);
        adminGetMethod(userRoleMenuURL)
        .then(  ( res) => {

            const roleModulesData = res.data;
            //copy module data
            let tempData= {
                software_module : roleModulesData?.software_module,
                checkAll: false
            }
           
            if(roleModulesData?.software_menus?.length > 0){

                adminGetMethod(`api/admin/users/getMenusForModule/1/${menusForModuleId}`)
                .then( (modulesRes) => {
                    let modulesData = modulesRes.data ;

                    const newSoftwareMenus = setUserAlreadyMenuAccess(modulesData?.software_menus, roleModulesData.software_menus)

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
                const userMenuForModuleURl = `api/admin/users/getMenusForModule/1/${menusForModuleId}`
                // jahid id then ashadul .. isChecked true
                adminGetMethod(userMenuForModuleURl)
                .then( res => {                    

                    // software menu rearrange
                    let reArrangeMenus;
                    if (res?.data?.software_menus?.length > 0) {
                        // const userAlreadyAccess = setUserAlreadyMenuAccess(res.data.software_menus);
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

    }

    // when check all
    const allMenuAndResourceChecked = ( event ) => {
        const {checked} = event.target;

        //copy module data
        let moduleData= {
            software_module : modulesData?.software_module,
            checkAll: false
        }

        const allCheckedData = modulesData?.software_menus?.map( (menu) => {

            // when parent menu dont have children
            if (menu.children?.length < 1) {

                if(menu?.internal_links?.length < 1){
                    return { ...menu, isTrue: checked }
                } else {
                    const childrenMenuWithInternalLinks = {
                            ...menu, 
                            isTrue: checked 
                    }
                    const internal_links =  menu?.internal_links?.map( (internalLink) => {
                            return { ...internalLink , isTrue: checked}
                    })
                    return { ...childrenMenuWithInternalLinks , internal_links: internal_links }
                }

            } else {
                // copy menu 
                const copyMenuObject = {
                    ...menu,
                    isTrue: checked
                }

                const checkedChildren = menu?.children?.map( (childrenMenu) => {

                    // if children menu dont have internal link
                    if(childrenMenu?.internal_links?.length < 1){

                        // if childmenu have subChildMenu 
                        if(childrenMenu?.children?.length > 0){

                            const subChildMenu = childrenMenu?.children?.map( (subChildMenu) => {
                                // if subChild don't have internal links
                                if (subChildMenu?.internal_links?.length < 1) {
                                    return {...subChildMenu, isTrue: checked }
                                } else {
                                    const copySubChildMenu = {
                                        ...subChildMenu,
                                        isTrue: checked
                                    }
                                    const internal_links =  subChildMenu?.internal_links?.map( (internalLink) => {
                                            return { ...internalLink , isTrue: checked}
                                    })
                                    return { ...copySubChildMenu , internal_links: internal_links }
                                }
                            })

                            return { ...childrenMenu, isTrue: checked , children: subChildMenu }
                            
                        } else {
                            return { ...childrenMenu, isTrue: checked }
                        }
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

        // console.log('pera', moduleData);
        //set module data to update data
        setModulesData(moduleData);

    }

    // when check menu
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

        // console.log('child', copyFindSelectedMenu);

        if(copyFindSelectedMenu.resource === 0){

            const checkedChildren = findMenus?.children?.map( (childrenMenu) => {

                // if children menu dont have internal link
                if(childrenMenu?.internal_links?.length < 1){

                    // if childmenu have subChildMenu 
                    if(childrenMenu?.children?.length > 0){

                        const subChildMenu = childrenMenu?.children?.map( (subChildMenu) => {
                            // if subChild don't have internal links
                            if (subChildMenu?.internal_links?.length < 1) {
                                return {...subChildMenu, isTrue: checked }
                            } else {
                                const copySubChildMenu = {
                                    ...subChildMenu,
                                    isTrue: checked
                                }
                                const internal_links =  subChildMenu?.internal_links?.map( (internalLink) => {
                                        return { ...internalLink , isTrue: checked}
                                })
                                return { ...copySubChildMenu , internal_links: internal_links }
                            }
                        })

                        return { ...childrenMenu, isTrue: checked , children: subChildMenu }
                        
                    } else {
                        return { ...childrenMenu, isTrue: checked }
                    }
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
        } else {
            
            const internal_links =  findMenus?.internal_links?.map( (internalLink) => {
                    return { ...internalLink , isTrue: checked}
            })

            copyFindSelectedMenu = {
                ...copyFindSelectedMenu,
                internal_links : internal_links
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
        }

    }
    
    // when check menu
    // const handleSelectMenu = (event , id ) => {

    //     const { checked } = event.target ;
    //     //copy module data
    //     let moduleData= {
    //         software_module : modulesData?.software_module,
    //         checkAll: false
    //     }

    //     const findMenus = modulesData?.software_menus?.find( menu => menu.id === id );

    //     let copyFindSelectedMenu = {
    //         ...findMenus , 
    //         isTrue : checked
    //     }

    //     // console.log('child', copyFindSelectedMenu);

    //     if(copyFindSelectedMenu.resource === 0){

    //         const checkedChildren = findMenus?.children?.map( (childrenMenu) => {

    //         if(childrenMenu?.internal_links?.length < 1){
    //             return { ...childrenMenu, isTrue: checked }
    //         } else {
    //                 const childrenMenuWithInternalLinks = {
    //                         ...childrenMenu, 
    //                         isTrue: checked 
    //                 }
    //                 const internal_links =  childrenMenu?.internal_links?.map( (internalLink) => {
    //                         return { ...internalLink , isTrue: checked}
    //                 })
    //                 return { ...childrenMenuWithInternalLinks , internal_links: internal_links }
    //             }
                
    //         })

    //         copyFindSelectedMenu = {
    //             ...copyFindSelectedMenu,
    //             children : checkedChildren
    //         }

    //         //set object to whice menu want to update and get all software menus array
    //         const finalSoftWareMenus  = modulesData?.software_menus?.map( menu => menu.id === id ? copyFindSelectedMenu : menu );

            
    //         const isParentMenuTrue = finalSoftWareMenus?.every( parentMenu => parentMenu.isTrue === true );

    //         //change module data object
    //         moduleData = {
    //             ...moduleData,
    //             isTrue : isParentMenuTrue,
    //             software_menus : finalSoftWareMenus
    //         }
    //         //set module data object
    //         setModulesData(moduleData);
    //     } else {
            
    //         const internal_links =  findMenus?.internal_links?.map( (internalLink) => {
    //                 return { ...internalLink , isTrue: checked}
    //         })

    //         copyFindSelectedMenu = {
    //             ...copyFindSelectedMenu,
    //             internal_links : internal_links
    //         }

    //         //set object to whice menu want to update and get all software menus array
    //         const finalSoftWareMenus  = modulesData?.software_menus?.map( menu => menu.id === id ? copyFindSelectedMenu : menu );

            
    //         const isParentMenuTrue = finalSoftWareMenus?.every( parentMenu => parentMenu.isTrue === true );

    //         //change module data object
    //         moduleData = {
    //             ...moduleData,
    //             isTrue : isParentMenuTrue,
    //             software_menus : finalSoftWareMenus
    //         }
    //         //set module data object
    //         setModulesData(moduleData);
    //     }

    // }

    
    
    // when check childMenu
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

        // when childmenu  have sub child menu
        if (findChildMenu.resource === 0) {

            const subChildMenu = findChildMenu?.children?.map( (subChildMenu) => {
                // if subChild don't have internal links
                if (subChildMenu?.internal_links?.length < 1) {
                    return {...subChildMenu, isTrue: checked }
                } else {
                    const copySubChildMenu = {
                        ...subChildMenu,
                        isTrue: checked
                    }
                    const internal_links =  subChildMenu?.internal_links?.map( (internalLink) => {
                            return { ...internalLink , isTrue: checked}
                    })
                    return { ...copySubChildMenu , internal_links: internal_links }
                }
            })

            childMenu =  { ...childMenu, isTrue: checked , children: subChildMenu }
            
        } else {

            let childInternalLinks;

            if(findChildMenu?.internal_links?.length > 0){
                childInternalLinks = findChildMenu?.internal_links?.map( ( internalLink) => {
                    return { ...internalLink , isTrue: checked}
                } )
            }
            // const isAllInternalLinksTrue = childInternalLinks?.some( internalLink => internalLink.isTrue === true );

            childMenu = {
                ...childMenu, 
                isTrue : checked,
                internal_links: childInternalLinks
            }
        }

        // update data set here start

        // find child menu and replace
        const updateChildMenu = findParentMenu.children?.map( currentChildMenu => currentChildMenu.id === menuChildId ? childMenu : currentChildMenu )

        
        const isChildMenuTrue = updateChildMenu?.some( childMenu => childMenu.isTrue === true );

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
    

    // when click parentInternal links
    const handleSelectParentInternalLinks = ( event , parentId, internalLinksId ) => {

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

        const findInternalLinks = findParentMenu.internal_links?.find( internalLink => internalLink.id === internalLinksId );

        let internalLink = {
            ...findInternalLinks,
            isTrue : checked
        }

        const updateInternalLinks = findParentMenu.internal_links?.map( currentInternalLink => currentInternalLink.id === internalLinksId ? internalLink : currentInternalLink )

        
        const isInternalLinkTrue = updateInternalLinks?.some( internalLink => internalLink.isTrue === true );

        parentMenu  ={
            ...parentMenu,
            isTrue : isInternalLinkTrue,
            internal_links : updateInternalLinks
        }

        const updateSoftwareMenu = modulesData?.software_menus?.map( currentParentMenu => currentParentMenu.id === parentId ? parentMenu : currentParentMenu );

        moduleData = {
            ...moduleData,
            software_menus : updateSoftwareMenu
        }
        //set all menus module data
        setModulesData(moduleData);

    }

    // when click parentInternal links
    // const handleSelectParentInternalLinks = ( event , parentId, internalLinksId ) => {

    //     const { checked } = event.target;
    //     // copy softare module
    //     let moduleData= {
    //         software_module : modulesData?.software_module,
    //         checkAll: false
    //     }

    //     const findParentMenu = modulesData?.software_menus?.find( parentMenu => parentMenu.id === parentId );

    //     let parentMenu = {
    //         ...findParentMenu
    //     }

    //     const findInternalLinks = findParentMenu.internal_links?.find( internalLink => internalLink.id === internalLinksId );

    //     let internalLink = {
    //         ...findInternalLinks,
    //         isTrue : checked
    //     }

    //     const updateInternalLinks = findParentMenu.internal_links?.map( currentInternalLink => currentInternalLink.id === internalLinksId ? internalLink : currentInternalLink )

        
    //     const isInternalLinkTrue = updateInternalLinks?.some( internalLink => internalLink.isTrue === true );

    //     parentMenu  ={
    //         ...parentMenu,
    //         isTrue : isInternalLinkTrue,
    //         internal_links : updateInternalLinks
    //     }

    //     const updateSoftwareMenu = modulesData?.software_menus?.map( currentParentMenu => currentParentMenu.id === parentId ? parentMenu : currentParentMenu );

    //     moduleData = {
    //         ...moduleData,
    //         software_menus : updateSoftwareMenu
    //     }
    //     //set all menus module data
    //     setModulesData(moduleData);

    // }
    
    // when click child internal link internalLink
    
    // when select sub menu
    // const handleSelectInternalLinks = ( event , parentId, menuChildId, internalLinksId ) => {

    //     const { checked } = event.target;
    //     // copy softare module
    //     let moduleData= {
    //         software_module : modulesData?.software_module,
    //         checkAll: false
    //     }

    //     const findParentMenu = modulesData?.software_menus?.find( parentMenu => parentMenu.id === parentId );

    //     let parentMenu = {
    //         ...findParentMenu
    //     }

    //     const findChildMenu = findParentMenu.children?.find( childrenMenu => childrenMenu.id === menuChildId );

    //     let childMenu = {
    //         ...findChildMenu,
    //     }

    //     const findInteranlLink = findChildMenu.internal_links.find( internalLink => internalLink.id === internalLinksId );


    //     const updateInternalLink = {
    //         ...findInteranlLink,
    //         isTrue : checked
    //     }

    //     const updatedNewInternalLinks = findChildMenu.internal_links.map( (internalLink) => {
    //        return  internalLink.id === internalLinksId ? updateInternalLink : internalLink
    //     })

    //     const isAllInternalLinksTrue = updatedNewInternalLinks?.some( internalLink => internalLink.isTrue === true );

    //     childMenu = {
    //         ...childMenu, 
    //         isTrue : isAllInternalLinksTrue,
    //         internal_links: updatedNewInternalLinks
    //     }

    //     const updateChildMenu = findParentMenu.children?.map( currentChildMenu => currentChildMenu.id === menuChildId ? childMenu : currentChildMenu );
        

    //     const isChildMenuTrue = updateChildMenu?.some( childMenu => childMenu.isTrue === true );

    //     parentMenu  ={
    //         ...parentMenu,
    //         isTrue: isChildMenuTrue,
    //         children : updateChildMenu
    //     }

    //     const updateSoftwareMenu = modulesData?.software_menus?.map( currentParentMenu => currentParentMenu.id === parentId ? parentMenu : currentParentMenu );

    //     moduleData = {
    //         ...moduleData,
    //         software_menus : updateSoftwareMenu
    //     }
    //     //set all menus module data
    //     setModulesData(moduleData);
        
    // }

    // when select sub menu
    const handleSelectSubChildMenu = ( event , parentId, childMenuId, subMenuChildId ) => {


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

        const findChildMenu = findParentMenu.children?.find( childrenMenu => childrenMenu.id === childMenuId );

        let childMenu = {
            ...findChildMenu,
        }


        // if children menu have sub children
        if(findChildMenu.resource === 0){

            const findSubChildren = findChildMenu?.children?.find( subChildren => subChildren.id === subMenuChildId );

            //copy findSubChildren
            let copySubChildren = {
                ...findSubChildren,
                isTrue: checked
            }

            // if sub Children dont have internal link
            if (findSubChildren?.internal_links?.length > 0) {
        
                const internal_links =  findSubChildren?.internal_links?.map( (internalLink) => {
                        return { ...internalLink , isTrue: checked}
                })
                copySubChildren =  { ...copySubChildren , internal_links: internal_links }

            }

            const updateSubChildrenMenu = findChildMenu?.children.map( (subChild) => {
                return  subChild.id === subMenuChildId ? copySubChildren : subChild
            })

            const ifSomeSubChildTrue = updateSubChildrenMenu?.some( subChild => subChild.isTrue === true );

            childMenu = {
                ...childMenu, 
                isTrue : ifSomeSubChildTrue,
                children: updateSubChildrenMenu
            }

        } else {

            const findInternalLink = findChildMenu.internal_links.find( internalLink => internalLink.id === subMenuChildId );


            const updateInternalLink = {
                ...findInternalLink,
                isTrue : checked
            }

            const updatedNewInternalLinks = findChildMenu.internal_links.map( (internalLink) => {
            return  internalLink.id === subMenuChildId ? updateInternalLink : internalLink
            })

            const isAllInternalLinksTrue = updatedNewInternalLinks?.some( internalLink => internalLink.isTrue === true );

            childMenu = {
                ...childMenu, 
                isTrue : isAllInternalLinksTrue,
                internal_links: updatedNewInternalLinks
            }

        }
        const updateChildMenu = findParentMenu.children?.map( currentChildMenu => currentChildMenu.id === childMenuId ? childMenu : currentChildMenu );
        

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

    // when select sub menu
    const handleSelectSubChildInternalLinks = ( event , parentId, menuChildId, subMenuChildId,  internalLinksId ) => {

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
        

        const findSubChildMenu = findChildMenu.children?.find( subChildrenMenu => subChildrenMenu.id === subMenuChildId );

        let subChildMenu = {
            ...findSubChildMenu,
        }

        const findInteranlLink = findSubChildMenu.internal_links.find( internalLink => internalLink.id === internalLinksId );


        const updateInternalLink = {
            ...findInteranlLink,
            isTrue : checked
        }

        const updatedNewInternalLinks = findSubChildMenu.internal_links.map( (internalLink) => {
           return  internalLink.id === internalLinksId ? updateInternalLink : internalLink
        })

        const isAllInternalLinksTrue = updatedNewInternalLinks?.some( internalLink => internalLink.isTrue === true );

        subChildMenu = {
            ...subChildMenu, 
            isTrue : isAllInternalLinksTrue,
            internal_links: updatedNewInternalLinks
        }

        
        
        const updateSubChildMenu = findChildMenu.children?.map( currentSubChildMenu => currentSubChildMenu.id === subMenuChildId ? subChildMenu : currentSubChildMenu );
        

        const isSubChildMenuTrue = updateSubChildMenu?.some( subChildMenu => subChildMenu.isTrue === true );

        childMenu  ={
            ...childMenu,
            isTrue: isSubChildMenuTrue,
            children : updateSubChildMenu
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

        console.log('softwareMenu', modulesData?.software_menus);

        
        for (const parentMenu of modulesData?.software_menus) {

            if(parentMenu.isTrue === true){

                const parentSelectedMenu = { id : parentMenu.id}
                menus.push(parentSelectedMenu)

                if( parentMenu.resource === 0){
                    for (const childrenMenu of parentMenu?.children) {
                        // check child have isTrue
                        if(childrenMenu.isTrue === true){
                            const childMenu = { id : childrenMenu.id}
                            menus.push(childMenu)

                            if(childrenMenu?.internal_links?.length > 0){
                                for(const internal_link of childrenMenu?.internal_links){
                                    if(internal_link.isTrue === true){
                                        const obj = {id: internal_link.id}
                                        internalLinks.push(obj)
                                    }
                                }
                            }

                            
                        }
                    }
                } else if ( parentMenu.resource === 1){
                    for(const internal_link of parentMenu?.internal_links){
                        if(internal_link.isTrue === true){
                            const obj = {id: internal_link.id}
                            internalLinks.push(obj)
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

    
        // post api call with data
        adminPostMethod('api/admin/users/userAccessingStore',data)
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
                                                        <h6 className='fs-3'>{data.module_name}</h6>
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
                <UserAccessModules allMenuAndResourceChecked={allMenuAndResourceChecked} handleSelectMenu={handleSelectMenu} handleSelectChildMenu={handleSelectChildMenu} handleSelectParentInternalLinks={handleSelectParentInternalLinks} handleSelectSubChildMenu={handleSelectSubChildMenu} handleSelectSubChildInternalLinks={handleSelectSubChildInternalLinks} handleRoleChange={handleRoleChange} modulesData={modulesData} loading={modulesloading} saveData={saveData} />
                )
            }
            

        </>
    );
};

export default UserAccess;