/**
 * @desc EventBus 插件
 * 1.發送通知訊息給其他兄弟組件其他非兄弟 父子組件
 * 2.含自動垃圾回收機制
 */
import Vue from 'vue'

let Bus = function(vue) {
    //監聽的組件要接收的資料
    let receviceData = {}
    //監聽事件 要執行的function    
    this.handles = {
        //'event':[callback,callback..]
    }
    //用來清除哪一個組件 的哪一個事件垃圾的紀錄
    this.eventUidMap = {
        // 'uid': {//組件id
        //     'event': [callback,callback..]//事件名稱
        // }
    }

    this.$on = async (event, callback, vm) => {
        if(!this.handles[event]) this.handles[event] = []//初始化
        if(callback instanceof Function) this.handles[event].push(callback)
        if(vm instanceof vue) await this.setEventUidMap(vm._uid, event, callback)

        await this.handles[event][0](receviceData)
    }
    this.setEventUidMap = async (uid, event, callback) => {
        if(!this.eventUidMap[uid]) this.eventUidMap[uid] = {}//初始化
        if(!this.eventUidMap[uid][event]) this.eventUidMap[uid][event] = []
        this.eventUidMap[uid][event].push(callback)
    }    
    this.$emit = async (event, data) => {
        receviceData = data
        /*if(this.handles[event]) {
            let len = this.handles[event].length

            for(let i = 0; i < len; i++ ) {
                this.handles[event][i](data)
            }           
        }*/        
    }
    this.$off = async (event, callback) => {
        if(!this.handles[event]) return
        if(!callback) {
            delete this.handles[event]
        } else if(callback instanceof Function) {
            let len = this.handles[event].length

            for(let i = 0; i < len; i++ ) {
                let cb = this.handles[event][i]
                if(cb === callback) {
                    delete this.handles[event].splice(i, 1)
                }
            }
        }
    }
    this.$offByUid = async (uid) => {
        let eventObj = this.eventUidMap[uid] || {}
        Object.keys(eventObj).forEach(event => {
            eventObj[event].forEach(cb => {
                this.$off(event, cb)
            })
            delete eventObj[event]
        })
        delete this.eventUidMap[uid]
    }

    return this
}

let EventBus = {
    install(vue) {//編寫vue插件的步驟 install()
        //console.log(vue)
        Vue.prototype.$bus = new Bus(vue)        
        //每個組件都擁有這個功能
        Vue.mixin({
            beforeDestroy() {
                this.$bus.$offByUid(this._uid)
            }
        })
    }
}

Vue.use(EventBus)