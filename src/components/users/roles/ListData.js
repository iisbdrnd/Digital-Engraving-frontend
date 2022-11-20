import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Link } from 'react-router-dom';
import Datatable from '../common/datatable';
import 'react-toastify/dist/ReactToastify.css';
import { userGetMethod } from '../../../api/userAction';

class ListData extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            allRoles: [],
            isLoading: true,
            isDelete: false,
            columns: [
                { Header: 'SL.', style: {textAlign: 'center'}, width: 50, Cell: (row) => <div>{row.index + 1}</div>, filterable: false},
                { Header: 'Role Id', style: {textAlign: 'center'}, accessor: 'id'},
                { Header: 'Role Name', style: {textAlign: 'center'}, accessor: 'role_name' },
                { Header: 'Status', accessor: 'valid', width: 100, style: {textAlign: 'center'}, sortable: false, Cell: ({value}) => (value >= 1 ? 'Active' : 'Deactive'), filterable: false }
            ]
        }
    }

    componentDidMount() {
        const usersRsurl = `api/user/roles`
        let response = userGetMethod(usersRsurl)
        .then(response => {
            console.log(response.data.roles)
            this.setState({
                allRoles: response.data,
                isLoading: false
            })
        })
        .catch(error => console.log(error))
    }

    render() { 
        let { isLoading, allRoles, columns } = this.state
        return (
            <Fragment>
                <Breadcrumb title="Role List" parent="Role" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="col-xl-12">
                                        <div className="contact-filter pull-right">
                                            <Link to={`${process.env.PUBLIC_URL}/role/add`} className="btn btn-primary ml-4">ADD</Link>
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
                                            myData={allRoles}
                                            pageSize={5}
                                            pagination={true}
                                            class="-striped -highlight"
                                            editLink="role/edit"
                                            // deleteLink={usersRsurl}
                                            accessLink="role-access-link"
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