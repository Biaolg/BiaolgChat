<template>
  <div id="app">
    <div id="nav"></div>
    <!-- 一级路由 -->
    <!-- 消息弹窗 -->
    <!-- <router-link to="/Home">home</router-link> -->
    <!-- <audio src=""></audio> -->
    <audio id="tis" src="../public/music/tips.mp3"></audio>
    <Popup @btnClick="ejectBtnState = $event"></Popup>
    <loading></loading>
    <router-view />
  </div>
</template>

<script>
import Popup from "./components/EjectTo.vue";
import loading from "./components/LoadIng.vue";

export default {
  name: "app",
  data() {
    return {
      ejectBtnState: "",
      audio: null
    };
  },
  computed: {
    tpismusic() {
      return this.$store.state.tpismusic;
    }
  },
  components: {
    Popup,
    loading
  },
  watch: {
    ejectBtnState(value) {
      switch (value.type) {
        case "注册账号":
          this.$store.commit("setLingSheen", true);
          this.ejectBtnState = "";
          break;
        case "同意":
          //同意添加好友
          WebIM.conn.subscribed({
            to: this.$store.state.FriendsAdd.from,
            message: "[resp:true]"
          });
          WebIM.Tool.queryFriends();
          this.$store.commit("setFriendsAdd", {});
          this.ejectBtnState = "";
          break;

        case "添加":
          //添加好友
          WebIM.conn.subscribe({
            to: value.tagname,
            message: Vue.$store.state.user.userId + "申请好友添加!"
          });
          WebIM.Tool.queryFriends();
          this.ejectBtnState = "";
          break;
        default:
          this.ejectBtnState = "";
          break;
      }
    },
    tpismusic() {
      this.audio.play();
    }
  },
  mounted() {
    this.audio = document.getElementById("tis");
  }
};
</script>

<style lang="less">
@keyframes mymove {
  0% {
    box-shadow: 0px 0px 15px #fff;
  }
  25% {
    box-shadow: 0px 0px 25px rgb(253, 253, 253);
  }
  50% {
    box-shadow: 0px 0px 15px #6700a3;
  }
  75% {
    box-shadow: 0px 0px 25px rgb(0, 183, 255);
  }
  100% {
    box-shadow: 0px 0px 15px #fff inset;
  }
}

@keyframes mymoveinset {
  0% {
    box-shadow: 0px 0px 15px #fff inset;
  }
  25% {
    box-shadow: 0px 0px 25px rgb(253, 253, 253) inset;
  }
  50% {
    box-shadow: 0px 0px 15px #6700a3 inset;
  }
  75% {
    box-shadow: 0px 0px 25px rgb(0, 183, 255) inset;
  }
  100% {
    box-shadow: 0px 0px 15px #fff inset;
  }
}
html {
  height: 100%;
  height: 100vh;
}
body {
  height: 100%;
  height: 100vh;
}
#app {
  height: 100%;
  height: 100vh;
}
</style>
