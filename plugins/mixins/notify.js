/**
 * @desc common notify function mixin use element-ui
 */
import { Notification } from 'element-ui'
export default {
    methods: {
        /**
         * @desc elememt-ui notify function
         * @param {*} res Obj: dbData
         * @param {*} type string['success','error','warning']
         * @param {*} customClass string['bg-green-200','bg-red-200','bg-yellow-200']
         */
        async notifyFunc(res, type, customClass) { 
            Notification({
                title: res.title,
                message: res.msg,
                type,
                customClass
            })
        }
    }
}