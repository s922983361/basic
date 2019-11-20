<template>
    <el-menu
        default-active="/admin/managers"
        :router="true"
        :unique-opened="true"
        class="el-menu-vertical-demo"
        
        background-color='#2d3748'
        text-color='#e2e8f0'
        active-text-color="#f6ad55"
        >
        <el-submenu index="1" v-if="$store.state.auth.is_super">
            <template slot="title">
                <i class="el-icon-eleme" style="color:#e2e8f0"></i>
                <span>超級管理員</span>
            </template>
            <el-menu-item-group>
                <template slot="title">管理員功能模塊</template> 

                <el-menu-item index="/admin/managers">                
                    <i class="el-icon-tickets"></i>
                    <span slot="title">管理員資訊</span>                                
                </el-menu-item>            
                <el-menu-item index="/admin/roles">                
                    <i class="el-icon-user"></i>
                    <span slot="title">管理員角色</span>                                
                </el-menu-item>

                <el-menu-item index="/admin/accesses">                
                    <i class="el-icon-coordinate"></i>
                    <span slot="title">管理員權限</span>                                
                </el-menu-item>

            </el-menu-item-group>

            <el-menu-item-group>
                <template slot="title">主功能模塊</template>

                <el-menu-item index="/admin/goodsTypes">                
                    <i class="el-icon-price-tag"></i>
                    <span slot="title">商品類型</span>
                </el-menu-item>

                <el-menu-item index="/admin/goodsCates">                
                    <i class="el-icon-discount"></i>
                    <span slot="title">商品分類</span>
                </el-menu-item>
                
                <el-menu-item index="/admin/examples">                
                    <i class="el-icon-menu"></i>
                    <span slot="title">測試用範例</span>
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2" v-if="$store.state.auth.is_super || $store.state.auth.role_id === '5db0f7ab7b9fe840f0b1f73b'">
            <template slot="title">
                <i class="el-icon-eleme" style="color:#e2e8f0"></i>
                <span>廠商</span>
            </template>
            <el-menu-item-group>
                <template slot="title">商品功能模塊</template> 

                <el-menu-item index="/admin/brands">                
                    <i class="el-icon-tickets"></i>
                    <span slot="title">建立品牌</span>                                
                </el-menu-item> 
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3" v-if="$store.state.auth.is_super || $store.state.auth.role_id === '5db0f7b77b9fe840f0b1f73c'">
            <template slot="title">
                <i class="el-icon-eleme" style="color:#e2e8f0"></i>
                <span>經銷商</span>
            </template>
        </el-submenu>        
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