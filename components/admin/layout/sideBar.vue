<template>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color='#e2e8f0'
        text-color='#000'
        >
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-eleme"></i>
                <span>超級管理員</span>
            </template>
            <el-menu-item-group>
                <template slot="title">管理員功能模塊</template>
                <nuxt-link to="/admin/managers">
                    <el-menu-item index="1-3">                
                        <i class="el-icon-tickets"></i>
                        <span slot="title">管理員資訊</span>                                
                    </el-menu-item>
                </nuxt-link> 

                <nuxt-link to="/admin/roles">
                    <el-menu-item index="1-5">                
                        <i class="el-icon-user"></i>
                        <span slot="title">管理員角色</span>                                
                    </el-menu-item>
                </nuxt-link>

                <nuxt-link to="/admin/accesses">
                    <el-menu-item index="1-4">                
                        <i class="el-icon-coordinate"></i>
                        <span slot="title">管理員權限</span>                                
                    </el-menu-item>
                </nuxt-link>
            </el-menu-item-group>

            <el-menu-item-group>
                <template slot="title">主功能模塊</template>
                <nuxt-link to="/admin/categories">
                    <el-menu-item index="1-2">                
                        <i class="el-icon-menu"></i>
                        <span slot="title">分類列表</span>
                    </el-menu-item>
                </nuxt-link>

                <nuxt-link to="/admin/examples">
                    <el-menu-item index="1-1">                
                        <i class="el-icon-menu"></i>
                        <span slot="title">測試用範例</span>
                    </el-menu-item>
                </nuxt-link>
            </el-menu-item-group>
        </el-submenu>

        <!-- <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">商品管理</span>
        </el-menu-item>

        <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">廣告管理</span>
        </el-menu-item>

        <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">消息管理</span>
        </el-menu-item> -->
    </el-menu>    
</template>

<script>
    export default {        
        data () {
            return {
                isCollapse: false
            };
        },
        props:['Collapse'],
        computed: {
            sideBarToggle() {
                return this.isCollapse = this.Collapse
            } 
        },
        methods: { 
        }
    }

</script>
<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 250px;
        min-height: 100vh;
    }
</style>