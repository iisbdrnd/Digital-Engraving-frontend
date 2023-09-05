import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Link } from 'react-router-dom';
import Datatable from '../common/datatable';
import 'react-toastify/dist/ReactToastify.css';
import { userGetMethod } from '../../../api/userAction';
import { usersRsurl } from '../../../api/userUrl'

class ListData extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            allUsers: [],
            isLoading: true,
            isDelete: false,
            columns: [
                { Header: 'SL.', style: {textAlign: 'center'}, width: 50, Cell: (row) => <div>{row.index + 1}</div>, filterable: false},
                { Header: 'Emp Id', style: {textAlign: 'center'}, accessor: 'emp_id'},
                { Header: 'Name', style: {textAlign: 'center'}, accessor: 'name' },
                { Header: 'Designation', style: {textAlign: 'center'}, accessor: 'designation_name' },
                { Header: 'Email', accessor: 'email' },
                { Header: 'Project Id', style: {textAlign: 'center'}, accessor: 'gen_project_id' },
                { Header: 'Status', accessor: 'valid', width: 100, style: {textAlign: 'center'}, sortable: false, Cell: ({value}) => (value >= 1 ? 'Active' : 'Deactive'), filterable: false }
            ]
        }
    }

    componentDidMount() {
        const usersRsurl = `api/user/user`
        let response = userGetMethod(usersRsurl)
        .then(response => {
            this.setState({
                allUsers: response.data,
                isLoading: false
            })
        })
        .catch(error => console.log(error))
    }

    render() { 
        let { isLoading, allUsers, columns } = this.state;
        console.log(columns)
        return (
            <Fragment>
                <Breadcrumb title="User List" parent="User" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header d-flex justify-content-center align-items-center">
                                    <div className="col-xl-12 ">
                                        <div className="contact-filter pull-right">
                                            <Link to={`${process.env.PUBLIC_URL}/users/add`} className="btn btn-primary ml-4">ADD</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body datatable-react">
                                    {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>) :
                                    (
                                        <Datatable
                                            isColumn={true}
                                            columns={columns}
                                            multiSelectOption={false}
                                            myData={allUsers}
                                            pageSize={10}
                                            pagination={true}
                                            class="-striped -highlight"
                                            editLink="users/edit"
                                            // deleteLink={usersRsurl}
                                            accessLink="user-access-link"
                                        />
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