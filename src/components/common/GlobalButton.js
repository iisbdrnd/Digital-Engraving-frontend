import React, { Fragment, useState, useEffect,useRef } from 'react';
import { Link } from 'react-router-dom'
import { userGetMethod } from '../../api/userAction';
import { userHasAccess } from '../../api/userUrl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Alert } from "reactstrap";
import swal from 'sweetalert2';



// export const dropDownOption = (props)=>{

//     const handleTypeaheadInputChange = (text)=>{
//         setJobNoFilter(text);
//     }

//     useEffect(()=>{
//         if (jobNoFilter.length > 3) {
            
//             userGetMethod(`${props.baseURL}?searchText=${jobNoFilter}`)
//             .then(response => {
//                 console.log(response.data)
//                 let jobOrderOptions = [];
//                 if (response.data.layout_references && response.data.layout_references.length > 0) {
//                 response.data.layout_references.map(reference => {

                    
//                         let jobOrderObj = {};
//                         jobOrderObj.id = reference.layout_id;
//                         // jobOrderObj.job_no =reference.job_no;
//                         // jobOrderObj.name = reference.job_name;
//                         jobOrderOptions.push(jobOrderObj);
//                     }
//                 )
//             }

//             setTypeHeadOptions((prevstate) => ({
//                 ...prevstate,
//                 ['layout_id']: jobOrderOptions,
//             }))
//             setIsLoading(false);
//             })
//             // console.log(jobNoFilter)
//         }
//     },[jobNoFilter])


//     return(
//                                                         <Typeahead
//                                                         id="layout_id"
//                                                         name="layout_id"
//                                                         labelKey={option => `${option.id}`}
//                                                         options={typeHeadOptions['layout_id']}
//                                                         placeholder="Select Job No..."
//                                                         onChange={handleChange}
//                                                         inputProps={{ required: true }}
//                                                         onInputChange={(e)=>handleTypeaheadInputChange(e)}
//                                                         // selected={designToFactoryInput.job_order_pk_id}
//                                                         // disabled={job_order_pk_id != null ? 'disabled' : ''}
//                                                         ref={register({
//                                                             required: 'Job No Field Required'
//                                                         })}
//                                                         />
//     )
// }


export const SubmitButton = props => {
    

    // console.log(props);
    return (
        <Fragment>
            <div className={`card-footer ${props.addClass}`} >
                <div className={`col-md-12 offset-sm-${props.offset}`} style={{'padding':'0'}}>
                    <button className="btn btn-primary btn-sm mr-1" type="submit"
                    onClick={props.onClick}
                    disabled={props.disabled}
                    >Submit</button>
                    <Link 
                    to={{
                        pathname: `${process.env.PUBLIC_URL}/${props.link}`,
                        state: { params: {menuId: props.menuId} }
                    }}
                    className="btn btn-secondary btn-sm">{props.backBtnTitle == undefined ? 'Back To List' : props.backBtnTitle}</Link>
                </div>
            </div>
        </Fragment>
    )
}
export const rightSideReset = () => {
    return(<ul className="d-flex pull-right">
    <li className="p-r-10"><i className="fa fa-rotate-right"></i></li>
    <li className="p-r-10"><i className="fa fa-minus"></i></li>
    <li className="p-r-10"><i className="icon-close"></i></li>
</ul>)
    
}

export const AddButton = props => {
    const [hasAccess, setHasAccess] = useState({});
    useEffect(() => {
        let menuId = props.menuId;
        userGetMethod(`${userHasAccess}/${menuId}`)
        .then(response => {
            setHasAccess(response.data);
        });
    }, []);

    return (
        <Fragment>
            { 
                hasAccess.create === true ? (
                props.hasOwnProperty('header') && props.header == 'no' ?  
                    <Link 
                    to={{
                        pathname: `${process.env.PUBLIC_URL}/${props.link}`,
                        state: { params: {menuId: props.menuId} }
                    }}
                    className="btn btn-primary bt-xs mt-3 pull-right" style={{'marginRight': '18px'}}><i className="fa fa-plus" style={{"fontSize": "14px", "cursor": "pointer"}}></i> {props.btnTitle == undefined ? 'ADD' : props.btnTitle}</Link>
                : 
                <>
                    <Link 
                    to={{
                        pathname: `${process.env.PUBLIC_URL}/${props.link}`,
                        state: { params: {menuId: props.menuId} }
                    }}
                    className="btn btn-primary bt-xs mt-3 pull-right" style={{'marginRight': '18px'}}> <i className="fa fa-plus" style={{"fontSize": "14px", "cursor": "pointer"}}></i> {props.btnTitle == undefined ? 'ADD' : props.btnTitle}</Link>
                </>
                ) : ''
            }
            
        </Fragment>
    )
}

export const EditButton = props => {
    return (
        <Fragment>
            { 
                <Link 
                    to={{
                        pathname: props.link,
                        state: { params: {menuId: props.menuId} }
                    }}
                    className="fa fa-edit" 
                    style={{ width: 25, fontSize: 16, padding: 0, color: 'rgb(40, 167, 69)', cursor: "pointer" }}>
                </Link>
            }
            
        </Fragment>
    )
}
export const ShowButton = props => {

    return (
        <Fragment>
            { 
                <Link 
                    to={{
                        pathname: props.link,
                        state: { params: {menuId: props.menuId} }
                    }}
                    onClick={()=>props.handleShow(props.id)}
                    className="fas fa-eye" 
                    style={{ width: 25, fontSize: 16, padding: 0, color: 'rgb(40, 167, 69)', cursor: "pointer" }}>
                </Link>
            }
            
        </Fragment>
    )
}

export const DeleteButton = props => {
    return (
        <Fragment>
            { 
                <span onClick={() => {
                    swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it !'
                    })
                    .then((result) => {
                        if (result.isConfirmed) {
                            props.deleteHandler(props.dataId, props.deleteLink);
                        }else{
                            toast.error('Data Still Safe');
                        }
                    });
                }}>
                    <i className="fa fa-trash" style={{ width: 25, fontSize: 16, padding: 0, color: '#e4566e', cursor: 'pointer' }}
                    ></i>
                </span>
            }
        </Fragment>
    )
}

export const PerPageBox = props => {
    return (
        <Fragment>
            <div className="custom-table-pagination m-r-10 pull-right">
                <label className="mt-3">
                    <span>
                        <select className="form-control pagi-select" name="perPage" onChange={(e) => props.setPerPage(parseInt(e.target.value))} value={props.perPage}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </span>
                </label>
            </div>
        </Fragment>
    )
}

export const PanelRefreshIcons = props => {
    return (
        <Fragment>
            <ul className="d-flex pull-right">
                <li className="p-r-10 cursor-pointer" onClick={props.panelRefresh}><i className="fa fa-rotate-right"></i></li>
                <li className="p-r-10"><i className="fa fa-minus"></i></li>
                <li className="p-r-10"><i className="icon-close"></i></li>
            </ul>
        </Fragment>
    )
}

export const ValidationAlerts = props => {
    const {items, setOpenVal} = props;
    const [Open, setOpen] = useState(setOpenVal)
    const Toggle = () => setOpen(!Open);

    return (
        items.map((item, i) => (
            <Alert className="alert-dismissible" 
            color='danger inverse'
            isOpen={Open}
            target={"Alert-" + i}
            key={i}
            >
                <i className="icon-info-alt"></i>
                <p>{item}</p>
                <Button className="close" color='default' id={"Alert-" + i} onClick={Toggle}><span>×</span></Button>
            </Alert>
        ))
    );
};

