import React, { Fragment, useState } from 'react';
import { Accordion, AccordionItem } from 'react-light-accordion';
import { ListGroupItem, Collapse, CardHeader, CardBody} from 'reactstrap';
import 'react-light-accordion/demo/css/index.css';
import MenuItem from './MenuItem';
import SubMenuItems from './SubMenuItems';



const MenuItems = (props) => {
    const [parentChecked, setParentChecked] = useState(false);
    const [menuArray, setMenuArray] = useState([]);

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

	const parentCheckBoxHandle = (e, menu_pk) => {
		setParentChecked(!e.target.parentChecked)
		// console.log('check ID ', e.target.id);
		// console.log('check status ', menu_pk);
		let isExist = menuArray.some(item => menu_pk === item );
		if (!isExist) {
			setMenuArray([...menuArray, menu_pk]);
		} 
		// else {
		// 	const index = menuArray.indexOf(5);
		// 	if (index > -1) {
		// 		menuArray.splice(index, 1);
		// 	}
		// }
		// console.log('statement ', isExist);
		// console.log('menu_array ', menuArray);
	}

	return (
		<Fragment>
			<div className="card">
				{ 
					props.menuList.length > 0 ?  
					
						<Accordion atomic={true}>

							{props.menuList.map((item, index) =>           
							(
								<>
									{
										item.parent_id === 0 ? 
											<div className="row" key={index}>
												<div className="col-sm-1 checkbox checkbox-dark">
													<input 
														id={'menu_'+item.id} 
														type="checkbox" 
														checked={parentChecked}
        												onChange={(e) => parentCheckBoxHandle(e, 'menu_'+item.id)}
														value={item.id}
													/>
													<label className="parentLabel" htmlFor={'menu_'+item.id}></label>
												</div>
												<div className="col-sm-11">
													<AccordionItem className="card-header bg-primary" title={item.menu_name}>
														{
															item.internal_links.length > 0 ? 
																<LinkCheckBox internalLinks={item.internal_links} />
															: 
																<>
																	{props.menuList.map((item2, index2) =>           
																		(
																			item2.parent_id >= 0 ?
																			<>
																				{
																					item2.parent_id === item.id ? 
																						<div className="default-according style-1" key={item2.id}>
																							<div className="card">
																								<div className="form-group">
																									<MenuItem data={item2} allMenus={props.menuList} item2Data={item2} item1Data={item} />
																								</div>
																							</div>
																						</div>
																					: ""
																				}
																			</> : ""
																		)                
																	)} 
																</>
														}
														
													</AccordionItem>	
												</div>
											</div>
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

export default MenuItems;


