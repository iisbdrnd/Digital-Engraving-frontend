import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';
import { Link, Redirect } from 'react-router-dom';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userDeleteMethod } from '../../../api/userAction'
import { EditButton, DeleteButton } from '../../common/GlobalButton';

export class Datatable2 extends Component {
    constructor(props) {
        super(props)
        this.deleteHandler = this.deleteHandler.bind(this);
        this.state = {
            checkedValues: [],
            myData: this.props.myData,
            isColumn: this.props.isColumn,
            isDelete: this.props.isDelete,

            data: this.props.data,
            // data: this.props.data,
            pages: this.props.pages,
        }
    }

    selectRow = (e, i) => {
        if (!e.target.checked) {
            this.setState({
                checkedValues: this.state.checkedValues.filter((item, j) => i !== item)
            });
        } else {
            this.state.checkedValues.push(i);
            this.setState({
                checkedValues: this.state.checkedValues
            })
        }
    }

    handleRemoveRow = () => {
        const selectedValues = this.state.checkedValues;
        const updatedData = this.state.myData.filter(function (el) {
            return selectedValues.indexOf(el.id) < 0;
        });
        this.setState({
            myData: updatedData
        })
        toast.success("Successfully Deleted !")
    };

    renderEditable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.myData];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ myData: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.myData[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    innerCaseInsensitive(filter, row, column){
        const id = filter.pivotId || filter.id;
        if (typeof filter.value === "object") {
            return (
                row[id] !== undefined
                ? filter.value.indexOf(row[id]) > -1 || String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
                : true
                );
        } else {
            return (
                row[id] !== undefined
                ? String(row[id]).indexOf(filter.value) > -1 || String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
                : true
                );
        }
    }

    deleteHandler(itemId){
        const { deleteLink } = this.props
        let response = userDeleteMethod(deleteLink, itemId)
            .then(response => {
                if (response.data.status == 1) {
                    let newData = this.state.myData.filter(data => data.id != itemId);
                    this.setState({
                        myData: newData,
                        isDelete: true
                    })
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(error => toast.error(error));
    }

    render() {
        const {pageSize, myClass, multiSelectOption, pagination, editLink, menuId ,accessLink } = this.props;
        const { myData, isColumn, isDelete, pages } = this.state;
        
        if (isColumn === false) {
            var columns = [];

            for (var key in myData[0]) {

                let editable = this.renderEditable
                if (key === "image") {
                    editable = null;
                }
                if (key === "status") {
                    editable = null;
                }
                if (key === "avtar") {
                    editable = null;
                }
                if (key === "vendor") {
                    editable = null;
                }
                if (key === "skill") {
                    editable = null;
                }
                if (key === "user") {
                    editable = null;
                }
    
                columns.push(
                    {
                        Header: <b>{this.Capitalize(key.toString())}</b>,
                        accessor: key,
                        Cell: editable,
                        style: {
                            textAlign: 'center'
                        }
                    });
            }
        } else {
            var { columns } = this.props

            for (var key in myData[0]) {

                let editable = this.renderEditable
                if (key === "image") {
                    editable = null;
                }
                if (key === "status") {
                    editable = null;
                }
                if (key === "avtar") {
                    editable = null;
                }
                if (key === "vendor") {
                    editable = null;
                }
                if (key === "skill") {
                    editable = null;
                }
                if (key === "user") {
                    editable = null;
                }
            }
        }
        
        if (multiSelectOption === true) {
            columns.push(
                {
                    Header: <button className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
                        onClick={
                            (e) => {
                                if (window.confirm('Are you sure you wish to delete this item?'))
                                    this.handleRemoveRow()
                            }}>Delete</button>,
                    id: 'delete',
                    accessor: str => "delete",
                    sortable: false,
                    filterable: false,
                    style: {
                        textAlign: 'center'
                    },
                    width: 100,
                    Cell: (row) => (
                        <div>
                            <span >
                                <input type="checkbox" name={row.original.id} defaultChecked={this.state.checkedValues.includes(row.original.id)}
                                    onChange={e => this.selectRow(e, row.original.id)} />
                            </span>
                        </div>
                    ),
                    accessor: key,
                    style: {
                        textAlign: 'center'
                    }
                }
            )
        } else {
            if (!isDelete) {
                columns.push(
                    {
                        type: 'deletion',
                        Header: <b>Action</b>,
                        id: 'delete',
                        accessor: str => "delete",
                        width: 100,
                        filterable: false,
                        style: {textAlign: 'center'},
                        sortable: false,
                        Cell: (row) => (
                            <div>
                                <div>
                                    <span>
                                        <EditButton link={`${process.env.PUBLIC_URL}/${editLink}/${row.original.id}`} menuId={ menuId } />
                                        {/* <Link to={`${process.env.PUBLIC_URL}/${editLink}/${row.original.id}`} className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: 'rgb(40, 167, 69)', cursor: "pointer" }}></Link> */}
                                    </span>
                                    <DeleteButton deleteHandler = {this.deleteHandler} dataId={row.original.id} menuId={ menuId } />
                                    {/* <span onClick={() => {
                                        if (window.confirm('Are you sure you wish to delete this item?')) {
                                            this.deleteHandler(row.original.id)
                                        } else {
                                            // console.log(row.original.id);
                                            toast.error('Data Still Safe');
                                        }
                                    }}>
                                    
                                        <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: '#e4566e', cursor: 'pointer' }}
                                        ></i>
                                    </span> */}
                                    {accessLink ? 
                                    <Link to={`${process.env.PUBLIC_URL}/${accessLink}/${row.original.id}`} className="" style={{ textAlign:"center", padding:"5px", background: "lavender", cursor: "pointer", borderRadius: "25px", display: "flex", justifyContent: "center", boxShadow: "3px 2px 8px #AF7ABB", marginTop: "4px"}}>Access</Link>
                                : ''
                                
                                }
                                </div>
                                
                            </div>
                        )
                    }
                ) 
            }
        }

        return (
            <Fragment>
                <ReactTable
                    data={myData}
                    columns={columns}
                    defaultPageSize={pageSize}
                    className={myClass}
                    showPagination={pagination}
                    filterable
                    defaultFilterMethod={ (filter, row) => this.innerCaseInsensitive(filter, row) }
                />
                <ToastContainer />
            </Fragment>
        )
    }
}

export default Datatable2;