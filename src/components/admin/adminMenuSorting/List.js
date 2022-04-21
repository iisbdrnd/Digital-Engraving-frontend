import React, { Fragment, Component } from 'react';
import Nestable from "react-nestable";
import { createNestedMenu, generateFlatMenu, menus } from "./helper";
import Breadcrumb from '../../common/breadcrumb';
import { adminPostMethod, adminGetMethod } from '../../../api/action';
import { menuSorting, menuSortingAction } from '../../../api/adminUrl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
          itemsTemp: []
        };

        this.handleOnChangeSort = this.handleOnChangeSort.bind(this);
        this.handleGenerate = this.handleGenerate.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        let response = adminGetMethod(menuSorting)
            .then(response => {
                console.log('data',response.data.adminMenu);
                this.setState({
                    itemsTemp: createNestedMenu(response.data.adminMenu)
                    // itemsTemp: response.data.adminMenu
                });
                console.log('update',this.state.itemsTemp);
            })
        .catch(error => console.log(error))  
    }

    handleOnChangeSort(items) {
        this.setState({
          itemsTemp: items
        });
        console.log('handleOnChangeSort',this.state.itemsTemp);

    }

    handleGenerate() {
        const { itemsTemp } = this.state;
        const flatMenu = generateFlatMenu(itemsTemp);
    }

    submitHandler(e){
        e.preventDefault();
        console.log('data',this.state.itemsTemp);
        
        const postData = {
            requestData: this.state.itemsTemp
        };

        console.log('postData',postData);

        let response = adminPostMethod(menuSortingAction, postData)
            .then(response => {
                if (response.data.status == 1) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            })
        .catch(error => toast.error(error))
    }
    
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Admin Menu Shorting" parent="Admin" />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <form onSubmit={this.submitHandler}>
                                    <div className="card-body">
                                        <Nestable
                                            collapsed={true}
                                            maxDepth={3}
                                            items={this.state.itemsTemp}
                                            renderItem={({ item, collapseIcon }) => (
                                                <div className="listMenu">
                                                    {collapseIcon}
                                                    {item.menu_name}
                                                </div>
                                            )}
                                            onChange={this.handleOnChangeSort}
                                            renderCollapseIcon={({ isCollapsed }) =>
                                            isCollapsed ? 
                                                (
                                                    <span className="iconCollapse">+</span>
                                                ) 
                                                : 
                                                (
                                                    <span className="iconCollapse">-</span>
                                                )
                                            }
                                        />

                                    </div>

                                    <div className="card-footer">
                                        <button className="btn btn-primary mr-1" type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<List />, rootElement);

export default List;