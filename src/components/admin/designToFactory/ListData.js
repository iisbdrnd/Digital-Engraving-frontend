import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import Datatable from '../common/datatable';
import 'react-toastify/dist/ReactToastify.css';
import { adminGetMethod } from '../../../api/action'
import { designationRsURL } from '../../../api/adminUrl'
import { AddButton } from '../../common/GlobalButton';

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
                // Filter: ({ filter, onChange }) =>
                // <select
                //   onChange={event => onChange(event.target.value)}
                //   style={{ width: "100%" }}
                //   value={filter ? filter.value : "1"}
                // >
                //   <option value="1">Active</option>
                //   <option value="0">Deactive</option>
                // </select> 
                // { Header: <b>Action</b>, id: 'delete', accessor: str => "delete", style: {textAlign: 'center'}, sortable: false, width: 100, filterable: false,
                //     Cell: props => (
                //         <div>
                //             <span>
                //                 <Link to={`${process.env.PUBLIC_URL}/projectRegistration/edit/${props.original.id}`} className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: 'rgb(40, 167, 69)', cursor: "pointer" }}></Link>
                //             </span>

                //             <span onClick={() => {
                //                 if (window.confirm('Are you sure you wish to delete this item?')) {
                //                     this.deleteHandler(props.original.id)
                //                 } else {
                //                     console.log('nothing yet');
                //                 }
                //             }
                //                 }>
                //                 <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: '#e4566e', cursor: "pointer" }}
                //                 ></i>
                //             </span>
                //         </div>
                //     )
                // }
        }
    }

    componentDidMount() {
        let response = adminGetMethod(designationRsURL)
            .then(response => {
                this.setState({
                    allDesignations : response.data.designations,
                    isLoading: false,
                })
            })
        .catch(error => console.log(error))  
    }

    render() { 
        let { isLoading, allDesignations, columns } = this.state
        return (
            <Fragment>
                
                <Breadcrumb title="Designation List" parent="Designation" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                
                                <AddButton link="designations/add"/>

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
                                            editLink="designations/edit"
                                            deleteLink={designationRsURL}
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