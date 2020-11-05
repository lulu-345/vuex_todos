<template>
  <div id="app">
    <a-input
      :value="inputValue"
      @change="changeInputValue"
      placeholder="请输入任务"
      class="my_ipt"
    />
    <a-button @click="addItemToList" type="primary">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          @change="changeStatusById(item.id, $event)"
          :checked="item.done"
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemToList(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>未完成数量：{{ unDoneLength }}</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button
            :type="viewKey === 'all' ? 'primary' : 'default'"
            @click="changeLightStatus('all')"
            >全部</a-button
          >
          <a-button
            :type="viewKey === 'undone' ? 'primary' : 'default'"
            @click="changeLightStatus('undone')"
            >未完成</a-button
          >
          <a-button
            :type="viewKey === 'done' ? 'primary' : 'default'"
            @click="changeLightStatus('done')"
            >已完成</a-button
          >
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="removeAreadyDoneItem">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
// 按需导入state中mapState
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {}
  },
  created() {
    // 在页面一开始的时候调用actions中的发送请求的函数
    this.$store.dispatch('getList')
  },
  computed: {
    // 把state中的数据映射为计算属性
    ...mapState(['list', 'inputValue', 'viewKey']),
    // 把getters中的函数映射为计算属性
    ...mapGetters(['unDoneLength', 'infoList'])
  },
  methods: {
    // 输入框中的输入内容发生变化的时候触发
    changeInputValue(e) {
      console.log(e.target.value)
      // 调用mutations中的setInputValue函数并传递实参
      this.$store.commit('setInputValue', e.target.value)
    },
    // 当点击了添加事项的按钮后
    addItemToList() {
      // 排除文本框中输入空格
      if (this.inputValue.trim().length === 0) {
        // 给出错误提示
        return this.$message.warning('请输入内容')
      }
      // 用户没有输入空格,调用mutations中的addItem函数实现添加功能
      this.$store.commit('addItem')
    },
    // 当点击删除按钮的时候触发
    removeItemToList(id) {
      this.$store.commit('removeItem', id)
    },
    // 复选框的状态发生变化的时候
    changeStatusById(id, e) {
      console.log(id, e.target.checked)
      // 定义一个参数对象
      const params = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('changeStatus', params)
    },
    // 当点击了清除已完成任务的按钮的时候触发
    removeAreadyDoneItem() {
      this.$store.commit('removeDone')
    },
    // 当底部三个按钮被点击的时候
    changeLightStatus(key) {
      console.log(key)
      this.$store.commit('changeType', key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
