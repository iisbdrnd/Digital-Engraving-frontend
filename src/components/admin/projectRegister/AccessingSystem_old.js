import React, { Fragment, useEffect, useState } from 'react';
import useForm from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminGetMethod, adminPostMethod } from '../../../../api/action';
import { GET_FOLDER, GET_MENUS_FOR_MODULE, GET_MODULE, STORE_PROJECT_ACCESSING } from '../../../../api/adminUrl';
import { SubmitButton } from '../../../common/GlobalButton';
import Breadcrumb from '../../common/breadcrumb';
import Module from "./Module";
import MultiMenu from "./MultiMenu";


const AccessingSystem = (props) => {
    const [softFolder, setSoftFolder] = useState([]);
    const [softModule, setSoftModule] = useState([]);
    const [menuAndInternalLinks, setMenuAndInternalLinks] = useState({menuAndLink : [], defaultMenu: 0});
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState();
    const { handleSubmit } = useForm();
    
    const [selectMenu,setSelectMenu] = useState([]);
    const [checkMenu,setCheckMenu] = useState([0]);

    const [internalLinkState,setInternalLinkState] = useState({links: [], defaultLinks: []});
    const[default_array, setDefaultArray ] = useState([]);

    const [newarray,setNewArray] = useState({});

    const projectId = props.match.params.projectId;

    
    // With DOM Load
    useEffect(()=>{
        adminGetMethod(`${GET_FOLDER}/${projectId}`)
        .then(response => {
            setSoftFolder(response.data.folders);
        })
    }, []);

    // Change Handlers
    const changeFolder = (e) => {
        let targetValue = e.target.value;
        setIsLoading(true);
        if (targetValue) {
            adminGetMethod(`${GET_MODULE}/${targetValue}`)
            .then(response => {
                setSoftModule(response.data.modules);
                setIsLoading(false);
            })
        }
    }

    const changeModule = (moduleId)=>{
        setIsLoading2(true);
        if (moduleId) {
            window.topicText = moduleId; //moduleId set up globaly
            adminGetMethod(`${GET_MENUS_FOR_MODULE}/${projectId}/${moduleId}`)
            .then(response => {
                setMenuAndInternalLinks({menuAndLink: response.data.software_menus, defaultMenu: response.data.software_menus.length});
                setIsLoading2(false);
            })
        }
    }

    const onSelect = (e) => {
        if(e.length > 0){
            var menu_id = e[0].menu_id;
            for(var i=0;i<internalLinkState.links.length;i++){
                if(internalLinkState.links[i].length > 0){
                    for(var j=0;j<internalLinkState.links[i].length;j++){
                        if(internalLinkState.links[i][j].menu_id == menu_id){
                            internalLinkState.links.splice(i, 1); 
                            break;
                       }                     
                    }
               }              
            }
            internalLinkState.links.push(e);
        }
    }

    function onRemove (e){

        if(e.length > 0){
            var menu_id = e[0].menu_id;
            for(var i=0;i<internalLinkState.links.length;i++){
                if(internalLinkState.links[i].length > 0){
                    for(var j=0;j<internalLinkState.links[i].length;j++){
                        if(internalLinkState.links[i][j].menu_id == menu_id){
                            internalLinkState.links.splice(i, 1); 
                            break;
                       }                     
                    }
               }              
            }
            internalLinkState.links.push(e);
        }

        // internalLinkState.splice(dIndex, 1); 
        // internalLinkState.splice(0, 1); 

    } 

    function submitHandler(e){

        // console.log('default_link', internalLinkState.links);
        console.log('final_menu', selectMenu);
        var data = {
            project: projectId,
            module: parseInt(window.topicText), //parseInt for string to number conversion
            menu: selectMenu,
            // internal_link: internalLinkState
        }

        adminPostMethod(STORE_PROJECT_ACCESSING, data)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
                window.location.reload()
            })
        .catch(error => toast.error(error))
    }

    // Array Map
    const options = softFolder.map((folder, key)=>{
        return (
            <option value={folder.id} key={key}>{folder.folder_name}</option>
        );
    });

    const allMenus = menuAndInternalLinks.menuAndLink.map((menuWithLink, key)=> {

        // if menu access null
        console.log('menulinks', menuWithLink);
        console.log('checkMenu', checkMenu.length);

        if (checkMenu.length <=  menuAndInternalLinks.defaultMenu) {
            if(menuWithLink.menu_access != null){
                if (!selectMenu.includes(menuWithLink.id)) {
                    selectMenu.push(menuWithLink.id);
                }
            }
            checkMenu.push(1);
        }

        // end if menu access nul when update/edit
        return (
            <MultiMenu menuWithLinks={menuWithLink} onChange={(value, selectId, internalLink) => {
                if (selectId == 1) {
                    if(!selectMenu.includes(value)){
                        setSelectMenu([...selectMenu, value ]);
                    }
       
                    // this is internal link state
                    if(internalLink.length > 0){
                        for(var i=0;i<internalLinkState.links.length;i++){
                            if(internalLinkState.links[i].length > 0){
                                for(var j=0;j<internalLinkState.links[i].length;j++){
                                    if(internalLinkState.links[i][j].menu_id == value){
                                        internalLinkState.links.splice(i, 1); 
                                        break;
                                   }                     
                                }
                           }              
                        }
                        internalLinkState.links.push(internalLink);
                    }
                } else {

                    //get only menu id
                    for(var i=0; i < selectMenu.length; i++) {
                        if(selectMenu[i] == value){
                            selectMenu.splice(i,1);
                        }
                    } 

                    //get menu id with links
                    if(internalLinkState.links.length > 0){
                        for(var i=0;i<internalLinkState.links.length;i++){
                            if(internalLinkState.links[i].length > 0){
                                for(var j=0;j<internalLinkState.links[i].length;j++){
                                    if(internalLinkState.links[i][j].menu_id == value){
                                        internalLinkState.links.splice(i, 1); 
                                        break;
                                   }                     
                                }
                           }              
                        }
                    }
                }
            }} 
            onChangeInternalLink={(value)=>{
                // setInternalLinkState([...internalLinkState, {'id':value} ]);
                // alert(value);
            }} 
            onSelectInternalLink={onSelect}
            onRemoveInternalLink={onRemove}
            key={key}/>
        ) 
    })

    console.log('menuAndInternalLinks', menuAndInternalLinks);

    return (
        <Fragment>
            <Breadcrumb title="Project Accessing System" parent="Project Register" />

            <div className="card">
                <div className="card-header">
                    <h3>Project Menu Access</h3>
                </div>
                <div className="card-body">
                    {/* Select Folder */}
                    <select className="custom-select custom-select-lg" onChange={(e) => changeFolder(e)}>
                        <option value="">Select Option</option>
                        {options}
                    </select>
                </div>

                <div className="card-body">
                    {/* Select Module */}
                    {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                    (
                        <div className="folder-items d-flex justify-content-around">
                            <Module softModules={softModule} clickHandler={changeModule}/>
                        </div>
                    )}
                </div>
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
                            <SubmitButton link="admin/projects/list" />
                        :''}
                    </form>

                </div>
            </div>
        </Fragment>
    );
};

export default AccessingSystem;