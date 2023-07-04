export const SIGNUP_PATH = '/final/user/adduser'
export const SIGNIN_PATH = '/final/user/auth'

// Admin
export const ADMIN_ALL_USERS = '/final/admin/allusers'
export const ADMIN_DELETE_USER = '/final/admin/allusers/deleteuser/:userid'

export const ADMIN_ALL_WAREHOUSE = '/final/admin/allwarehouse'
export const ADMIN_ALL_MANAGERS = '/final/admin/allmanagers'
export const ADMIN_ADD_MANAGER = '/final/admin/allmanagers/addmanager'
export const ADMIN_DELETE_MANAGER = '/final/admin/allmanagers/deletemanager/:managerid'

export const ADMIN_ADD_WAREHOUSE = '/final/admin/allwarehouse/addwarehouse'
export const ADMIN_UPDATE_WAREHOUSE = '/final/admin/allwarehouse/updatewarehouse/:warehouseid'
export const ADMIN_DELETE_WAREHOUSE = 'final/admin/allwarehouse/deletewarehouse/:warehouseid'

// Requests
export const ADMIN_ALL_REQUESTS = '/final/admin/allrequests'
export const ADMIN_PENDING_REQUEST = '/final/admin/allpendingrequests'
export const ADMIN_APPROVED_REQUEST = '/final/admin/allapprovedrequests'
export const ADMIN_DECLINED_REQUEST = '/final/admin/alldeclinedrequests'