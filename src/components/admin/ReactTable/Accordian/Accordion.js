import React , { useEffect, useState } from 'react';
import AccordionItem from './AccordionItem';
// import AccordionItem from './AccordionItem';
const data = [
  {
    question: "Ashadul",
    answer:
      "Tenetur ullam rerum ad iusto possimus sequi mollitia dolore sunt quam praesentium. Tenetur ullam rerum ad iusto possimus sequi mollitia dolore sunt quam praesentium.Tenetur ullam rerum ad iusto possimus sequi mollitia dolore sunt quam praesentium.",
    skill : [
        {name : 'js', isChecked :  true},
        {name : 'node'},
        {name : 'py'},
        {name : 'c#' , active: 'active'},
    ]
  },
  {
    question: "Sani",
    answer:
      "Aperiam ab atque incidunt dolores ullam est, earum ipsa recusandae velit cumque. Aperiam ab atque incidunt dolores ullam est, earum ipsa recusandae velit cumque.",
  },
  {
    question: "Sourav",
    isChecked: true,
    answer:
      "Blanditiis aliquid adipisci quisquam reiciendis voluptates itaque.",
    skill : [
        {name : 'js' , active : 'active'},
        {name : 'node'},
        {name : 'py' , active: 'active' , isChecked: true},
        {name : 'c'},
    ]
  },
  {
    question: "Mufid",
    answer:
      "Aperiam ab atque incidunt dolores ullam est, earum ipsa recusandae velit cumque. Aperiam ab atque incidunt dolores ullam est, earum ipsa recusandae velit cumque.",
  },
];

const Accordion = () => {

    
  const [clicked, setClicked] = useState("0");
  const [faqs , setFaqs] = useState([]);

  useEffect( () => {
    setFaqs(data)
  } ,[])
  
 const handleToggle = (index) => {
  if (clicked === index) {
   return setClicked("0");
  }
  setClicked(index);
 };


              // skill: [
              //   faq.skill.map( singleSkill => {
              //       return  {
              //         ...singleSkill ,
              //         isChecked : checked
              //     }
              //   })
              // ]

 const handleCheckChange = e => {
   const {name , checked} = e.target;
   if(name === "allSelect"){
     const updateData = faqs.map( faq =>  {
       if(faq?.skill){
          return { 
              ...faq, isChecked : checked ,
              skill: [
                faq.skill.map( singleSkill => {
                    return  {
                      ...singleSkill ,
                      isChecked : checked
                  }
                })
              ]
          }
       } else {
         return {...faq, isChecked : checked}
       }
       

     })
      setFaqs(updateData);
      console.log(updateData);
   }else {
      const updateData = faqs.map( faq => faq.question === name ? { ...faq , isChecked : checked} : faq  );
      setFaqs(updateData);
   }
  
 }

  const handleCheckChildChange = e => {
   const {name , checked} = e.target;
   if(name === "allSelect"){
     const updateData = faqs.map( faq =>  {
       return { 
            ...faq, isChecked : checked , 
            skill: [
              faq.skill.map( singleSkill => {
                   return  {
                    ...singleSkill ,
                    isChecked : checked
                }
              })
            ] 
        }

     })
      setFaqs(updateData);
      console.log(updateData);
   }else {
        console.log(name , checked);
        console.log(faqs);
      // const updateData = faqs.map( faq => faq.question === name ? { ...faq , isChecked : checked} : faq  );
      // setFaqs(updateData);
   }
  
 }


    return (
        <>
            <div className="card">
                <div className="card-header">
                    <div className="form-check">
                        <input
                        checked={ faqs.filter( faq => faq?.isChecked !== true).length < 1}
                        type="checkbox" name="allSelect" onChange={handleCheckChange} className="form-check-input" id="all-select" />
                        <label className="form-check-label" htmlFor="all-select">BPack</label>
                    </div>
                </div>
                
                <div className="card-body">
                    <ul className="list-group m-2">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                            onToggle={() => handleToggle(index)}
                            handleCheckChange={handleCheckChange}
                            handleCheckChildChange={handleCheckChildChange}
                            active={clicked === index}
                            key={index} faq={faq} />
                        ))}
                    </ul>
                </div>
                
            </div>
        </>
    );
};

export default Accordion;