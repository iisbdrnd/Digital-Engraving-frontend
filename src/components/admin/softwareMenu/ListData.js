import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import Datatable from '../common/datatable';
import 'react-toastify/dist/ReactToastify.css';
import { adminGetMethod } from '../../../api/action'
import { SOFTWARE_MENU_RSURL } from '../../../api/adminUrl'
import { AddButton } from '../common/GlobalButton';

class ListData extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            allSoftMenus: [],
            isLoading: true,
            isDelete: false,
            columns: [
                { Header: 'SL.', style: {textAlign: 'center'}, width: 50, Cell: (row) => <div>{row.index + 1}</div>, filterable: false },
                { Header: 'Folder', accessor: 'folder_name' },
                { Header: 'Menu Name', accessor: 'menu_name' },
                { Header: 'Route', accessor: 'route' },
                { Header: 'Parent Menu', accessor: 'parent_menu_name' },
                { Header: 'Module', accessor: 'module_name' },
                { Header: 'Status', accessor: 'valid', width: 100, style: {textAlign: 'center'}, sortable: false, Cell: ({value}) => (value >= 1 ? 'Active' : 'Deactive'), filterable: false }
            ]
        }
    }

    componentDidMount() {
        let response = adminGetMethod(SOFTWARE_MENU_RSURL)
            .then(response => {
                this.setState({
                    allSoftMenus : response.data,
                    isLoading: false,
                })
            })
        .catch(error => console.log(error))  
    }

    render() { 
        let { isLoading, allSoftMenus, columns } = this.state
        return (
            <Fragment>
                <Breadcrumb title="Menu List" parent="Menu" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <AddButton link="softMenu/add"/>
                                <div className="card-body datatable-react">
                                    {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                    (
                                        <Datatable
                                            isColumn={true}
                                            columns={columns}
                                            multiSelectOption={false}
                                            myData={allSoftMenus}
                                            pageSize={5}
                                            pagination={true}
                                            class="-striped -highlight"
                                            editLink="softMenu/edit"
                                            deleteLink={SOFTWARE_MENU_RSURL}
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