import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

class Datatable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedValues: [],
            myData: this.props.myData
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

    innerCaseInsensitive = (filter, row, column) => {
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
        console.log(itemId);
        axios.delete(`${process.env.REACT_APP_BASEURL}/api/admin/product/productDelete/${itemId}`)
        .then(response => {
            if (response.data.status == 1) {
                let newData = this.state.myData.filter(data => data.id != itemId);
                this.setState({
                    myData: newData 
                });
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        })
        .catch(error => toast.error(error));
    }

    render() {
        const {columns, pageSize, myClass, multiSelectOption, pagination, defaultFilterMethod } = this.props;
        const { myData } = this.state;
        // const { myData } = this.state;

        // const columns = [];
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

            // columns.push(
            //     {
            //         Header: <b>{this.Capitalize(key.toString())}</b>,
            //         accessor: key,
            //         Cell: editable,
            //         style: {
            //             textAlign: 'center'
            //         }
            //     });
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
                    style: {
                        textAlign: 'center'
                    },
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
                    },
                    filterable: false
                }
            )
        } else {
            columns.push(
                {
                    Header: <b>Action</b>,
                    id: 'delete',
                    accessor: str => "delete",
                    Cell: (row) => (
                        <div>
                            <span><i className="fa fa-pencil" style={{ width: 35, fontSize: 16, padding: 11, color: 'rgb(40, 167, 69)', cursor: "pointer" }}></i></span>
                            <span onClick={() => {
                                if (window.confirm('Are you sure you wish to delete this item?')) {
                                    this.deleteHandler(myData[row.index].id)
                                } else {
                                    console.log('nothing yet');
                                }
                            }
                                }>
                                <i className="fa fa-trash" style={{ width: 35, fontSize: 16, padding: 11, color: '#e4566e', cursor: "pointer" }}
                                ></i>
                            </span>
                        </div>
                    ),
                    style: {
                        textAlign: 'center'
                    },
                    sortable: false,
                    width: 100,
                    filterable: false
                }
            )
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

export default Datatable;