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
import MenuItems from './MenuItems';


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

                console.log('software_menus', response.data.software_menus);
            })
        }
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

    return (
        <Fragment>
            <Breadcrumb title="Project Accessing System" parent="Project Register" />

            <div className="col-md-6">
                <div className="card">
                    <div className="card-header">
                        <h3>Project Menu Access</h3>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card-body">
                                {/* Select Folder */}
                                <div className="form-group">
                                    <label className="col-form-label required">Folder</label> 
                                    <div className="col-md-6 row">
                                        <select className="form-control" onChange={(e) => changeFolder(e)}>
                                            <option value="">Select Option</option>
                                            {options}
                                        </select>
                                    </div>                                                                   
                                </div>
                                {/* Select Module */}
                                <div className="row">
                                    {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                    (
                                        <Module softModules={softModule} clickHandler={changeModule}/>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        
                        <form className="theme-form" onSubmit={handleSubmit(submitHandler)}>
                            {/* Menu Card */}
                            {isLoading2 ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                            (
                                // <MultiMenu  menuWithInternalLinks={menuAndInternalLinks} /> 

                                <div className="default-according panel-accordion" id="accordionclose">
                                    <MenuItems menuList={menuAndInternalLinks.menuAndLink}/>
                                </div>

                            )}
                            {menuAndInternalLinks != '' ? 
                                <SubmitButton link="projectRegister/list" addClass="pull-right"/>
                            :''}
                        </form>
                        

                    </div>
                </div>                        
            </div>

            
            
            
        </Fragment>
    );
};

export default AccessingSystem;