import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// export const SubmitButton = props => {
//     return (
//         <Fragment>
//             <div className={`card-footer ${props.addClass}`} >
//                 <div className={`col-md-12 offset-sm-${props.offset}`}>
//                     <button className="btn btn-primary mr-1" type="submit">Submit</button>
//                     <Link to={`${process.env.PUBLIC_URL}/${props.link}`} className="btn btn-secondary">Back To List</Link>
//                 </div>
//             </div>
//         </Fragment>
//     )
// }
// export const AddButton = props => {
//     return (
//         <Fragment>
//             { 
//                 props.hasOwnProperty('header') && props.header == 'no' ?  
//                     <Link to={`${process.env.PUBLIC_URL}/${props.link}`} className="btn btn-primary ml-4">ADD</Link>
//                 : 
//                 <div className="card-header">
//                     <div className="col-xl-12">
//                         <div className="contact-filter pull-right">
//                             <Link to={`${process.env.PUBLIC_URL}/${props.link}`} className="btn btn-primary ml-4">ADD</Link>
//                         </div>
//                     </div>
//                 </div>
//             }
//         </Fragment>
//     )
// }
// export const EditButton = props => {

//     return (
//         <Fragment>
//             { 
//                 <Link to={props.link} 
//                 className="fa fa-pencil" 
//                 style={{ width: 35, fontSize: 16, padding: 11, color: 'rgb(40, 167, 69)', cursor: "pointer" }}
//                 ></Link>
//             }
            
//         </Fragment>
//     )
// }
// export const DeleteButton = props => {

//     return (
//         <Fragment>
//             { 
//                 <span onClick={() => {
//                     if (window.confirm('Are you sure you wish to delete this item?')) {
//                         props.deleteHandler(props.dataId)
//                     } else {
//                         // console.log(row.original.id);
//                         toast.error('Data Still Safe');
//                     }
//                 }}>
//                     <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: '#e4566e', cursor: 'pointer' }}
//                     ></i>
//                 </span>
//             }
            
//         </Fragment>
//     )
// }


export const SubmitButton = props => {
    return (
        <Fragment>
            <div className={`card-footer ${props.addClass}`} >
                <div className={`col-md-12 offset-sm-${props.offset}`}>
                    <button className="btn btn-primary mr-1" type="submit">Submit</button>
                    <Link 
                    to={`${process.env.PUBLIC_URL}/${props.link}`}
                    className="btn btn-secondary">Back To List</Link>
                </div>
            </div>
        </Fragment>
    )
}

export const AddButton = props => {
    return (
        <Fragment>
            <Link  to={`${process.env.PUBLIC_URL}/${props.link}`} className="btn btn-primary bt-xs mt-3 pull-right" style={{'marginRight': '18px'}}><i className="fa fa-plus" style={{"fontSize": "14px", "cursor": "pointer"}}></i> ADD</Link>
        </Fragment>
    )
}

export const EditButton = props => {
    return (
        <Fragment>
            <Link 
                to={props.link} className="fa fa-edit" style={{ width: 25, fontSize: 16, padding: 0, color: 'rgb(40, 167, 69)', cursor: "pointer" }}>
            </Link>
        </Fragment>
    )
}

export const DeleteButton = props => {
    return (
        <Fragment>
            { 
                <span onClick={() => {
                    if (window.confirm('Are you sure you wish to delete this item?')) {
                        props.deleteHandler(props.dataId, props.deleteLink)
                    } else {
                        toast.error('Data Still Safe');
                    }
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
                        <select className="form-control pagi-select" onChange={props.pageBoxChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </span>
                </label>
            </div>
        </Fragment>
    )
}