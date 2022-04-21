import React, { Fragment, Component } from 'react';
import Breadcrumb from '../common/breadcrumb';
import Datatable from '../common/datatable';
import 'react-toastify/dist/ReactToastify.css';
import { adminGetMethod } from '../../../api/action'
import { menuRsURL } from '../../../api/adminUrl'
import { AddButton } from '../../common/GlobalButton';

class ListData extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            allMenus: [],
            isLoading: true,
            isDelete: false,
            columns: [
                { Header: 'SL.', style: {textAlign: 'center'}, width: 50, Cell: (row) => <div>{row.index + 1}</div>, filterable: false},
                { Header: 'Menu Name', accessor: 'menu_name', style: {textAlign: 'center'}},
                { Header: 'Route', accessor: 'route', style: {textAlign: 'center'} },
                { Header: 'Parent Menu', accessor: 'parent_id', style: {textAlign: 'center'}, },
                { Header: 'Status', accessor: 'valid', width: 100, style: {textAlign: 'center'}, sortable: false, Cell: ({value}) => (value >= 1 ? 'Active' : 'Deactive'), filterable: false }
            ]
        }
    }

    componentDidMount() {
        let response = adminGetMethod(menuRsURL)
            .then(response => {
                this.setState({
                    allMenus : response.data.menus,
                    isLoading: false,
                })
            })
        .catch(error => console.log(error))  
    }

    render() { 
        let { isLoading, allMenus, columns } = this.state
        return (
            <Fragment>
                
                <Breadcrumb title="Menu List" parent="Menu" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                
                                <AddButton link="menu/add"/>

                                <div className="card-body datatable-react">
                                    {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                    (
                                        <Datatable
                                            isColumn={true}
                                            columns={columns}
                                            multiSelectOption={false}
                                            myData={allMenus}
                                            pageSize={5}
                                            pagination={true}
                                            class="-striped -highlight"
                                            editLink="menu/edit"
                                            deleteLink={menuRsURL}
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