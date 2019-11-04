<template>
    <div :class="sideBarToggleData.sidebar?'sidebar-collapse':'sidebar-open'">
        <div class="wraper">
            <nav class="main-header bg-gray-600 rounded-b-lg">
                <navBar :sideBarToggleData="sideBarToggleData" @sideBarStatusChange="sideBarStatusChange"/>
            </nav>
            <div class="main-sidebar">
                <sideBar :Collapse="sideBarToggleData.isCollapse"/>
            </div>
            <div class="content-wrapper">
                
                    <transition name="page" mode="out-in">
                        <div class="content">
                            <nuxt />
                        </div>
                    </transition>

            </div>
            <footer class="main-footer h-6 bg-red-100"></footer>
            <div id="sidebar-overlay" @click="siderBarCloseByOverLay"></div>
        </div>        
    </div>
</template>

<script>
    import sideBar from '@/components/admin/layout/sideBar'
    import navBar from '@/components/admin/layout/navBar'
    export default {
        middleware: ['adminAuth', 'adminAccess'],
        data () {
            return {
                sideBarToggleData: {
                    sidebar: false,
                    isCollapse: false
                }
            }
        },
        computed: {},
        methods: {
            sideBarStatusChange(data) {
                this.sideBarToggleData.sidebar = data.sidebar
                this.sideBarToggleData.isCollapse = data.isCollapse
            },           
            siderBarCloseByOverLay() {
                if(this.sideBarToggleData.isCollapse == false) {
                    this.sideBarToggleData.isCollapse = true
                    this.sideBarToggleData.sidebar = true
                    return
                }
            },          
        },
        components: {
            sideBar,navBar
        },
        transition: {
            name: 'page',
            mode: 'out-in'
        }
    }

</script>
<style scoped>
/*
 * Core: General Layout Style
 * -------------------------
 */
.wrapper {
    min-height: 100%;
    overflow-x: hidden;

    position: relative;
}
@media (min-width: 768px) {
    .content-wrapper,
    .main-footer,
    .main-header {
        transition: margin-left 0.3s ease-in-out;
        margin-left: 250px;
        z-index: 3000;
    }
}
@media screen and (min-width: 768px) and (prefers-reduced-motion: reduce) {
    .content-wrapper,
    .main-footer,
    .main-header {
        transition: none;
    }
}
@media (min-width: 768px) {
    .sidebar-collapse .content-wrapper, .sidebar-collapse
    .main-footer, .sidebar-collapse
    .main-header {
        margin-left: 0;
    }
}
.content-wrapper {
    background: #f4f6f9;
}
.content-wrapper > .content {
    padding: 20px;
    min-height: 90vh;
}
.main-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;

    z-index: 1100;
    height: 100vh;
    overflow-y: hidden;
}
.main-sidebar, .main-sidebar:before {
    transition: margin-left 0.3s ease-in-out, width 0.3s ease-in-out;
    width: 250px;
}
@media screen and (prefers-reduced-motion: reduce) {
    .main-sidebar, .main-sidebar:before {
        transition: none;
    }
}
.sidebar-collapse .main-sidebar, .sidebar-collapse .main-sidebar:before {
    margin-left: -250px;    
}
@media (max-width: 991.98px) {    
    .sidebar-open .main-sidebar, .sidebar-open .main-sidebar:before {
        margin-left: 0;
    }
}
.main-footer {
    padding: 15px;
    color: #555;
    border-top: 1px solid #dee2e6;
    background: #ffffff;
}
/**
 * Component: Sidebar
 * ------------------
 */

#sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 1099;
}

@media (max-width: 768px) {
    .sidebar-open #sidebar-overlay {
        display: block;
    }
}

.page-enter,.page-leave-to {
    opacity: 0;
}
.page-enter-active, .page-leave-active { 
    transition: all 0.5s ease; 
}
</style>