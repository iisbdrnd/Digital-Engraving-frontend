import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import Datatable from '../common/datatable';
import 'react-toastify/dist/ReactToastify.css';
import { adminGetMethod } from '../../../api/action';
import { SOFT_INTERNALLINK_RSURL } from '../../../api/adminUrl';
import { AddButton } from '../common/GlobalButton';

class ListData extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            allSoftInternalLinks: [],
            isLoading: true,
            isDelete: false,
            columns: [
                { Header: 'SL.', style: {textAlign: 'center'}, width: 50, Cell: (row) => <div>{row.index + 1}</div>, filterable: false },
                { Header: 'Folder', accessor: 'folder_name' },
                { Header: 'Link Name', accessor: 'link_name' },
                { Header: 'Route', accessor: 'route' },  
                { Header: 'Menu', accessor: 'menu_name' },
                { Header: 'Module', accessor: 'module_name' },
                { Header: 'Status', accessor: 'valid', width: 100, style: {textAlign: 'center'}, sortable: false, Cell: ({value}) => (value >= 1 ? 'Active' : 'Deactive'), filterable: false }
            ]
        }
    }

    componentDidMount() {
        let response = adminGetMethod(SOFT_INTERNALLINK_RSURL)
            .then(response => {
                this.setState({
                    allSoftInternalLinks : response.data,
                    isLoading: false,
                })
            })
        .catch(error => console.log(error))  
    }

    render() { 
        let { isLoading, allSoftInternalLinks, columns } = this.state
        return (
            <Fragment>
                <Breadcrumb title="Link List" parent="Internal Link" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <AddButton link="softInternalLink/add"/>
                                <div className="card-body datatable-react">
                                    {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                    (
                                        <Datatable
                                            isColumn={true}
                                            columns={columns}
                                            multiSelectOption={false}
                                            myData={allSoftInternalLinks}
                                            pageSize={5}
                                            pagination={true}
                                            class="-striped -highlight"
                                            editLink="softInternalLink/edit"
                                            deleteLink={SOFT_INTERNALLINK_RSURL}
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