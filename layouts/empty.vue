<template>
    <div class="content-wrapper">                
        <transition name="page" mode="out-in">
            <div class="content">
                <nuxt />
            </div>
        </transition>
    </div>
</template>

<style scoped>
.page-enter,.page-leave-to {
    opacity: 0;
}
.page-enter-active, .page-leave-active { 
    transition: all 0.5s ease; 
}
</style>