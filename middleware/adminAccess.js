import { MessageBox, Message} from 'element-ui';
export default async ({ store, route , redirect}) => {
    /**
     * @desc 路由守衛
     * 登入狀態下則轉到/admin/managers
     */    
    
    let ACCESS = false
    let regex = new RegExp( /\w{24}/, 'i')
    //replace /id to /':id'
    const PATH = route.path.replace(regex, ':id')
    store.state.auth.access.indexOf(PATH) === -1 ? ACCESS = false :  ACCESS = true

    if(!ACCESS) {
        //redirect('/admin/cash')
        console.log('403, NO Access')
    }    
}