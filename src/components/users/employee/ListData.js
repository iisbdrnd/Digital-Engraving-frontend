import React, { Fragment,Component } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import { UserEmployee } from '../../../api/userUrl';
import { userPostMethod, userGetMethod } from '../../../api/userAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Datatable from '../common/datatable';
import { AddButton } from '../../common/GlobalButton';

class ListData extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            allEmployees: [],
            isLoading: true,
            isDelete: false,
            columns: [
                { Header: 'SL.', style: {textAlign: 'center'}, width: 50, Cell: (row) => <div>{row.index + 1}</div>, filterable: false},
                { Header: 'Depertment', accessor: 'departmentName', style: {textAlign: 'center'} },
                { Header: 'Designation', accessor: 'designationName', style: {textAlign: 'center'} },
                { Header: 'Name', accessor: 'name', style: {textAlign: 'center'} },
                { Header: 'Email', accessor: 'email', style: {textAlign: 'center'} },
                { 
                    Header: 'Last Updata', accessor: 'updated_at', style: {textAlign: 'center'}, sortable: false, filterable: false 
                }
            ]
        }
    }

    componentDidMount() {
        userGetMethod(UserEmployee)
        .then(response => {
            this.setState({
                allEmployees : response.data.userEmployee,
                isLoading: false,
            })
        })
        .catch(error => console.log(error))  
    }

    render() { 
        let { isLoading, allEmployees, columns } = this.state
        return (
            <Fragment>
                
                <Breadcrumb title="Employee List" parent="Designation" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                
                                <AddButton link="user-employee/add"/>

                                <div className="card-body datatable-react">
                                    {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                    (
                                        <Datatable
                                            isColumn={true}
                                            columns={columns}
                                            multiSelectOption={false}
                                            myData={allEmployees}
                                            pageSize={5}
                                            pagination={true}
                                            class="-striped -highlight"
                                            editLink="user-employee/edit"
                                            deleteLink={UserEmployee}
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