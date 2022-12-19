
// const menus = [
//     { id : 1 , status: 1, parent_id: 0 , menu_name : "Back Office Setup",
//         internal_links : [
//             {id: 77, name : 'add', status: 1,},
//             {id: 77, name : 'edit',  status: 0,},
//         ]
//     },
//     { id : 2 , status: 1, parent_id: 1 , menu_name : "Department"},
//     { id : 3 , status: 1, parent_id: 1 , menu_name : "Company profile"},
//     { id : 4 , status: 0, parent_id: 0 , menu_name : "Configaration"},
//     { id : 5 , status: 0, parent_id: 4 , menu_name : "Role",
//         internal_links : [
//             {id: 77, name : 'add', status: 0,},
//             {id: 77, name : 'edit',  status: 0,},
//         ]
//     },
//     { id : 6 , status: 1, parent_id: 0 , menu_name : "Home"}
// ]

 export const softwareMenuRearrange = (menus) => {
    const rearrangeMenu = [];

    for (const menu of menus) {
        if(menu.parent_id === 0){
            const children = []

            for (const childMenu of menus) {

                if (childMenu.parent_id === menu.id) {

                    let childMenuCopy = {...childMenu}
                    const thiredChildren = []

                    for( const thiredChildMenu of menus){

                        if (thiredChildMenu.parent_id === childMenu.id) {
                            thiredChildren.push(thiredChildMenu)
                        }

                    }

                    childMenuCopy = {
                        ...childMenuCopy,
                        children : thiredChildren
                    }
                    children.push(childMenuCopy)
                }
            }

            
            if(children.length > 0){

                let ifAnyChildrenTrue  = children.some( (child) => child.isTrue === true)

                const menuWithChildren = {
                    ...menu,
                    isTrue: ifAnyChildrenTrue,
                    children : children
                }

                rearrangeMenu.push(menuWithChildren)

            } else {

                const menuWithChildren = {
                ...menu,
                    children : children
                }

                rearrangeMenu.push(menuWithChildren)

            }

            

        }
    }

    console.log('pera', rearrangeMenu);
    return rearrangeMenu;

}


export const setUserAlreadyMenuAccess = (userMenu , alreadyAccessMenu) => {
    // get data whice check true
    let modulesCheckTrueData = [];
    for (const menu of userMenu) {
        for (const roleMenu of alreadyAccessMenu ){
            
            if( menu.id === roleMenu.id){

                let roleMenuData = {...menu , isTrue : true}

                const internalLinksHaveAccess = []
                for( const menuInternalLink of menu?.internal_links ){
                    for( const roleMenuInternalLink of roleMenu?.internal_links) {

                        if(menuInternalLink.id === roleMenuInternalLink.id ){
                            internalLinksHaveAccess.push({...menuInternalLink, isTrue: true})
                        } 
                    }
                }

                let internalLinksWithOutCheck = menu?.internal_links?.filter(function(menu){
                    return !roleMenu?.internal_links.some(function(checkmenu){   
                        return menu.id === checkmenu.id;          
                    });
                });

                let internalLinksWithOutCheckFalse = internalLinksWithOutCheck?.map( link => {
                    return {...link , isTrue: false}
                })

                const menuAccessInternalLinks = [
                    ...internalLinksHaveAccess,
                    ...internalLinksWithOutCheckFalse
                ]

                console.log('bla', menuAccessInternalLinks);

                roleMenuData = {
                    ...roleMenuData,
                    internal_links : menuAccessInternalLinks
                }
                modulesCheckTrueData.push(roleMenuData);

            }  

        }
    }

    /* Filtering the menusWithOutCheck array and returning the menus that are not in the
    modulesRoleCheckTrueData array. */
    let menusWithOutCheck = userMenu?.filter(function(menu){
        return !modulesCheckTrueData.some(function(checkmenu){   
            return menu.id === checkmenu.id;          
        });
    });

    // if the array of object have isTrue True then remove
    const menusWithOutCheckAllFalse =  menusWithOutCheck.map( (menu) => {
        let newMenu = {
            ...menu,
            isTrue : false
        }

        if(menu.internal_links.length > 0){
            const newMenuInternallinks = menu.internal_links.map( (links) => {
                return { ...links , isTrue : false }
            } )
            newMenu = {
                ...newMenu, 
                internal_links : newMenuInternallinks
            }
            return newMenu;
        } else{
        return newMenu; 
        }
    })


    /* Creating a new array from the two arrays. */
    const newSoftwareMenus = [
        ...modulesCheckTrueData,
        ...menusWithOutCheckAllFalse
    ]

    return newSoftwareMenus;
}