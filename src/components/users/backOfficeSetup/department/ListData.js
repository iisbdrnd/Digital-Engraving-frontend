import React, { Fragment, Component } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import Datatable from '../../common/datatable';
import 'react-toastify/dist/ReactToastify.css';
import { UserDepartment } from '../../../../api/userUrl';
import { userGetMethod } from '../../../../api/userAction';
import { AddButton } from '../../../common/GlobalButton';

class ListData extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            allDepartments: [],
            isLoading: true,
            isDelete: false,
            columns: [
                { Header: 'SL.', style: {textAlign: 'center'}, width: 50, Cell: (row) => <div>{row.index + 1}</div>, filterable: false},
                { Header: 'Name', accessor: 'name', style: {textAlign: 'center'}},
                { Header: 'comment', accessor: 'comment', style: {textAlign: 'center'}},
                { 
                    Header: 'Last Updata', accessor: 'updated_at', style: {textAlign: 'center'}, sortable: false, filterable: false 
                }
            ]
        }
    }

    componentDidMount() {
        userGetMethod(UserDepartment)
        .then(response => {
            this.setState({
                allDepartments : response.data.userDepartments,
                isLoading: false,
            })
        })
        .catch(error => console.log(error))  
    }

    render() { 
        let { isLoading, allDepartments, columns } = this.state;
        var menuId = 0;
        if (this.props.location.state === undefined) {
            var menuId = 0;
        }else{
            menuId = this.props.location.state.params.menuId;
        }

        return (
            <Fragment>
                
                <Breadcrumb title="Department List" parent="Designation" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                
                                <AddButton link="user-department/add" menuId={ menuId } />
                                <div className="card-body datatable-react">
                                    {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                    (
                                        <Datatable
                                            isColumn={true}
                                            columns={columns}
                                            multiSelectOption={false}
                                            myData={allDepartments}
                                            pageSize={5}
                                            pagination={true}
                                            class="-striped -highlight"
                                            editLink="user-department/edit"
                                            deleteLink={UserDepartment}
                                            menuId={menuId}
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