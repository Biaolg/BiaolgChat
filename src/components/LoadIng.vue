<template>
  <div class="loading" v-if="state.sheen">
    <div class="box">
      <LoadAnms :title="`LONG...`"></LoadAnms>
    </div>
    <div class="title">
      <h1>{{state.title}}...</h1>
    </div>
  </div>
</template>

<script>
import LoadAnms from "./LoandAnms";
export default {
  name: "loading",
  data() {
    return {
      sheen: false
    };
  },
  components: {
    LoadAnms
  },
  computed: {
    state() {
      return this.$store.state.londing;
    }
  }
};
</script>

<style lang="less" scoped>
.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  color: #fff;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  .title {
    position: absolute;
    bottom: 0px;
    right: 0px;
    padding: 20px;
    h1 {
      font-size: 2vw;
    }
  }
}

.box {
  color: #fff;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>