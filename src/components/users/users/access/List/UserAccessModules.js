import React from 'react';
import Module from './ModulesAndLinks/Module';



const UserAccessModules = ({modulesData,loading, allMenuAndResourceChecked }) => {
    return (
        <>
            <Module modulesData={modulesData} loading={loading} allMenuAndResourceChecked={allMenuAndResourceChecked} />
        </>
    );
};

export default UserAccessModules;