import { mount } from '@vue/test-utils'
import test from 'ava'
import Logo from '../../components/Logo.vue'

test('is a Vue instance?', (t) => {
    //通過mount將組件渲染出來
    const wrapper = mount(Logo)
    //使用CSS選擇尋找指定的 wrapper中的 dom 
    console.log(wrapper.find('.testAva'))
    //使用vm 尋找指定的 數據
    console.log(wrapper.vm.todos)
    
    t.is(wrapper.isVueInstance(), true)//使用ava 斷言
    //t.is(wrapper.vm.todos.length, 2)//使用ava 斷言 
})

