import React, { useState } from "react";
import ModuleItemMenuItem from "./ModuleItemMenuItem";

export const faqs = [
  {
    question: "Lorem ipsum dolor sit amet?",
    answer:
      "Tenetur ullam rerum ad iusto possimus sequi mollitia dolore sunt quam praesentium. Tenetur ullam rerum ad iusto possimus sequi mollitia dolore sunt quam praesentium.Tenetur ullam rerum ad iusto possimus sequi mollitia dolore sunt quam praesentium.",
  },
  {
    question: "Dignissimos sequi architecto?",
    answer:
      "Aperiam ab atque incidunt dolores ullam est, earum ipsa recusandae velit cumque. Aperiam ab atque incidunt dolores ullam est, earum ipsa recusandae velit cumque.",
  },
  {
    question: "Voluptas praesentium facere?",
    answer:
      "Blanditiis aliquid adipisci quisquam reiciendis voluptates itaque.",
  },
];

const ModuleItemMenu = ({data}) => {
    const [clicked, setClicked] = useState("0");

    console.log('sala', data);

    
 const handleToggle = (index) => {
  if (clicked === index) {
   return setClicked("0");
  }
  setClicked(index);
 };

  return (
    <ul className="list-group">
      {data.map((menu, index) => (
        <ModuleItemMenuItem onToggle={() => handleToggle(index)} active={clicked === index} key={index} moduleMenu={menu} />
      ))}
    </ul>
  );
};

export default ModuleItemMenu;