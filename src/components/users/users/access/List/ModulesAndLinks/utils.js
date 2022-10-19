
// const menus = [
//     { id : 1 , parentId: 0 , menu_name : "Back Office Setup"},
//     { id : 2 , parentId: 1 , menu_name : "Department"},
//     { id : 3 , parentId: 1 , menu_name : "Company profile"},
//     { id : 4 , parentId: 0 , menu_name : "Configaration"},
//     { id : 5 , parentId: 4 , menu_name : "Role"},
//     { id : 6 , parentId: 0 , menu_name : "Home"}
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

// console.log(softwareMenuRearrange());