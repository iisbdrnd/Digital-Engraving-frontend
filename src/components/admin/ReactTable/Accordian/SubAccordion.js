import React, { useState }  from 'react';
import SubAccordionItem from './SubAccordianItem';

const SubAccordion = ({data,handleCheckChildChange}) => {

    
  const [clicked, setClicked] = useState("0");
  
 const handleToggle = (index) => {
  if (clicked === index) {
   return setClicked("0");
  }
  setClicked(index);
 };


    


    return (
        <>

        <ul className="list-group m-2">
            {data.map((skill, index) => (
                <SubAccordionItem
                    handleCheckChildChange={handleCheckChildChange}
                  onToggle={() => handleToggle(index)}
                  active={clicked === index}
                key={index} skill={skill} />
            ))}
    </ul>
            
        </>
    );
};

export default SubAccordion;