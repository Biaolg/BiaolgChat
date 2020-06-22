<template>
  <transition name="fade">
    <div v-show="state.sheen" class="Eject">
      <div :style="state.sheen&&{'transform':'translateY(0%)'}" class="box">
        <div class="title">{{state.title}}</div>
        <div class="content">{{state.content}}</div>
        <div class="inputname" v-if="state.ifinput">
          <input type="text" v-model="tagname" />
        </div>
        <div class="btn-box">
          <button
            type="button"
            :style="state.btntitle.no==''&&{'width':'100%'}"
            @click="choice(state.btntitle.yes)"
            class="btn btn-primary"
          >{{state.btntitle.yes}}</button>
          <button
            type="button"
            v-if="state.btntitle.no!=''"
            @click="choice(state.btntitle.no)"
            class="btn btn-danger"
          >{{state.btntitle.no}}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "EjectTo",
  data() {
    return {
      tagname: ""
    };
  },
  computed: {
    state() {
      return this.$store.state.eject;
    }
  },
  methods: {
    choice(value) {
      //隐藏模态框
      this.$store.commit("setEjectSheen", false);
      //触发事件
      let to = {
        type: value,
        tagname: this.tagname
      };
      this.$emit("btnClick", to);
    }
  }
};
</script>

<style lang="less" scoped>
.Eject {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  //   opacity: 0;
  transition: all 1s;
}
//背景
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.box {
  animation: mymove 5s infinite;
  color: #fff;
  box-shadow: 0px 0px 25px rgb(255, 255, 255);
  transform: translateY(-1000%);
  margin: auto;
  margin-top: 100px;
  background-color: #000;
  width: 30%;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200px;
  border-radius: 50px;
  position: relative;
  overflow: hidden;
  transition: all 0.5s;
  border: 2px #fff solid;
  .title {
    text-align: center;
    height: 50px;
    font-size: 30px;
    font-weight: 700;
    width: 100%;
    border-bottom: #fff solid 2px;
  }
  .content {
    width: 100%;
    margin-top: 10px;
    display: grid;
    justify-content: center;
    align-items: center;
  }
  .btn-box {
    width: 100%;
    position: absolute;
    bottom: 0px;
    .btn {
      border-radius: 0px;
      width: 50%;
      background-color: #000;
      border-color: #fff;
      border-bottom: none;
      height: 40px;
      transition: all 1s;
    }
    .btn:hover {
      text-shadow: 0px 0px 10px rgb(0, 0, 0);
      background-color: #bbb;
    }
  }
}
</style>