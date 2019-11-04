<template>
    <div class="top-nav w-full flex justify-between bg-teal-300">
        <ul class="nav-item-group-right inline-flex">
            <li class="nav-item" @click="sideBarToggle">
                <el-tooltip class="item" effect="dark" content="目錄開關" placement="bottom" >
                    <i v-if="!sideBarToggleData.isCollapse" class="el-icon-d-arrow-left"></i>
                    <i v-if="sideBarToggleData.isCollapse" class="el-icon-d-arrow-right"></i>
                </el-tooltip>
            </li>
            <li class="nav-item">
                <nuxt-link to="/admin">
                    <el-tooltip class="item" effect="dark" content="首頁" placement="bottom">                    
                        <i class="el-icon-s-home"></i>
                    </el-tooltip>
                </nuxt-link>               
            </li>
            <li class="nav-item">
                <el-tooltip class="item" effect="dark" content="訊息" placement="bottom">                    
                    <i class="el-icon-chat-line-square"></i>
                </el-tooltip>
            </li>
            <li class="nav-item">
                <el-tooltip class="item" effect="dark" content="電子郵件" placement="bottom">
                    <i class="el-icon-message"></i>
                </el-tooltip>
            </li>
        </ul>

        <ul class="nav-item-group-left inline-flex">             
            <li class="mr-2 pt-1">
                <div class="text-sm text-white">{{ $store.state.auth.username }}</div>
                <span class="text-sm text-white">{{ $store.state.auth.is_super == 1 ? '超級管理員': '一般人' }}<i class="el-icon-success text-green-500" v-if="$store.state.auth.loggedIn"></i></span> 
            </li>
            <li class="nav-item">
                <el-dropdown :hide-on-click="false">
                    <span class="el-dropdown-link">
                        <img :src="$store.state.auth.avatar" class="w-8 rounded-full border border-white" alt="avatar">
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-bank-card">個人資訊</el-dropdown-item>
                        <el-dropdown-item divided icon="el-icon-user"><span @click="logout">登出</span></el-dropdown-item>  
                    </el-dropdown-menu>                
                </el-dropdown>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                toggle: {
                    sidebar: '',
                    isCollapse: ''
                }
            };
        },
        props:['sideBarToggleData'],
        computed: {            
        },
        methods: {
            sideBarToggle() {                
                this.toggle.sidebar = ! this.sideBarToggleData.sidebar
                this.toggle.isCollapse = ! this.sideBarToggleData.isCollapse
                this.$emit('sideBarStatusChange', this.toggle);
            },
            async logout() {          
                const res = await this.$store.dispatch('auth/logout')                               
                if(res){
                    this.$notify({
                        title: '成功登出!!',
                        message: 'Success Logout to System !!',
                        type: 'success',
                        customClass: 'bg-green-200'
                    })
                    this.$router.push('/admin')
                }
            }
        },
        components: {},
    }

</script>
<style scoped>
.nav-item {
    @apply flex-1;
    @apply text-white;
    @apply text-2xl;
    @apply px-2;
    @apply m-2;
}
.nav-item:hover {
    @apply text-teal-600;
    @apply cursor-pointer;
}
</style>