
// const menus = [
//     { id : 1 , parent_id: 0 , menu_name : "Back Office Setup"},
//     { id : 2 , parent_id: 1 , menu_name : "Department"},
//     { id : 3 , parent_id: 1 , menu_name : "Company profile"},
//     { id : 4 , parent_id: 0 , menu_name : "Configaration"},
//     { id : 5 , parent_id: 4 , menu_name : "Role"},
//     { id : 6 , parent_id: 0 , menu_name : "Home"}
// ]
 export const softwareMenuRearrange = (menus) => {
    const rearrangeMenu = [];

    for (const menu of menus) {
        if(menu.parent_id === 0){
            const children = []

            for (const childMenu of menus) {
                if (childMenu.parent_id === menu.id) {
                    children.push(childMenu)
                }
            }

            const menuWithChildren = {
                ...menu,
                children : children
            }

            rearrangeMenu.push(menuWithChildren)

        }
    }

    return rearrangeMenu;
}



export const setUserAlreadyMenuAccess = (menus) => {
    const accessGiven = menus.map( (menu) => {

        let internal_links;
        if (menu.internal_links) {
            internal_links = menu.internal_links.map( (link) => {
                if (link.status === 1) {
                    return {...link, isTrue: true}
                }else{
                    return link
                }
            })
        }

        const someInternalLinkTrue = internal_links?.some( (link) => link.isTrue === true )

        if (menu.status === 1) {
            return {...menu , internal_links : internal_links, isTrue: true}
        } else if(someInternalLinkTrue){
            return {...menu , internal_links : internal_links, isTrue: true}
        } else {
            return { ...menu , internal_links}
        }

    } )

    return accessGiven;

}