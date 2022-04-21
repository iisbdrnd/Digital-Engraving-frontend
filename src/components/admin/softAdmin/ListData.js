import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Link } from 'react-router-dom';
import Datatable from '../common/datatable';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { adminGetMethod, adminDeleteMethod } from '../../../api/action'
import { adminsRsurl } from '../../../api/adminUrl'
import { AddButton } from '../../common/GlobalButton';
import {getLocal} from '../../../helper/GlobalHelper';



class ListData extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            adminList: [],
            isLoading: true,
            isDelete: false,
        }
    }

    deleteHandler = (itemId) =>{
        if(window.confirm('Are you sure you wish to delete this item?')){
            toast.error('yes');
            let response = adminDeleteMethod(adminsRsurl, itemId)
            .then(response => {
                if (response.data.status == 1) {
                    let newData = this.state.myData.filter(data => data.id != itemId);
                    this.setState({
                        myData: newData,
                        isDelete: true
                    })
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(error => toast.error(error));
        }else{
            toast.error('Data Still Safe');
        }
        
    }

    componentDidMount() {
        let response = adminGetMethod(adminsRsurl)
        .then(response => {
            this.setState({
                adminList: response.data,
                isLoading: false,
                totalData: response.data.length
            })
        })
        .catch(error => console.log(error))
    }

    render() { 
        let { isLoading, adminList, columns } = this.state
        let login_info = JSON.parse(getLocal('login_info'));

        return (
            <Fragment>
                <Breadcrumb title="Admin List" parent="Admin" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex justify-content-between">
                                        <h5>Admins</h5>
                                        <AddButton header="no" link="softAdmin/add" />
                                    </div>
                                </div>
                                <div className="card-body datatable-react">
                                    {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                    (
                                        <div className="table-responsive">
                                            <table className="table table-border-horizontal">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Username</th>
                                                        <th scope="col">Email</th>                                                        
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { 
                                                        adminList.length > 0 ? 
                                                            <>
                                                                {adminList.map((item, index) =>           
                                                                    (
                                                                        <tr key={index}>
                                                                            <th scope="row">{ (index+1) }</th>
                                                                            <td>{item.name}</td>
                                                                            <td>{item.username}</td>
                                                                            <td>{item.email}</td>
                                                                            <td className="">
                                                                                <Link to={`${process.env.PUBLIC_URL}/softAdmin/edit/${item.id}`} className="btn btn-info btn-xs"><i className="fa fa-edit"></i></Link>&nbsp;  
                                                                                
                                                                                {
                                                                                    login_info.id !== item.id ?
                                                                                        <>
                                                                                            <button className="btn btn-danger btn-xs" onClick={()=>this.deleteHandler(item.id)}><i className="fa fa-trash"></i></button>&nbsp;
                                                                                        </>
                                                                                    :""
                                                                                }                                                                               
                                                                                <Link to={`${process.env.PUBLIC_URL}/softAdmin/admin-access-link/${item.id}`} className="btn btn-secondary btn-xs">Access</Link>
                                                                            </td>
                                                                        </tr>
                                                                    )                
                                                                )}
                                                            </> 
                                                        : <tr><td colSpan="4" className="text-center">No data found</td></tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
 
export default ListData;