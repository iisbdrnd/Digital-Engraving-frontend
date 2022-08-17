import React, { useState }  from 'react';
import './ModulesAndLinks.css';
import ModuleInternalLinksItem from './ModuleInternalLinksItem';

const ModuleInternalLinks = ({data,singleSelect,software_menu_id}) => {

    
  const [clicked, setClicked] = useState("0");
  
 const handleToggle = (index) => {
  if (clicked === index) {
   return setClicked("0");
  }
  setClicked(index);
 };


    


    return (
        <>

        <ul className="p-2 d-flex flex-row justify-content-between align-items-center moduleInternalLinks">
            {data.map((internal_links, index) => (
                <ModuleInternalLinksItem
                software_menu_id={software_menu_id}
                singleSelect={singleSelect}
                  onToggle={() => handleToggle(index)}
                  active={clicked === index}
                key={index} internal_links={internal_links} />
            ))}
    </ul>
            
        </>
    );
};

export default ModuleInternalLinks;