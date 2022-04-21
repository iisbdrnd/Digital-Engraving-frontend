import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import Datatable from '../common/datatable';
import 'react-toastify/dist/ReactToastify.css';
import { adminGetMethod } from '../../../api/action';
import { SOFTWARE_MODULE_RSURL } from '../../../api/adminUrl';
import { AddButton } from '../../common/GlobalButton';


class ListData extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            allModules: [],
            isLoading: true,
            isDelete: false,
            columns: [
                { Header: 'SL.', style: {textAlign: 'center'}, width: 50, Cell: (row) => <div>{row.index + 1}</div>, filterable: false },
                { Header: 'Folder', accessor: 'folder_name' },
                { Header: 'Module Name', accessor: 'module_name' },
                { Header: 'URL Prefix', accessor: 'url_prefix' },
                { Header: 'Route Prefix', accessor: 'route_prefix' },
                { Header: 'Status', accessor: 'status', sortable: true, Cell: ({value}) => (value >= 1 ? 'Active' : 'Inactive'), filterable: false }
            ]
        }
    }

    componentDidMount() {
        let response = adminGetMethod(SOFTWARE_MODULE_RSURL)
        .then(response => {
            this.setState({
                allModules: response.data,
                isLoading: false
            })
        })
        .catch(error => console.log(error))
    }

    render() { 
        let { isLoading, allModules, columns } = this.state
        return (
            <Fragment>
                <Breadcrumb title="Module List" parent="Module" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <AddButton link="jobOrder/add" />
                                <div className="card-body datatable-react">
                                    {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                    (
                                        <Datatable
                                            isColumn={true}
                                            columns={columns}
                                            multiSelectOption={false}
                                            myData={allModules}
                                            pageSize={5}
                                            pagination={true}
                                            class="-striped -highlight"
                                            editLink="softwareModule/edit"
                                            deleteLink={SOFTWARE_MODULE_RSURL}
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