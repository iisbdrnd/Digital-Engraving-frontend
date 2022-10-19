import React from 'react';
import Module from './ModulesAndLinks/Module';



const UserAccessModules = ({modulesData,loading }) => {
    return (
        <>
            <Module modulesData={modulesData} loading={loading} />
        </>
    );
};

export default UserAccessModules;