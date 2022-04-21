import React, { Fragment, Component } from 'react';
import Breadcrumb from '../../common/breadcrumb';
import Datatable from '../../common/datatable';
import 'react-toastify/dist/ReactToastify.css';
import { UserDesignation } from '../../../../api/userUrl';
import { userGetMethod } from '../../../../api/userAction';
import { AddButton } from '../../../common/GlobalButton';

class ListData extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            allDesignations: [],
            isLoading: true,
            isDelete: false,
            columns: [
                { Header: 'SL.', style: {textAlign: 'center'}, width: 50, Cell: (row) => <div>{row.index + 1}</div>, filterable: false},
                { Header: 'Name', accessor: 'name', style: {textAlign: 'center'}},
                { Header: 'Grade', accessor: 'grade', style: {textAlign: 'center'} },
                { 
                    Header: 'Last Updata', accessor: 'updated_at', style: {textAlign: 'center'}, sortable: false, filterable: false 
                }
            ]
        }
    }

    componentDidMount() {
        userGetMethod(UserDesignation)
        .then(response => {
            this.setState({
                allDesignations : response.data.userDesignations,
                isLoading: false,
            })
        })
        .catch(error => console.log(error))  
    }

    render() { 
        let { isLoading, allDesignations, columns } = this.state;
        var menuId = 0;
        if (this.props.location.state === undefined) {
            console.log("abc", this.props.location);
        }else{
            menuId = this.props.location.state.params.menuId;
        }
        return (
            <Fragment>
                
                <Breadcrumb title="Designation List" parent="Designation" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                
                                <AddButton link="user-designation/add" menuId={ menuId } />

                                <div className="card-body datatable-react">
                                    {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                    (
                                        <Datatable
                                            isColumn={true}
                                            columns={columns}
                                            multiSelectOption={false}
                                            myData={allDesignations}
                                            pageSize={5}
                                            pagination={true}
                                            class="-striped -highlight"
                                            editLink="user-designation/edit"
                                            deleteLink={UserDesignation}
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