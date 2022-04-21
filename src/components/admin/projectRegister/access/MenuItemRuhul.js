import React,{useState} from 'react';
import { ListGroupItem, Collapse, CardHeader, CardBody} from 'reactstrap';
import { isStyledComponent } from 'styled-components';



const MenuItem = (props) => {
  const [collapse, setcollapse] = useState(false);
  
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
                                <label for={'internal_link'+item.id}>{item.link_name.toUpperCase()}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

  const data = props.data;
    return (
        <ListGroupItem>
            <div className="m-15">
                <CardHeader className="mb-0" onClick={toggle}>
                    <strong>{data.menu_name}</strong>
                </CardHeader>
                {
                    data.internal_links.length > 0 ? 
                        <Collapse isOpen={collapse}>
                            <CardBody>
                                <LinkCheckBox internalLinks={data.internal_links} />
                            </CardBody>
                        </Collapse>
                    : ""
                }
            </div>
        </ListGroupItem>      
    );
}

export default MenuItem