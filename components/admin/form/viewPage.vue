<template>
    <el-container>               
        <el-main>
            <el-row :gutter="10">
                <el-col :sm="24" :md="12">
                    <slot name="response-left"></slot>
                </el-col>
                <el-col :sm="24" :md="12">
                    <slot name="response-right"></slot>
                </el-col>               
                <el-col :sm="24">
                    <slot name="response-full"></slot>
                </el-col>
                <el-col :sm="24" style="padding-left:40px">
                    <el-row>
                        <slot name="response-checkbox"></slot>
                    </el-row>                    
                </el-col>               
            </el-row>
        </el-main>
    </el-container>
</template>