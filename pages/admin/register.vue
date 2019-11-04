<template>
    <div class="loginForm min-h-screen bg-gray-200">
        <div class="login-container mx-16 flex justify-center items-center">
            <div class="mt-8 bg-white w-full lg:w-1/2 md:w-3/4 h-full rounded-lg shadow-2xl">
                <form>
                    <div class="p-4">
                        <header class="pb-4 border-b-2 border-teal-400">
                            <div class="logo text-center">
                                <img src="/icon.png" alt="" class="w-8 inline">
                                <h1 class="text-2xl inline"><span class=" font-bold ">JSD </span>廠商後台註冊</h1>                                
                            </div>                            
                        </header> 
                        <div class="container flex mx-auto">
                            <div class="panel w-full px-10 pt-8 border-b border-solid border-gray-300">
                                <div class="mb-2">
                                    <div class="flex items-center mb-2">
                                        <div class="border-2 border-blue-700 py-0 px-1 rounded-full font-bold mr-2 text-blue-700">1</div>
                                        <h2 class="text-sm">輸入公司名稱...</h2>
                                    </div>

                                    <div class="w-full px-2">                                       
                                        <input 
                                            type="text" 
                                            class="w-full text-sm bg-gray-300 text-gray-700 rounded-full px-3 py-3" 
                                            placeholder="Enter CompanyName..."
                                            v-model="model.name"
                                            >
                                        <p class="text-red-600 text-right text-xs italic">Please choose a password.</p>
                                    </div>

                                </div>
                                <div class="mb-2">
                                    <div class="flex items-center mb-2">
                                        <div class="border-2 border-blue-700 py-0 px-1 rounded-full font-bold mr-2 text-blue-700">2</div>
                                        <h2 class="text-sm">輸入電子郵件信箱...</h2>
                                    </div>

                                    <div class="w-full px-2">                                       
                                        <input 
                                            type="text" 
                                            class="w-full text-sm bg-gray-300 text-gray-700 rounded-full px-3 py-3" 
                                            placeholder="Enter Email..."
                                            v-model="model.email"
                                            >
                                        <p class="text-red-600 text-right text-xs italic">Please choose a password.</p>
                                    </div>

                                </div>                                
                                <div class="mb-2">
                                    <div class="flex items-center mb-2">
                                        <div class="border-2 border-blue-700 py-0 px-1 rounded-full font-bold mr-2 text-blue-700">3</div>
                                        <h2 class="text-sm">輸入密碼...</h2>
                                    </div>
                                    
                                    <div class="w-full px-2">                                       
                                        <input 
                                            type="password" 
                                            class="w-full text-sm bg-gray-300 text-gray-700 rounded-full px-3 py-3" 
                                            placeholder="Enter Password..."
                                            v-model="model.password"
                                            >
                                        <p class="text-red-600 text-right text-gray-300 text-xs italic">Please choose a password.</p>
                                    </div>
                                </div>

                                <div>
                                    <button 
                                        type="submit"
                                        class="bg-blue-300 text-white w-full rounded-full px-2 py-2 mb-2 text-lg hover:bg-blue-500 transition-slow"
                                        @click.prevent="register"
                                        >註冊
                                        </button>
                                </div>
                            </div>

                        </div>
                    </div>
                    
                </form> 
            </div>
        </div>        
    </div>    
</template>

<script>
    export default {        
        layout: 'empty',
        data () {
            return {
                model: {},
            };
        },
        methods: {
            async register() {
                try {
                    const res = await this.$axios.$post(`/admin/managers/register`, this.model) 
                    res.statusCode == 10204 && await this.notifyFunc(res, 'warning', 'bg-yellow-200')
                    res.statusCode == 10500 && await this.notifyFunc(res, 'error', 'bg-red-200')
                    if(res.statusCode == 10200) {
                        await this.notifyFunc(res, 'success', 'bg-green-200')
                        this.$router.push(`/admin`)
                    }                    
                }
                catch (err) {
                    this.$message({                        
                        message: '發生不明的錯誤,請聯絡管理員!!',
                        type: 'error',
                        customClass: 'bg-red-200'
                    })
                }          
                
            },
            async notifyFunc (res, type, customClass) { //type:string['success','error','warning'] customClass:string['bg-green-200','bg-red-200','bg-yellow-200']                
                this.$notify({
                    title: res.title,
                    message: res.msg,
                    type,
                    customClass
                })
            }   
        },
    }

</script>
<style scoped>
.bg-image {
    background-image: url('/images/example/04.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(2px);
    -ms-filter: blur(2px);
    -webkit-filter: blur(2px);
    -moz-filter: blur(2px);
}
</style>