<template>
    <el-container>
        <el-header class="mb-4">
            <el-row class="mb-4">                
                <!-- 表格功能按鈕區塊 -->
                <el-col :span="24">
                    <slot name="right-field"></slot>
                </el-col>
            </el-row>
            <el-row>                
                <!-- 表格搜尋框 -->
                <el-col :span="4" class="mr-2">
                    <slot name="search-field"></slot>
                </el-col>
                <!-- 表格過濾器 -->
                <el-col :span="17">
                    <slot name="filter-field"></slot>
                </el-col>
                <!-- 表格新增按鈕 -->
                <el-col :span="2">
                    <slot name="left-field"></slot>
                </el-col>                
            </el-row>
        </el-header>
        <el-main>
            <slot></slot>
        </el-main>
    </el-container>
</template>