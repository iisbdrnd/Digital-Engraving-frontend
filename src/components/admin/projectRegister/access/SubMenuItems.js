import React, { Fragment } from 'react';
import { Accordion, AccordionItem } from 'react-light-accordion';
import { ListGroupItem, Collapse, CardHeader, CardBody} from 'reactstrap';
import 'react-light-accordion/demo/css/index.css';
import MenuItem from './MenuItem';



const SubMenuItems = (props) => {


  	const LinkCheckBox = (props) => {
		return(
			<div className="collapse show" id="collapseicon" aria-labelledby="collapseicon" data-parent="#accordionoc">
				<div className="card">
					<div className="form-group row offset-md-1 mt-10">
						<div className="col-sm-12 m-checkbox-inline">

							{props.internalLinks.map((item, index)=>(
								<div className="checkbox checkbox-dark" key={index.toString()}>
									<input id={'internal_link'+item.id} type="checkbox" name={item.link_name} defaultChecked={true} />
									<label for={'internal_link'+item.id}>{item.link_name.toUpperCase()} f_l</label>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		)
	};

	console.log('sub level', props.item2Data);
	console.log('sub le menus', props.allMenus);
  return (
    <Fragment>
      <div className="card">
		  { 
		  	props.allMenus.length > 0 ?  
			  
				<Accordion atomic={true}>

					{props.allMenus.map((item3, index3) =>           
					(
						<>
							{
								props.item2Data.id === item3.parent_id ? 

									<div className="card">
										<div className="form-group">
											<MenuItem data={item3} />
										</div>
									</div>
									// <div className="row" key={index.toString()}>
									// 	<div className="col-sm-1 checkbox checkbox-dark">
									// 		<input id={'menu-'+item.id} type="checkbox" />
									// 		<label htmlFor={'menu_'+item.id}></label>
									// 	</div>
									// 	<div className="col-sm-11">
									// 		{/* <AccordionItem className="card-header bg-primary" title={item.menu_name}> */}
									// 		<AccordionItem className="card-header bg-primary" title='s_menu'>
									// 			{
									// 				item.internal_links.length > 0 ? 
									// 					<LinkCheckBox internalLinks={item.internal_links} />
									// 				: 
									// 				  <>
									// 						{props.allMenus.map((item2, index2) =>           
									// 							(
									// 								<>
									// 									{
									// 										item2.parent_id === item.id ? 
																					
									// 											<div className="card">
									// 												<div className="form-group">
									// 													<MenuItem data={item2} />
									// 												</div>
									// 											</div>
																				
									// 										: ""																			
									// 									}
									// 								</>
									// 							)                
									// 						)} 
															
									// 				  </>

									// 			}
												
									// 		</AccordionItem>	
									// 	</div>
									// </div>
								: ""
							}
						</>
						
					)                
					)} 

				</Accordion>
			:
			<h1>Menu not found</h1>
		}

      </div>

    </Fragment>
  );

}

export default SubMenuItems;


