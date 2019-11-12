import { getToken, setToken, removeToken } from '@/plugins/util/token'

export const state = () => ({
    token: getToken(),
    id: '',
    role_id: '',
    username: '',
    avatar: '',
    is_super:'',
    access:[],
    loggedIn: false,
})

export const mutations = {
    
    SET_TOKEN(state, token) {
        state.token = token
    },
    SET_ID(state, id) {
        state.id = id
    },
    SET_ROLE_ID(state, role_id) {
        state.role_id = role_id
    },
    SET_NAME(state, name) {
        state.username = name
    },
    SET_AVATAR(state, avatar) {
        state.avatar = avatar
    },
    SET_ISSUPER(state, is_super) {
        state.is_super = is_super
    },
    SET_ACCESS(state, access) {
        state.access = access
    },
    SET_LOGGEIN(state) {
        state.loggedIn = !state.loggedIn
    },
}

export const actions = {
    async login({commit}, userInfo) {
        try {
            const res = await this.$axios.$post('/admin/managers/login', userInfo)
            //login success
            if(res.statusCode == 11200) {
                //set token to auth.state.token
                commit('SET_TOKEN', res.token)
                //set token in Cookies
                setToken(res.token)
                commit('SET_LOGGEIN')
                //set user detail Data
                commit('SET_ID', res.id)
                commit('SET_ROLE_ID', res.role_id)
                commit('SET_NAME', res.name)
                commit('SET_AVATAR', res.avatar)
                commit('SET_ISSUPER', res.is_super)
                commit('SET_ACCESS', res.access)
            }            
            return res
        }
        catch (err) {
            //console.log(err)
        }
    },
    async getInfo({commit}) {
        try {
            const res =await this.$axios.$get('/admin/managers/currentUser')
            if(res) {
                commit('SET_NAME', res.name)
                commit('SET_AVATAR', res.avatar)
                commit('SET_ISSUPER', res.is_super)
                commit('SET_ACCESS', res.access)
            }                        
        }
        catch (err) {
            //console.log(err)
        }
    },
    async logout({commit}) {
        //set null to manager.state.token
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        commit('SET_ISSUPER', '')
        commit('SET_ACCESS', '')
        //remove token in Cookies
        removeToken()
        commit('SET_LOGGEIN')
        return true
    },    
}