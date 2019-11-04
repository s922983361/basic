export default async ({ store, redirect }) => {
    /**
     * @desc 路由守衛
     * 未登入則轉到登入頁面
     * /admin登入 /admin/register註冊除外
     * 可直接掛載在layout上 使用此layout的頁面全數有效
     */
    store.state.auth.loggedIn == false && redirect('/admin')    
}