import React,{useState} from 'react';
import { ListGroupItem, Collapse, CardHeader, CardBody} from 'reactstrap';
import { isStyledComponent } from 'styled-components';
import ThirdLevelMenu from './ThirdLevelMenu';


const MenuItem = (props) => {
    const [collapse, setcollapse] = useState(false);
    const [subChecked, setSubChecked] = useState(false);
    
    const toggle = () => {
        setcollapse(!collapse)
    }

    const LinkCheckBox = (props) => {
        return(
            <div className="collapse show" id="collapseicon" aria-labelledby="collapseicon" data-parent="#accordionoc">
                <div className="card">
                    <div className="form-group row offset-md-1 mt-10">
                        <div className="col-sm-12 m-checkbox-inline">

                            {props.internalLinks.map((item, index)=>(
                                <div className="checkbox checkbox-dark" key={index.toString()}>
                                    <input id={'internal_link'+item.id} type="checkbox" name={item.link_name} defaultChecked={true} />
                                    <label htmlFor={'internal_link'+item.id}>{item.link_name.toUpperCase()}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    const item2 = props.item2Data;
    const subCheckBoxHandle = (e) => {
		setSubChecked(e.target.subChecked)
	}

    return (
        <ListGroupItem>
            <div className="card m-1">
                <div className="row" key={item2.id}>
                    <div className="col-sm-1 checkbox checkbox-dark">
                        <input 
                            id={'sub_menu_'+item2.id} 
                            type="checkbox" 
                            checked={subChecked}
                            onChange={(e) => subCheckBoxHandle(e)}
                        />
                        <label className="parentLabel" htmlFor={'sub_menu_'+item2.id}></label>
                    </div>
                    
                    <div className="col-sm-11">
                        <CardHeader className="mb-0 bg-primary card-header" style={{padding: "0.2rem 1.25rem"}} onClick={toggle}>
                            <h5 className="mb-0">
                                <button className="btn btn-link pl-0 txt-white" data-toggle="collapse" onClick={toggle}
                                aria-expanded={item2.internal_links.length > 0 ? collapse : true } data-target="#collapseicon" aria-controls="collapseicon">
                                    {item2.menu_name}
                                </button>
                            </h5>
                        </CardHeader>
                    </div>
                </div>
                {
                    item2.internal_links.length > 0 ? 
                        <Collapse isOpen={collapse}>
                            <CardBody>
                                <LinkCheckBox internalLinks={item2.internal_links} />
                            </CardBody>
                        </Collapse>
                    : 
                    <Collapse isOpen={collapse} style={{marginLeft: '50px'}}>
                        {props.allMenus.map((item3, index3) =>           
                            (
                                item3.parent_id >= 0 ?
                                <>
                                    {
                                        item3.parent_id === item2.id ? 
                                            <div className="card">
                                                <div className="form-group">
                                                    <ThirdLevelMenu item3Data={item3} />
                                                </div>
                                            </div>
                                        : ""
                                    }
                                </> : ""
                            )                
                        )} 
                    </Collapse>
                }
            </div>
        </ListGroupItem>   
    );
}

export default MenuItem






{/* <div className="card-body">
    <div className="default-according style-1" id="accordionoc">
        <div className="card">
            <div className="bg-primary card-header">
                <h5 className="mb-0">
                    <button className="btn btn-link txt-white " color="primary" aria-expanded="true" type="button">
                        <i className="icofont icofont-briefcase-alt-2"></i>Collapsible Group Item #<span className="digits">1</span>
                    </button>
                </h5>
            </div>
            <div className="collapse show" style="">
                <div className="card-body">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div>
            </div>
        </div>

        <div className="card">
            <div className="bg-primary card-header">
                <h5 className="mb-0">
                    <button className="btn btn-link txt-white " color="primary" aria-expanded="false" type="button">
                        <i className="icofont icofont-support"></i>Collapsible Group Item #<span className="digits">2</span>
                    </button>
                </h5>
            </div>
            <div className="collapse">
                <div className="card-body">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div>
            </div>
        </div>
    </div>
</div> */}