export const adminLogin              = 'api/admin/login';
export const adminMe                 = 'api/admin/me';
export const productList             = 'api/admin/product/productList';

// USER URL
export const usersRsurl              = 'api/admin/users';
// ADMIN URL
export const adminsRsurl             = 'api/admin/admins';
// PROJECT URL
export const projectRsURL            = 'api/admin/projects';

export const polishingRsURL          = 'api/admin/polishing';
// MENU URL
export const menuRsURL               = 'api/admin/menu';
// ADMIN INTERNAL LINK URL
export const internalLinkRsURL       = 'api/admin/internalLink';
// ADMIN MENU SHORTING
export const menuSorting             = 'api/admin/menuSorting';
export const menuSortingAction       = 'api/admin/menuSortingAction';
// ADMIN MENU ACCESSING
export const ADMIN_ACCESS            = 'api/admin/adminAccess';
export const ADMIN_ACCESS_ACTION     = 'api/admin/adminAccessAction';

// SOFTWARE MODULE URL
export const SOFTWARE_MODULE_RSURL   = 'api/admin/softwareModule';
// SOFTWARE MENU URL
export const SOFTWARE_MENU_RSURL     = 'api/admin/softwareMenu';
export const SOFTWARE_GETMODULES     = 'api/admin/getModules';
export const SOFTWARE_GETMENUS       = 'api/admin/getMenus';
// SOFTWARE MENU URL
export const SOFT_INTERNALLINK_RSURL = 'api/admin/softwareInternalLink';
// SOFTWARE MENU SORTING ACTION
export const SOFT_MENU_SORTING_ACTION = 'api/admin/softwareMenuSortingAction';

// PROJECT ACCESSING SYSTEM
export const GET_FOLDER = 'api/admin/projects/getFolder';
export const GET_MODULE = 'api/admin/projects/getModule';
export const GET_MENUS_FOR_MODULE = 'api/admin/projects/getMenusForModule';
export const STORE_PROJECT_ACCESSING = 'api/admin/projects/projectAccessingStore';


// USER ACCESSING SYSTEM
export const GET_USER_MODULE = 'api/admin/users/getModule';
export const GET_USER_MENUS_FOR_MODULE = 'api/admin/users/getMenusForModule';
export const STORE_USER_ACCESSING = 'api/admin/users/userAccessingStore';


// DESIGNATION URL
export const designationRsURL = 'api/admin/designations';
// DEPARTMENTS URL
export const DEPARTMENTS_RSURL = 'api/admin/departments';


// POST      | api/admin/users                              | admin.users.store     | App\Http\Controllers\Admin\UsersController@store         
// GET|HEAD  | api/admin/users                              | admin.users.index     | App\Http\Controllers\Admin\UsersController@index       
// GET|HEAD  | api/admin/users/create                       | admin.users.create    | App\Http\Controllers\Admin\UsersController@create      
// DELETE    | api/admin/users/{user}                       | admin.users.destroy   | App\Http\Controllers\Admin\UsersController@destroy     
// PUT|PATCH | api/admin/users/{user}                       | admin.users.update    | App\Http\Controllers\Admin\UsersController@update      
// GET|HEAD  | api/admin/users/{user}                       | admin.users.show      | App\Http\Controllers\Admin\UsersController@show        
// GET|HEAD  | api/admin/users/{user}/edit                  | admin.users.edit      | App\Http\Controllers\Admin\UsersController@edit          