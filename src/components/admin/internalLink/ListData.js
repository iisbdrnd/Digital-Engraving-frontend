import React, { Fragment, Component, useLayoutEffect, useState, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Link } from 'react-router-dom';
import Datatable from '../common/datatable';
import 'react-toastify/dist/ReactToastify.css';
import { adminGetMethod } from '../../../api/action'
import { internalLinkRsURL } from '../../../api/adminUrl'
import { AddButton } from '../../common/GlobalButton';

class ListData extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            allInternalLinks: [],
            isLoading: true,
            isDelete: false,
            columns: [
                { Header: 'SL.', style: {textAlign: 'center'}, width: 50, Cell: (row) => <div>{row.index + 1}</div>, filterable: false},
                { Header: 'Link Name', accessor: 'link_name', style: {textAlign: 'center'}},
                { Header: 'Route', accessor: 'route', style: {textAlign: 'center'} },
                { Header: 'Menu', accessor: 'menu_id', style: {textAlign: 'center'}, },
                { Header: 'Status', accessor: 'valid', width: 100, style: {textAlign: 'center'}, sortable: false, Cell: ({value}) => (value >= 1 ? 'Active' : 'Deactive'), filterable: false }
            ]
        }
    }

    componentDidMount() {
        let response = adminGetMethod(internalLinkRsURL)
            .then(response => {
                this.setState({
                    allInternalLinks : response.data.internalLinks,
                    isLoading: false,
                })
            })
        .catch(error => console.log(error))  
    }

    render() { 
        let { isLoading, allInternalLinks, columns } = this.state
        return (
            <Fragment>
                
                <Breadcrumb title="Internal Link List" parent="Internal Link" />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                
                                <AddButton link="internalLink/add"/>

                                <div className="card-body datatable-react">
                                    {isLoading ? (<img src={process.env.PUBLIC_URL+'/preloader.gif'} alt="Data Loading"/>):
                                    (
                                        <Datatable
                                            isColumn={true}
                                            columns={columns}
                                            multiSelectOption={false}
                                            myData={allInternalLinks}
                                            pageSize={5}
                                            pagination={true}
                                            class="-striped -highlight"
                                            editLink="internalLink/edit"
                                            deleteLink={internalLinkRsURL}
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