import React,{useState} from 'react';
import { ListGroupItem, Collapse, CardHeader, CardBody} from 'reactstrap';
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';

const things = {
	idk: {
	  title: 'Simple',
	  desc: " Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. "
	},
	another: {
	  title: <span _ngcontent-dye-c11="" className="ng-star-inserted">'★' <b _ngcontent-dye-c11="">'Fancy'</b> 'title ★'</span>,
	  desc: " Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS. "
	},
  }

const MenuItems = (props) => {
  const [collapse, setcollapse] = useState(false);
  
  const toggle = () => {
    setcollapse(!collapse)
  }

  const Data = things.idk;
    return (

		<Accordion defaultActiveKey="0">
			<AccordionItem eventKey="0">

					<ListGroupItem>
						<div>
							<CardHeader className="mb-0" onClick={toggle}>
								<strong>{Data.title}</strong>
							</CardHeader>
							<Collapse isOpen={collapse}>
								<CardBody>
								{Data.desc}
								</CardBody>
							</Collapse>
						</div>
					</ListGroupItem>	

				


			</AccordionItem>
			<AccordionItem>
				
			</AccordionItem>
		</Accordion>

      
    );
}

export default MenuItems