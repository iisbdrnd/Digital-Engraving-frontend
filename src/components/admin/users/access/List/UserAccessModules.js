import React from 'react';
import Module from './ModulesAndLinks/Module';



const UserAccessModules = ({modulesData,loading, handleCheckChange, singleSelect,saveData}) => {
    return (
        <>
            <Module modulesData={modulesData} loading={loading} handleCheckChange={handleCheckChange} singleSelect={singleSelect} saveData={saveData}/>
        </>
    );
};

export default UserAccessModules;