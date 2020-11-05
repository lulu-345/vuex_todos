import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  // namespaced: true,
  state: {
    // 定义一个列表数据
    list: [],
    // 定义一个文本框输入的内容值
    inputValue: 'aaa',
    // 定义一个添加事项的id
    itemId: 5,
    // 让viewKey的默认值为all
    viewKey: 'all'
  },
  mutations: {
    // 对state中的数据列表数据进行赋值操作
    listinit(state, list) {
      state.list = list
    },
    // 对state中的inputValue进行赋值操作
    setInputValue(state, val) {
      state.inputValue = val
    },
    // 实现添加事项
    addItem(state) {
      const obj = {
        id: state.itemId,
        info: state.inputValue,
        done: false
      }
      // 把obj对象push到list数组中
      state.list.push(obj)
      // 清空文本框的值
      state.inputValue = ''
      // 让id自增1
      state.itemId++
    },
    // 实现删除事项
    removeItem(state, id) {
      // 第一种实现删除的方法，根据索引来删除
      const index = state.list.findIndex(item => item.id === id)
      state.list.splice(index, 1)

      // 第二种实现删除的方法
      // state.list = state.list.filter(item => item.id !== id)
    },
    // 实现复选框状态的变化
    changeStatus(state, params) {
      const index = state.list.findIndex(item => item.id === params.id)
      state.list[index].done = params.status
    },
    // 实现清除已经完成任务功能
    removeDone(state) {
      state.list = state.list.filter(item => item.done === false)
    },
    // 实现点击按钮切换高亮
    changeType(state, key) {
      state.viewKey = key
    }

  },
  getters: {
    unDoneLength(state) {
      return state.list.filter(item => item.done === false).length
    },
    // 根据点击不同的按钮按需展示
    infoList(state) {
      // 如果点击的是全选按钮
      if (state.viewKey === 'all') {
        return state.list
      }
      // 如果点击的是未完成按钮
      if (state.viewKey === 'undone') {
        return state.list.filter(item => item.done === false)
      }
      // 如果点击的是已完成按钮
      if (state.viewKey === 'done') {
        return state.list.filter(item => item.done === true)
      }
    }
  },
  actions: {
    getList(context) {
      // 发送请求获取到数据列表
      axios.get('/list.json').then(({ data }) => {
        console.log(data)
        // 让mutations中的listinit函数对数据进行处理
        context.commit('listinit', data)
      })
    }
  }
})
