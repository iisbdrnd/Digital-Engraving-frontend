import React from 'react';
import Accordion from './Accordian/Accordion';
import AllCheckbox from './Accordian/AllCheckbox';

const data = [
    {name: 'Ashadul'},
    {name: 'Sani'},
    {name: 'Sourav'},
    {name: 'Shihab'},
    {
        name: 'Shuvo',
        children: [
            {name: 'Sani'},
            {name: 'Sourav'},
            {name: 'Shihab'},
        ]
    },
]
console.log(data);

const Bpack = () => {
    return (
        <>
            <Accordion />
            <AllCheckbox />
        </>
    );
};

export default Bpack;