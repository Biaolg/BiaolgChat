<template>
  <div class="chatwin">
    <div class="item" v-for="(item,index) in messagelist" :key="index">
      <ChatList :item="item"></ChatList>
    </div>
  </div>
</template>

<script>
import ChatList from "./ChatList";
export default {
  naem: "chatwin",
  data() {
    return {};
  },
  components: {
    ChatList
  },
  computed: {
    messagelist() {
      if (this.$store.state.massage.length != 0) {
        return this.screen(this.$store.state.massage);
      }
    },
    target() {
      return this.$store.state.target;
    }
  },
  watch: {
    messagelist() {
      this.$nextTick(() => {
        let msg = document.querySelector(".chatwin");
        msg.scrollTop = msg.scrollHeight; // 滚动高度
      });
    }
  },
  methods: {
    //筛选数据
    screen(arr) {
      return arr.filter(item => {
        if (
          //消息类型和目标类型匹配
          this.target.type == item.type &&
          (this.target.id == item.from || this.target.id == item.to)
        ) {
          return true;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.chatwin {
  position: absolute;
  height: calc(100% - 50px);
  bottom: 0px;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
}
//滚动条美化
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 1vw;
  height: 10px;
  background-color: #000;
  border-right: 2px solid #fff;
  margin: 0;
  padding: 0;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  background-color: #000;
  border-left: 2px solid #fff;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  background-color: #fff;
}
</style>