import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import Datatable from '../common/datatable';
import 'react-toastify/dist/ReactToastify.css';
import { ServiceCategory } from '../../../api/userUrl';
import { userGetMethod } from '../../../api/userAction';
import { AddButton } from '../../common/GlobalButton';

class ListData extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            allServiceCategories: [],
            isLoading: true,
            isDelete: false,
            columns: [
                { Header: 'SL.', style: {textAlign: 'center'}, width: 50, Cell: (row) => <div>{row.index + 1}</div>, filterable: false},
                { Header: 'Name', accessor: 'name', style: {textAlign: 'center'}},
                { Header: 'Description', accessor: 'description', style: {textAlign: 'center'}},
                { 
                    Header: 'Last Updata', accessor: 'updated_at', style: {textAlign: 'center'}, sortable: false, filterable: false 
                }
            ]
        }
    }

    componentDidMount() {
        userGetMethod(ServiceCategory)
        .then(response => {
            this.setState({
                allServiceCategories : response.data.serviceCategories,
                isLoading: false,
            })
        })
        .catch(error => console.log(error))  
    }

    render() { 
        let { isLoading, allServiceCategories, columns } = this.state
        return (
            <Fragment>
                
                <Breadcrumb title="Service Category List" parent="Service Category" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                
                                <AddButton link="service-category/add"/>

                                <div className="card-body datatable-react">
                                    {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                    (
                                        <Datatable
                                            isColumn={true}
                                            columns={columns}
                                            multiSelectOption={false}
                                            myData={allServiceCategories}
                                            pageSize={5}
                                            pagination={true}
                                            class="-striped -highlight"
                                            editLink="service-category/edit"
                                            deleteLink={ServiceCategory}
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