<template>
  <div class="chatlist" :style="handleData.pos&&{'flex-direction': 'row-reverse'}">
    <div>
      <div class="head">{{handleData.from}}</div>
    </div>
    <div class="msg">{{handleData.data}}</div>
  </div>
</template>

<script>

export default {
  name: "chatlist",
  props: ["item"],
  computed: {
    handleData() {
      if (!this.item.data) {
        let { ...data } = this.item;
        data.data = this.item.msg;
        data.from = this.$store.state.user.userId;
        data.pos = true;
        return data;
      }
      return this.item;
    }
  },
  methods: {
    color() {}
  }
};
</script>

<style lang="less" scoped>
.chatlist {
  margin: 20px 10px;
  display: flex;
}
.londing {
  width: 50px;
  height: 50px;
}
.head {
  height: 50px;
  max-width: 50px;
  font-size: 50px;
  padding: 20px;
  font-size: 24px;
  overflow: hidden;
  border-radius: 50%;
  border: solid #fff 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
  background-color: #000;
  margin: 0px 10px;
  font-weight: 700;
  transition: all 0.3s;
  &:hover {
    border-radius: 0%;
    max-width: 300px;
    background-image: -webkit-linear-gradient(left, #fdfdfd, #cc74ff, #00b7ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
.msg {
  font-size: 20px;
  padding: 10px;
  max-width: 50%;
  border: 2px solid #fff;
  display: inline-block;
  word-wrap: break-word;
  word-break: normal;
  border-radius: 20px;
  background-color: #aaa;
}
</style>