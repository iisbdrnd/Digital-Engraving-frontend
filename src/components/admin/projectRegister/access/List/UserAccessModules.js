import React from 'react';
import Module from './ModulesAndLinks/Module';



const UserAccessModules = ({modulesData,loading, allMenuAndResourceChecked, handleSelectMenu, handleSelectChildMenu, handleSelectSubChildMenu, handleSelectParentInternalLinks, handleSelectSubChildInternalLinks, handleRoleChange, saveData }) => {
    return (
        <>
            <Module modulesData={modulesData} loading={loading} allMenuAndResourceChecked={allMenuAndResourceChecked} handleSelectMenu={handleSelectMenu} handleSelectChildMenu={handleSelectChildMenu} handleSelectParentInternalLinks={handleSelectParentInternalLinks} handleSelectSubChildInternalLinks={handleSelectSubChildInternalLinks}           handleSelectSubChildMenu={handleSelectSubChildMenu} handleRoleChange={handleRoleChange} saveData={saveData} />
        </>
    );
};

export default UserAccessModules;