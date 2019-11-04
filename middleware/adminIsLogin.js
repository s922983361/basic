export default async ({ store, redirect }) => {
    /**
     * @desc 路由守衛
     * 登入狀態下則轉到/admin/managers
     */
    store.state.auth.loggedIn == true && redirect('/admin/managers')    
}