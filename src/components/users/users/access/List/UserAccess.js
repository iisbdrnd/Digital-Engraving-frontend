
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router';
import UserAccessModules from './UserAccessModules';
import {  userGetMethod, userPostMethod } from '../../../../../api/userAction';

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
            setModulesData(res.data);
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

        userGetMethod(userRoleMenuURL)
        .then(  ( res) => {

            const roleModulesData = res.data;
            //copy module data
            let tempData= {
                software_module : roleModulesData?.software_module,
                checkAll: false
            }
           
            if(roleModulesData?.software_menus?.length > 0){

                console.log('hello');
                // get data whice check true
                let modulesRoleCheckTrueData = [];
                for (const menu of modulesData?.software_menus) {
                    for (const roleMenu of roleModulesData.software_menus ){
                        
                        if( menu.id === roleMenu.id){

                            let roleMenuData = {...menu , isChecked : true}

                            //change internal links object and give isChecked to true
                            const roleMenuInternalLinks =  roleMenuData?.internal_links?.map( internal_link => {
                                return {
                                    ...internal_link,
                                    isChecked: true
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

                // if the array of object have isChecked True then remove
                menusWithOutCheck.forEach(object => {
                    delete object['isChecked'];
                });


                /* Creating a new array from the two arrays. */
                const newSoftwareMenus = [
                    ...modulesRoleCheckTrueData,
                    ...menusWithOutCheck
                ]

                //update module data
                tempData = {
                    ...tempData,
                    software_menus : newSoftwareMenus
                }
                //set module data to update data
                setModulesData(tempData);

            } else {
                /* Making an API call to get the menus for the module. */
                const userMenuForModuleURl = `api/user/getMenusForModule/1/${menusForModuleId}`
                userGetMethod(userMenuForModuleURl)
                .then( res => {

                    tempData = {
                        ...tempData,
                        software_menus : res.data.software_menus
                    }

                    setModulesData(tempData);

                })
                
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roleId, menusForModuleId, userMenuForModuleURl ])



    //checkbox handle 
    const handleCheckChange = (e) => {
        const {name , checked} = e.target;

        //copy module data
        let tempData= {
            software_module : modulesData?.software_module,
            checkAll: false
        }
        //If you want to give access of all modules
        if( name === 'allSelect'){
            const tempSoftware_menus = modulesData?.software_menus?.map( (data) => {

                if(data?.internal_links?.length < 1){
                    //if module don't have internal links
                    return({ ...data , isChecked: checked});
                } else {
                    //if module have internal links
                    let obj = {
                         ...data , isChecked: checked
                    }
                    //change internal links object and give isChecked to true
                    const internal_links =  data?.internal_links?.map( internal_link => {
                        return {
                            ...internal_link,
                            isChecked: checked
                        }
                    })
                    //update module access
                    obj = {
                        ...obj,
                        internal_links
                    }
                    return obj
                }
            });
            //update module data
            tempData = {
                ...tempData,
                software_menus : tempSoftware_menus
            }
            //set module data to update data
            setModulesData(tempData);
            
        } else {
            //find whice menus wants to access
            const findSoftware_menus = modulesData?.software_menus?.find( data => data.id == name );
            //copy the specific menu that you want to aceess 
            let obj = {
                ...findSoftware_menus,
                isChecked : checked
            }
            //software menu internal links
            let findSoftware_menus_internal_links;
            //if software menu have internal linkes then update internal links and set isCheck true
            if(findSoftware_menus?.internal_links?.length > 0){
                findSoftware_menus_internal_links = findSoftware_menus?.internal_links?.map( internal_links => {
                    return {...internal_links , isChecked : checked}
                })
            }
            //update the object and internal links arrary set true
            obj ={
                ...obj,
                internal_links : findSoftware_menus_internal_links
            }
            
            //set object to whice menu want to update and get all software menus array
            const final  = modulesData?.software_menus?.map( data => data.id == name ? obj : data );

            //change module data object
            tempData = {
                ...tempData,
                software_menus : final
            }
            //set module data object
            setModulesData(tempData);
        }
        
    }


    //if cleck add , edit , delete  or update
    const singleSelect = (e) => {
        //get internal links id , software menu id
        const {name , id, checked} = e.target;
        //copy module data
        let tempData= {
            software_module : modulesData?.software_module,
            checkAll: false
        }
        //find and copy object software menu by using software menu id
        const findSoftware_menus = modulesData?.software_menus?.find( data => data.id == id );
        let softwareMenusObj = {
            ...findSoftware_menus
        }
        
        //find whice internal link click or check
        const internal_Link_update = findSoftware_menus.internal_links?.find( data => data.id == name );
        //copy internal link object and check true or false
        let updateObject = {
            ...internal_Link_update,
            isChecked: checked
        }

        //set object to whice intenal links want to update and get all internal links array
        const final_internal_Link_update  = findSoftware_menus.internal_links?.map( data => data.id == name ? updateObject : data );

        //if all internal links click then return true
        const isAllInternalLinksTrue = final_internal_Link_update.every( internalLink => internalLink.isChecked === true );

        //update single software menu object
        softwareMenusObj = {
            ...softwareMenusObj,
            isChecked: isAllInternalLinksTrue,
            internal_links: final_internal_Link_update
        }

        //set object to whice menu want to update and get all software menus array
        const final  = modulesData?.software_menus?.map( data => data.id == id ? softwareMenusObj : data );

        //update all menu final object
        tempData = {
            ...tempData,
            software_menus : final
        }
        //set all menus module data
        setModulesData(tempData);

    }

    // if click save data button
    const saveData = () => {
        
        //find whice software menu have check
        const menusFilter = modulesData?.software_menus?.filter( module => module.isChecked === true);
        
        //modify software menu object
        let menu = [];
        for (const menuFilter of menusFilter) {
            const obj = {
                id : menuFilter.id
            }
            menu.push(obj)
        }

        //find whice intenal links check and set new object to true
        let links = [];        
        for(const menu of modulesData?.software_menus){
            if(menu?.internal_links?.length > 0){
                for(const internal_link of menu.internal_links){
                    if(internal_link.isChecked === true){
                        const obj = {id: internal_link.id}
                        links.push(obj)
                    }
                }
            }
        }
        

        //create final post data
        const user_id = parseInt(userId);
        let data = {
            user_id,
            module_id : menusForModuleId,
            menus: menu,
            internal_links:links            
        } 
        // console.log(data);
    
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

            {/* {
                tab === 0 && (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="card my-3 w-100">
                                    <div className="card-header">
                                        <h5>User Access</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row justify-content-between my-2">
                                            <div className="col-md-3">
                                                <form className='d-flex' action="">
                                                    <input type="text" placeholder='Search' className="form-control" />
                                                    <button className="btn btn-sm">GO</button>
                                                </form>
                                            </div>
                                            <div className='col-md-1'>
                                                <div className="d-flex">
                                                    <select className="custom-select">
                                                        <option selected>10</option>
                                                        <option value="1">One</option>
                                                        <option value="2">Two</option>
                                                        <option value="3">Three</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>No</th>
                                                        <th><i className="fa-solid fa-arrow-down-up-across-line"></i> Menu Name </th>
                                                        <th><i className="fa-solid fa-arrow-down-up-across-line"></i> Link Name</th>
                                                        <th><i className="fa-solid fa-arrow-down-up-across-line"></i> Module Name </th>
                                                        <th><i className="fa-solid fa-arrow-down-up-across-line"></i> Access Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        dummyData.map( data => (
                                                            <tr key={data.id}>
                                                                <th>{data.id}</th>
                                                                <td>{data.report_to}</td>
                                                                <td>{data.name}</td>
                                                                <td>{data.project_id}</td>
                                                                <td>{data.regDate}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                    
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Menu Name</th>
                                                        <th>Link Name</th>
                                                        <th>Module Name</th>
                                                        <th>Access Date</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } */}
            {
                tab === 1 && (
                <UserAccessModules modulesData={modulesData} loading={modulesloading} handleCheckChange={handleCheckChange} singleSelect={singleSelect} saveData={saveData} handleRoleChange={handleRoleChange} />
                )
            }
            
            {/* {
                tab === 2 && (
                    <h2>Accordian</h2>
                )
            }
            
            {
                tab === 3 && (
                    <h4>Tab 3</h4>
                )
            } */}
        </>
    );
};

export default UserAccess;