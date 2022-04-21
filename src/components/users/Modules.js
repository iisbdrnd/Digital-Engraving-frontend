import React from 'react';
import AppsModule from './AppsModule';

const Modules = (props) => props.allModule.map((mod, index) => {
    return <AppsModule key={index} 
        click={() => props.clicked(mod.id)}
        moduleName={mod.module_name}
        modulePrefix={mod.url_prefix}
        moduleId={mod.id}
        />
});

export default Modules;