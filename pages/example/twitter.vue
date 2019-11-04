<template>
    <div class="body bg-gray-200">
        <div class="top-nav bg-white">
            <div class="container mx-auto flex items-center py-4">
                <nav class="w-2/5">
                    <nuxt-link class="top-nav-item" to="/admin"><i class="fa fa-home fa-lg "></i>Admin</nuxt-link>
                    <nuxt-link class="top-nav-item" to="/example/youtube"><i class="fa fa-home fa-lg "></i>youtube</nuxt-link>
                    <a href="#" class="top-nav-item"><i class="fa fa-bolt fa-lg"></i> Moments</a>
                    <a href="#" class="top-nav-item"><i class="fa fa-bell fa-lg"></i> Notifications</a>
                    <a href="#" class="top-nav-item"><i class="fa fa-envelope fa-lg"></i> Messages</a>
                </nav>
                <div class="w-1/5 text-center"><a href="#"><i class="fab fa-twitter fa-lg text-teal-700"></i></a></div>
                <div class="w-2/5 flex justify-end">
                    <div class="mr-4 relative">
                        <input type="text" class="bg-gray-200 h-8 px-4 py-2 text-xs w-48 rounded-full" placeholder="search Twitter">
                        <span class="flex item-center absolute inset-y-auto right-0"><i class="fa fa-search text-gray-700"></i></span>
                    </div>
                    <div class="mr-4">
                        <a href="#"><img src="/images/example/avatar1.png" alt="avatar1" class="h-8 w-8 rounded-full"></a>
                    </div>
                    <div>
                        <button class="bg-teal-300 hover:bg-teal-500 text-white font-medium px-4 rounded-full">Tweet</button>
                    </div>
                </div>
                
            </div>
        </div>

        <div class="hero h-112 bg-cover"></div>

        <div class="bg-white shadow">
            <div class="container mx-auto flex item-center relative">
                <div class="w-1/4">
                    <img src="/images/example/avatar2.png" alt="" class="h-48 w-48 rounded-full absolute -mt-20 border-white border"> 
                </div>
                <div class="w-1/2">
                    <ul class="flex">
                        <li class="text-center py-3 px-4 border-b-2 border-solid border-teal-300">
                            <a href="#" class="text-gray-700 hover:no-underline">
                                <div class="text-sm font-bold tracking-tight mb-1">Tweets</div>
                                <div class="text-lg tracking-tight font-bold text-teal-300">60</div>
                            </a>
                        </li>
                        <li class="text-center py-3 px-4 border-b-2 border-solid hover:border-teal-300">
                            <a href="#" class="text-gray-700 hover:no-underline">
                                <div class="text-sm font-bold tracking-tight mb-1">Following</div>
                                <div class="text-lg tracking-tight font-bold hover:text-teal-300">20</div>
                            </a>
                        </li>
                        <li class="text-center py-3 px-4 border-b-2 border-solid hover:border-teal-300">
                            <a href="#" class="text-gray-700 hover:no-underline">
                                <div class="text-sm font-bold tracking-tight mb-1">Followers</div>
                                <div class="text-lg tracking-tight font-bold hover:text-teal-300">6</div>
                            </a>
                        </li>
                        <li class="text-center py-3 px-4 border-b-2 border-solid hover:border-teal-300">
                            <a href="#" class="text-gray-700 hover:no-underline">
                                <div class="text-sm font-bold tracking-tight mb-1">Likes</div>
                                <div class="text-lg tracking-tight font-bold hover:text-teal-300">60</div>
                            </a>
                        </li>
                        <li class="text-center py-3 px-4 border-b-2 border-solid hover:border-teal-300">
                            <a href="#" class="text-gray-700 hover:no-underline">
                                <div class="text-sm font-bold tracking-tight mb-1">Moments</div>
                                <div class="text-lg tracking-tight font-bold hover:text-teal-300">2</div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="w-1/4 flex justify-end items-center">
                    <div class="mr-4">
                        <button class="bg-teal-300 hover:bg-teal-700 text-white font-medium px-4 rounded-full">Following</button>
                    </div>
                    <div>
                        <a href="#" class="text-gray-700"><i class="fa fa-ellipsis-v fa-lg"></i></a>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mx-auto flex mt-3">
            <div class="w-1/4 pr-6 mt-8 mb-4">
                <h1><a href="#" class="text-black font-bold text-lg hover:text-teal-300">JSD Design</a></h1>
                <div><a href="#" class="text-gray-500">@tailwindcss</a></div>

                <div class="mb-4 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas mollitia quod iste dolorem reprehenderit recusandae voluptate aliquid quidem eum quae.
                </div>
                <div class="mb-2"><i class="fa fa-link fa-md text-gray-700 hover:bg-teal-700 mr-1"></i><a href="#" class="text-teal-300"> tailwindcss.com</a></div>
                <div class="mb-4"><i class="fa fa-calendar fa-md text-gray-700 hover:bg-teal-700 mr-1"></i><a href="#" class="text-teal-300"> Joined August 2019</a></div>
                
                <div class="mb-4">
                    <button class="bg-teal-300 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-full w-full h-10">Welcom to JSD!</button>
                </div>

                <div class="mb-4"><i class="fa fa-user fa-md text-gray-500 mr-1">  27 Followers tou know</i></div>
                <div class="mb-4">
                    <a href="#"><img src="/images/example/avatar1.png" alt="" class="rounded-full h-12 w-12 inline"></a>
                    <a href="#"><img src="/images/example/avatar2.png" alt="" class="rounded-full h-12 w-12 inline"></a>
                    <a href="#"><img src="/images/example/avatar3.png" alt="" class="rounded-full h-12 w-12 inline"></a>
                    <a href="#"><img src="/images/example/avatar4.png" alt="" class="rounded-full h-12 w-12 inline"></a>
                    <a href="#"><img src="/images/example/avatar5.png" alt="" class="rounded-full h-12 w-12 inline"></a>
                </div>

                <div class="mb-4">
                    <a href="#"><img src="/images/example/01.jpg" alt="" class="inline w-20 mr-1 mb-1"></a>
                    <a href="#"><img src="/images/example/02.jpg" alt="" class="inline w-20 mr-1 mb-1"></a>
                    <a href="#"><img src="/images/example/03.jpg" alt="" class="inline w-20 mr-1 mb-1"></a>
                    <a href="#"><img src="/images/example/04.jpg" alt="" class="inline w-20 mr-1 mb-1"></a>
                </div>
            </div>

            <div class="w-1/2 mb-4 bg-white">
                <div class="p-3 text-lg font-bold border-b border-solid border-gray-300">
                    <a href="#" class="text-black mr-6">Tweets</a>
                    <a href="#" class="mr-6"> Tweets &amp; Replies</a>
                    <a href="#">Media</a>
                </div>

                <div class="flex border-b boder-solid border-gray-300">
                    <div class="w-1/6 text-right pl-3 pt-3">
                        <div><i class="fas fa-thumbtack text-teal-300 mr-2"></i></div>
                        <div><a href="#"><img src="/images/example/avatar3.png" alt="avatar" class="rounded-full h-12 w-12"></a></div>
                    </div>

                    <div class="w-5/6 p-3 pl-0">
                        <div class="text-xs text-gray-700">Pinned Tweet</div>

                        <div class="flex justify-between">
                            <div>
                                <span class="font-bold"><a href="#" class="text-black">Tailwind CSS</a></span>
                                <span class="text-gray-700">@tailwindcss</span>
                                <span class="text-gray-700">&middot;</span>
                                <span class="text-gray-700">4 Dec 2019</span>
                            </div>
                            <div>
                                <a href="#" class="text-gray-700 hover:text-teal-300">
                                    <i class="fa fa-chevron-down"></i></a>
                            </div>
                        </div>

                        <div class="mb-4">
                            <p class="mb-6">Lorem ipsum dolor sit amet.</p>
                            <p class="mb-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, nesciunt?</p>
                            <p class="mb-4"><a href="" class="hover:text-teal-300">http://localhost:3000/example/twitter#</a></p>
                            <p><a href="#"><img src="/images/example/02.jpg" alt="img" class="border border-solid border-gray-200 rounded-sm"></a></p>
                        </div>

                        <div class="pb-2">
                            <span class="mr-8"><a href="#" class="text-gray-700 hover:no-underline hover:text-blue-500"><i class="fa fa-comment fa-lg mr-2"></i>9</a></span>

                            <span class="mr-8"><a href="#" class="text-gray-700 hover:no-underline hover:text-blue-500"><i class="fa fa-retweet fa-lg mr-2"></i>9</a></span>

                            <span class="mr-8"><a href="#" class="text-gray-700 hover:no-underline hover:text-blue-500"><i class="fa fa-heart fa-lg mr-2"></i>9</a></span>

                            <span class="mr-8"><a href="#" class="text-gray-700 hover:no-underline hover:text-blue-500"><i class="fa fa-envelope fa-lg mr-2"></i>9</a></span>
                        </div>
                    </div>                    
                </div>
                <!-- ********************************************** -->
                <div class="flex border-b boder-solid border-gray-300">
                    <div class="w-1/6 text-right pl-3 pt-3">
                        <div><i class="fas fa-thumbtack text-teal-300 mr-2"></i></div>
                        <div><a href="#"><img src="/images/example/avatar1.png" alt="avatar" class="rounded-full h-12 w-12"></a></div>
                    </div>

                    <div class="w-5/6 p-3 pl-0">
                        <div class="text-xs text-gray-700">Pinned Tweet</div>

                        <div class="flex justify-between">
                            <div>
                                <span class="font-bold"><a href="#" class="text-black">Tailwind CSS</a></span>
                                <span class="text-gray-700">@tailwindcss</span>
                                <span class="text-gray-700">&middot;</span>
                                <span class="text-gray-700">4 Dec 2019</span>
                            </div>
                            <div>
                                <a href="#" class="text-gray-700 hover:text-teal-300">
                                    <i class="fa fa-chevron-down"></i></a>
                            </div>
                        </div>

                        <div class="mb-4">
                            <p class="mb-6">Lorem ipsum dolor sit amet.</p>
                            <p class="mb-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, nesciunt?</p>
                            <p class="mb-4"><a href="" class="hover:text-teal-300">http://localhost:3000/example/twitter#</a></p>
                            <p><a href="#"><img src="/images/example/04.jpg" alt="img" class="border border-solid border-gray-200 rounded-sm"></a></p>
                        </div>

                        <div class="pb-2">
                            <span class="mr-8"><a href="#" class="text-gray-700 hover:no-underline hover:text-blue-500"><i class="fa fa-comment fa-lg mr-2"></i>9</a></span>

                            <span class="mr-8"><a href="#" class="text-gray-700 hover:no-underline hover:text-blue-500"><i class="fa fa-retweet fa-lg mr-2"></i>9</a></span>

                            <span class="mr-8"><a href="#" class="text-gray-700 hover:no-underline hover:text-blue-500"><i class="fa fa-heart fa-lg mr-2"></i>9</a></span>

                            <span class="mr-8"><a href="#" class="text-gray-700 hover:no-underline hover:text-blue-500"><i class="fa fa-envelope fa-lg mr-2"></i>9</a></span>
                        </div>
                    </div>                    
                </div>   
            </div>

            <div class="w-1/4 mb-4 px-2">                
                <div class="bg-white p-3 mb-3">
                    <div>
                        <span><a href="#" class="text-lg hover:text-teal-300 hover:font-bold">Who To Follow</a></span>
                        <span>&middot;</span>
                        <span><a href="#" class="text-xs hover:text-teal-300 hover:font-bold">Refresh</a></span>
                        <span>&middot;</span>
                        <span><a href="#" class="text-xs hover:text-teal-300 hover:font-bold">View All</a></span>
                    </div>
                    <div class="flex border-b border-solid boder-gray-300 ">
                        <div class="py-2 pl-2">
                            <a href="#"><img src="/icon.png" alt="" class="rounded-full h-12 w-12"></a>
                        </div>
                        <div class="pl-2 py-2 w-full">
                            <div class="flex justify-between mb-1">
                                <div>
                                    <a href="#" class="font-bold text-black">Nuxt.js</a>
                                    <a href="#" class="text-gray-700">@Nuxt.js</a>
                                </div>
                                <div class="text-gray-300 hover:text-teal-700"><i class="fa fa-times"></i></div>
                            </div>
                            <div><button class="bg-transparent text-xs hover:bg-teal-300 text-teal-300 font-semibold hover:text-white py-1 px-6 border border-teal-300 hover:border-transparent rounded-full">Follow</button></div>
                        </div>
                    </div>

                    <div class="pt-2">
                        <a href="#" class="text-xs">Connect other address book</a>
                    </div>
                </div>                

                <div class="bg-white p-3 mb-3">
                    <div>
                        <span><a href="#" class="text-lg hover:text-teal-300 hover:font-bold">Who To Follow</a></span>
                        <span>&middot;</span>
                        <span><a href="#" class="text-xs hover:text-teal-300 hover:font-bold">Refresh</a></span>
                        <span>&middot;</span>
                        <span><a href="#" class="text-xs hover:text-teal-300 hover:font-bold">View All</a></span>
                    </div>

                    <div class="mb-3 leading-tight">
                        <div><a href="#" class="font-bold">Happy New year </a></div>
                        <div><a href="#" class="text-gray-700 text-xs">21.7K Tweets</a></div>
                    </div>
                </div>

                <div class="mb-3 text-xs">
                    <span class="mr-2"><a href="#" class="text-gray-700">&copy; 2019 JSD</a></span>
                    <span class="mr-2"><a href="#" class="text-gray-700">About1</a></span>
                    <span class="mr-2"><a href="#" class="text-gray-700">About2</a></span>
                    <span class="mr-2"><a href="#" class="text-gray-700">About3</a></span>
                    <span class="mr-2"><a href="#" class="text-gray-700">About4</a></span>
                    <span class="mr-2"><a href="#" class="text-gray-700">About5</a></span>
                </div> 
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        layouts: 'empty',
        data () {
            return {

            };
        },
        props:[''],
        computed: {},
        methods: {},
        components: {},
    }

</script>
<style scoped>
.body{
    min-height:1200px;
}
.top-nav-item {
    @apply text-gray-700;
    @apply text-sm;
    @apply mr-4;
    @apply font-semibold;
    @apply pb-4;
    @apply border-b-2;
    @apply border-solid;
    @apply border-transparent; 
}
.top-nav-item:hover {
    @apply border-teal-300;
    @apply text-teal-300
}
.hero {
    /* background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/tt_tailwind_bg.jpg'); */
    background-image: url('/images/example/02.jpg');
    background-repeat: no-repeat;
    background-size: cover
}
</style>