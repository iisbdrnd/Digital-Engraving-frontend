import React from 'react';
import Module from './ModulesAndLinks/Module';



const UserAccessModules = ({modulesData,loading, allMenuAndResourceChecked, handleSelectMenu, handleSelectChildMenu, handleSelectInternalLinks, handleSelectParentInternalLinks, handleRoleChange, saveData }) => {
    return (
        <>
            <Module modulesData={modulesData} loading={loading} allMenuAndResourceChecked={allMenuAndResourceChecked} handleSelectMenu={handleSelectMenu} handleSelectChildMenu={handleSelectChildMenu} handleSelectParentInternalLinks={handleSelectParentInternalLinks} handleSelectInternalLinks={handleSelectInternalLinks} handleRoleChange={handleRoleChange} saveData={saveData} />
        </>
    );
};

export default UserAccessModules;